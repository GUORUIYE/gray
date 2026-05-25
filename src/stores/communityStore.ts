import { create } from 'zustand';
import type { Achievement, CommunityPost, StudyStreak } from '@/types';
import { mockAchievements, mockCommunityPosts, mockStudyStreak } from '@/data/mockData';

interface CommunityState {
  achievements: Achievement[];
  posts: CommunityPost[];
  streak: StudyStreak;
  addPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => void;
  likePost: (postId: string) => void;
  checkAndEarnAchievement: (condition: string) => Achievement | null;
  recordStudyDate: (date: string) => void;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  achievements: mockAchievements,
  posts: mockCommunityPosts,
  streak: mockStudyStreak,
  addPost: (postData) => set((state) => ({
    posts: [
      {
        ...postData,
        id: `post-${Date.now()}`,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
      },
      ...state.posts,
    ],
  })),
  likePost: (postId) => set((state) => ({
    posts: state.posts.map((p) =>
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    ),
  })),
  checkAndEarnAchievement: (condition) => {
    const state = get();
    const achievement = state.achievements.find(
      (a) => a.condition === condition && !a.isEarned
    );
    if (achievement) {
      set({
        achievements: state.achievements.map((a) =>
          a.id === achievement.id ? { ...a, isEarned: true, earnedDate: new Date().toISOString().split('T')[0] } : a
        ),
      });
      return { ...achievement, isEarned: true, earnedDate: new Date().toISOString().split('T')[0] };
    }
    return null;
  },
  recordStudyDate: (date) => set((state) => {
    const newDates = state.streak.studyDates.includes(date)
      ? state.streak.studyDates
      : [...state.streak.studyDates, date];
    const lastDate = state.streak.lastStudyDate;
    const isConsecutive = lastDate === date || isConsecutiveDay(lastDate, date);
    const newStreak = isConsecutive ? state.streak.currentStreak + 1 : 1;
    return {
      streak: {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, state.streak.longestStreak),
        studyDates: newDates,
        lastStudyDate: date,
      },
    };
  }),
}));

function isConsecutiveDay(lastDate: string, currentDate: string): boolean {
  const last = new Date(lastDate);
  const current = new Date(currentDate);
  const diff = (current.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
  return diff === 1;
}
