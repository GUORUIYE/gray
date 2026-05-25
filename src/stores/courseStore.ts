import { create } from 'zustand';
import type { Course, Lesson, LearningProgress } from '@/types';
import { mockCourses } from '@/data/mockData';

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
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: mockCourses,
  currentCourse: null,
  currentLesson: null,
  progress: [],
  setCurrentCourse: (course) => set({ currentCourse: course }),
  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
  getCoursesByLanguage: (lang) => get().courses.filter((c) => c.language === lang),
  getCoursesByLevel: (level) => get().courses.filter((c) => c.level === level),
  getCourseById: (id) => get().courses.find((c) => c.id === id) || null,
  updateProgress: (courseId, lessonId, score) => set((state) => {
    const existing = state.progress.find(
      (p) => p.courseId === courseId && p.lessonId === lessonId
    );
    if (existing) {
      return {
        progress: state.progress.map((p) =>
          p.courseId === courseId && p.lessonId === lessonId
            ? { ...p, score: Math.max(p.score, score), progress: 100, completed: true, lastAccessed: new Date().toISOString() }
            : p
        ),
      };
    }
    return {
      progress: [
        ...state.progress,
        {
          userId: 'user-1',
          courseId,
          lessonId,
          progress: 100,
          score,
          timeSpent: 0,
          lastAccessed: new Date().toISOString(),
          completed: true,
        },
      ],
    };
  }),
  getCourseProgress: (courseId) => {
    const state = get();
    const course = state.courses.find((c) => c.id === courseId);
    if (!course) return 0;
    const completed = state.progress.filter((p) => p.courseId === courseId && p.completed).length;
    return Math.round((completed / course.totalLessons) * 100);
  },
  getCompletedLessons: (courseId) => {
    return get().progress.filter((p) => p.courseId === courseId && p.completed).length;
  },
}));
