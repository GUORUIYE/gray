import { create } from 'zustand';
import type { Course, Lesson, LearningProgress } from '@/types';
import { mockCourses } from '@/data/mockData';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/stores/userStore';

const isSupabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

const STORAGE_KEY = 'lingualearn_progress';

function loadFromLocalStorage(): LearningProgress[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToLocalStorage(progress: LearningProgress[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // silently fail
  }
}

function mapRowToProgress(row: Record<string, unknown>): LearningProgress {
  return {
    userId: row.user_id as string,
    courseId: row.course_id as string,
    lessonId: row.lesson_id as string,
    progress: row.progress as number,
    score: row.score as number,
    timeSpent: row.time_spent as number,
    lastAccessed: row.last_accessed as string,
    completed: row.completed as boolean,
  };
}

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  progress: LearningProgress[];
  setCurrentCourse: (course: Course | null) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  getCoursesByLanguage: (lang: string) => Course[];
  getCoursesByLevel: (level: string) => Course[];
  getCourseById: (id: string) => Course | null;
  updateProgress: (courseId: string, lessonId: string, score: number) => void;
  getCourseProgress: (courseId: string) => number;
  getCompletedLessons: (courseId: string) => number;
  fetchProgress: (courseId?: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: mockCourses,
  currentCourse: null,
  currentLesson: null,
  progress: isSupabaseConfigured ? [] : loadFromLocalStorage(),

  setCurrentCourse: (course) => set({ currentCourse: course }),
  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
  getCoursesByLanguage: (lang) => get().courses.filter((c) => c.language === lang),
  getCoursesByLevel: (level) => get().courses.filter((c) => c.level === level),
  getCourseById: (id) => get().courses.find((c) => c.id === id) || null,

  updateProgress: (courseId, lessonId, score) => {
    const userId = useUserStore.getState().user?.id;
    if (!userId) return;

    const now = new Date().toISOString();

    set((state) => {
      const existing = state.progress.find(
        (p) => p.courseId === courseId && p.lessonId === lessonId
      );
      if (existing) {
        return {
          progress: state.progress.map((p) =>
            p.courseId === courseId && p.lessonId === lessonId
              ? { ...p, score: Math.max(p.score, score), progress: 100, completed: true, lastAccessed: now }
              : p
          ),
        };
      }
      return {
        progress: [
          ...state.progress,
          {
            userId,
            courseId,
            lessonId,
            progress: 100,
            score,
            timeSpent: 0,
            lastAccessed: now,
            completed: true,
          },
        ],
      };
    });

    const record = {
      user_id: userId,
      course_id: courseId,
      lesson_id: lessonId,
      progress: 100,
      score,
      time_spent: 0,
      last_accessed: now,
      completed: true,
    };

    if (isSupabaseConfigured) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase.from('user_progress') as any)
        .select('id')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .eq('lesson_id', lessonId)
        .maybeSingle()
        .then(({ data: existing }: { data: { id: string } | null }) => {
          if (existing) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return (supabase.from('user_progress') as any)
              .update(record)
              .eq('id', existing.id);
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (supabase.from('user_progress') as any).insert(record);
        });
    } else {
      saveToLocalStorage(get().progress);
    }
  },

  getCourseProgress: (courseId) => {
    const state = get();
    const course = state.courses.find((c) => c.id === courseId);
    if (!course) return 0;
    const completed = state.progress.filter(
      (p) => p.courseId === courseId && p.completed
    ).length;
    return Math.round((completed / course.totalLessons) * 100);
  },

  getCompletedLessons: (courseId) => {
    return get().progress.filter(
      (p) => p.courseId === courseId && p.completed
    ).length;
  },

  fetchProgress: async (courseId) => {
    const userId = useUserStore.getState().user?.id;
    if (!userId) {
      set({ progress: [] });
      return;
    }

    if (!isSupabaseConfigured) {
      const localProgress = loadFromLocalStorage();
      set({ progress: localProgress.filter((p) => p.userId === userId) });
      return;
    }

    let query = supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);

    if (courseId) {
      query = query.eq('course_id', courseId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('获取学习进度失败:', error.message);
      return;
    }

    if (data) {
      set({ progress: data.map(mapRowToProgress) });
    }
  },
}));
