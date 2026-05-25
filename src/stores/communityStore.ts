import { create } from 'zustand';
import type { Achievement, CommunityPost, StudyStreak } from '@/types';
import { supabase } from '@/lib/supabase';
import { mockAchievements, mockCommunityPosts, mockStudyStreak } from '@/data/mockData';
import { useUserStore } from '@/stores/userStore';

const LS_POSTS = 'lingualearn_posts';
const LS_ACHIEVEMENTS = 'lingualearn_achievements';
const LS_STREAK = 'lingualearn_streak';

const isSupabaseConfigured = () =>
  !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // silently ignore quota / permission errors
  }
};

const defaultStreak: StudyStreak = {
  currentStreak: 0,
  longestStreak: 0,
  studyDates: [],
  lastStudyDate: '',
};

interface CommunityState {
  achievements: Achievement[];
  posts: CommunityPost[];
  streak: StudyStreak;
  addPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => void;
  likePost: (postId: string) => void;
  checkAndEarnAchievement: (condition: string) => Achievement | null;
  recordStudyDate: (date: string) => void;
  fetchPosts: () => Promise<void>;
  fetchAchievements: () => Promise<void>;
  fetchStreak: () => Promise<void>;
}

function isConsecutiveDay(lastDate: string, currentDate: string): boolean {
  const last = new Date(lastDate);
  const current = new Date(currentDate);
  const diff = (current.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
  return diff === 1;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  achievements: isSupabaseConfigured()
    ? mockAchievements.map((a) => ({ ...a, isEarned: false, earnedDate: undefined }))
    : loadFromStorage(LS_ACHIEVEMENTS, mockAchievements),
  posts: isSupabaseConfigured() ? [] : loadFromStorage(LS_POSTS, mockCommunityPosts),
  streak: isSupabaseConfigured() ? { ...defaultStreak } : loadFromStorage(LS_STREAK, mockStudyStreak),

  addPost: (postData) => {
    const user = useUserStore.getState().user;
    const now = new Date().toISOString();
    const newPost: CommunityPost = {
      ...postData,
      id: `post-${Date.now()}`,
      createdAt: now,
      likes: 0,
      comments: 0,
      username: user?.username || postData.username,
      avatar: user?.avatar || postData.avatar,
    };

    set((state) => ({ posts: [newPost, ...state.posts] }));

    if (isSupabaseConfigured()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase.from('community_posts') as any)
        .insert({
          id: newPost.id,
          user_id: user?.id || newPost.userId,
          username: newPost.username,
          avatar: newPost.avatar,
          content: newPost.content,
          type: newPost.type,
          image: newPost.image || null,
          likes: 0,
          comments: 0,
          created_at: now,
        })
        .then(({ error }: { error: unknown }) => {
          if (error) console.error('Failed to save post to Supabase:', error);
        });
    } else {
      saveToStorage(LS_POSTS, get().posts);
    }
  },

  likePost: (postId) => {
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      ),
    }));

    const updatedPost = get().posts.find((p) => p.id === postId);
    if (!updatedPost) return;

    if (isSupabaseConfigured()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase.from('community_posts') as any)
        .update({ likes: updatedPost.likes })
        .eq('id', postId)
        .then(({ error }: { error: unknown }) => {
          if (error) console.error('Failed to update like in Supabase:', error);
        });
    } else {
      saveToStorage(LS_POSTS, get().posts);
    }
  },

  checkAndEarnAchievement: (condition) => {
    const state = get();
    const achievement = state.achievements.find(
      (a) => a.condition === condition && !a.isEarned
    );
    if (!achievement) return null;

    const earnedDate = new Date().toISOString().split('T')[0];
    set({
      achievements: state.achievements.map((a) =>
        a.id === achievement.id ? { ...a, isEarned: true, earnedDate } : a
      ),
    });

    if (isSupabaseConfigured()) {
      const user = useUserStore.getState().user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase.from('user_achievements') as any)
        .insert({
          user_id: user?.id || '',
          achievement_id: achievement.id,
          earned_at: earnedDate,
        })
        .then(({ error }: { error: unknown }) => {
          if (error) console.error('Failed to save achievement to Supabase:', error);
        });
    } else {
      saveToStorage(LS_ACHIEVEMENTS, get().achievements);
    }

    return { ...achievement, isEarned: true, earnedDate };
  },

  recordStudyDate: (date) =>
    set((state) => {
      const newDates = state.streak.studyDates.includes(date)
        ? state.streak.studyDates
        : [...state.streak.studyDates, date];
      const lastDate = state.streak.lastStudyDate;
      const isConsecutive = lastDate === date || isConsecutiveDay(lastDate, date);
      const newStreak = isConsecutive ? state.streak.currentStreak + 1 : 1;
      const updatedStreak: StudyStreak = {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, state.streak.longestStreak),
        studyDates: newDates,
        lastStudyDate: date,
      };

      if (isSupabaseConfigured()) {
        const user = useUserStore.getState().user;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (supabase.from('study_streaks') as any)
          .upsert(
            {
              user_id: user?.id || '',
              current_streak: updatedStreak.currentStreak,
              longest_streak: updatedStreak.longestStreak,
              study_dates: updatedStreak.studyDates,
              last_study_date: updatedStreak.lastStudyDate,
            },
            { onConflict: 'user_id' }
          )
          .then(({ error }: { error: unknown }) => {
            if (error) console.error('Failed to save streak to Supabase:', error);
          });
      }

      saveToStorage(LS_STREAK, updatedStreak);

      return { streak: updatedStreak };
    }),

  fetchPosts: async () => {
    if (!isSupabaseConfigured()) {
      set({ posts: loadFromStorage(LS_POSTS, mockCommunityPosts) });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from('community_posts') as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch posts from Supabase:', error);
      return;
    }

    if (data) {
      const posts: CommunityPost[] = (data as Record<string, unknown>[]).map((row) => ({
        id: row.id as string,
        userId: row.user_id as string,
        username: row.username as string,
        avatar: row.avatar as string,
        content: row.content as string,
        type: row.type as CommunityPost['type'],
        image: row.image as string | undefined,
        likes: row.likes as number,
        comments: row.comments as number,
        createdAt: row.created_at as string,
      }));
      set({ posts });
    }
  },

  fetchAchievements: async () => {
    if (!isSupabaseConfigured()) {
      set({ achievements: loadFromStorage(LS_ACHIEVEMENTS, mockAchievements) });
      return;
    }

    const user = useUserStore.getState().user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from('user_achievements') as any)
      .select('*')
      .eq('user_id', user?.id || '');

    if (error) {
      console.error('Failed to fetch achievements from Supabase:', error);
      return;
    }

    const earnedMap = new Map<string, string>();
    if (data) {
      for (const row of data as Array<Record<string, unknown>>) {
        earnedMap.set(row.achievement_id as string, row.earned_at as string);
      }
    }

    const achievements = mockAchievements.map((a) => ({
      ...a,
      isEarned: earnedMap.has(a.id),
      earnedDate: earnedMap.get(a.id),
    }));
    set({ achievements });
  },

  fetchStreak: async () => {
    if (!isSupabaseConfigured()) {
      set({ streak: loadFromStorage(LS_STREAK, mockStudyStreak) });
      return;
    }

    const user = useUserStore.getState().user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from('study_streaks') as any)
      .select('*')
      .eq('user_id', user?.id || '')
      .single();

    if (error) {
      if ((error as { code?: string }).code !== 'PGRST116') {
        console.error('Failed to fetch streak from Supabase:', error);
      }
      return;
    }

    if (data) {
      const row = data as Record<string, unknown>;
      set({
        streak: {
          currentStreak: row.current_streak as number,
          longestStreak: row.longest_streak as number,
          studyDates: row.study_dates as string[],
          lastStudyDate: row.last_study_date as string,
        },
      });
    }
  },
}));
