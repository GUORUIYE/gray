import { create } from 'zustand';
import type { User } from '@/types';
import { mockUser } from '@/data/mockData';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addExperience: (xp: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: mockUser,
  isLoggedIn: true,
  login: async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    set({ isLoggedIn: true, user: { ...mockUser, email } });
    return true;
  },
  register: async (username: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    set({
      isLoggedIn: true,
      user: { ...mockUser, id: 'user-new', username, email, experience: 0, level: '初级' },
    });
    return true;
  },
  logout: () => set({ isLoggedIn: false, user: null }),
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null,
  })),
  addExperience: (xp) => set((state) => {
    if (!state.user) return state;
    const newXp = state.user.experience + xp;
    let newLevel = state.user.level;
    if (newXp >= 5000) newLevel = '高级';
    else if (newXp >= 2000) newLevel = '中级';
    return { user: { ...state.user, experience: newXp, level: newLevel } };
  }),
}));
