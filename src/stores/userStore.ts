import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { User } from '@/types';

const STORAGE_KEY = 'lingualearn_user';

const SUPABASE_CONFIGURED =
  !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addExperience: (xp: number) => void;
}

function computeLevel(experience: number): string {
  if (experience >= 5000) return '高级';
  if (experience >= 2000) return '中级';
  return '初级';
}

function profileToUser(profile: Record<string, unknown>, email: string): User {
  return {
    id: profile.id as string,
    username: profile.username as string,
    email,
    avatar: (profile.avatar as string) || '',
    level: (profile.level as string) || '初级',
    experience: (profile.experience as number) || 0,
    joinDate: (profile.join_date as string) || (profile.created_at as string) || '',
    targetLanguages: (profile.target_languages as string[]) || [],
  };
}

async function fetchProfile(userId: string, email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) {
    console.error('获取用户资料失败:', error?.message);
    return null;
  }

  return profileToUser(data, email);
}

function loadFromStorage(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToStorage(user: User | null) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}

function getInitialState(): { user: User | null; isLoggedIn: boolean } {
  const stored = loadFromStorage();
  if (stored) {
    return { user: stored, isLoggedIn: true };
  }
  return { user: null, isLoggedIn: false };
}

export const useUserStore = create<UserState>((set, get) => {
  if (!SUPABASE_CONFIGURED) {
    return {
      ...getInitialState(),
      isLoading: false,

      login: async (email: string, _password: string) => {
        await new Promise((r) => setTimeout(r, 300));
        const user: User = {
          id: `local-${Date.now()}`,
          username: email.split('@')[0],
          email,
          avatar: '',
          level: '初级',
          experience: 0,
          joinDate: new Date().toISOString(),
          targetLanguages: [],
        };
        saveToStorage(user);
        set({ user, isLoggedIn: true });
        return true;
      },

      register: async (username: string, email: string, _password: string) => {
        await new Promise((r) => setTimeout(r, 300));
        const user: User = {
          id: `local-${Date.now()}`,
          username,
          email,
          avatar: '',
          level: '初级',
          experience: 0,
          joinDate: new Date().toISOString(),
          targetLanguages: [],
        };
        saveToStorage(user);
        set({ user, isLoggedIn: true });
        return true;
      },

      logout: () => {
        saveToStorage(null);
        set({ user: null, isLoggedIn: false });
      },

      updateUser: (updates) =>
        set((state) => {
          if (!state.user) return state;
          const updated = { ...state.user, ...updates };
          saveToStorage(updated);
          return { user: updated };
        }),

      addExperience: (xp) =>
        set((state) => {
          if (!state.user) return state;
          const newXp = state.user.experience + xp;
          const updated: User = {
            ...state.user,
            experience: newXp,
            level: computeLevel(newXp),
          };
          saveToStorage(updated);
          return { user: updated };
        }),
    };
  }

  // --- Supabase 模式 ---

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      const profile = await fetchProfile(session.user.id, session.user.email || '');
      if (profile) {
        saveToStorage(profile);
        set({ user: profile, isLoggedIn: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } else if (event === 'SIGNED_OUT') {
      saveToStorage(null);
      set({ user: null, isLoggedIn: false, isLoading: false });
    } else if (event === 'TOKEN_REFRESHED' && session?.user) {
      const profile = await fetchProfile(session.user.id, session.user.email || '');
      if (profile) {
        saveToStorage(profile);
        set({ user: profile, isLoggedIn: true });
      }
    }
  });

  return {
    ...getInitialState(),
    isLoading: true,

    login: async (email: string, password: string) => {
      set({ isLoading: true });
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        set({ isLoading: false });
        return false;
      }
      const profile = await fetchProfile(data.user.id, data.user.email || '');
      if (profile) {
        saveToStorage(profile);
        set({ user: profile, isLoggedIn: true, isLoading: false });
        return true;
      }
      set({ isLoading: false });
      return false;
    },

    register: async (username: string, email: string, password: string) => {
      set({ isLoading: true });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });
      if (error) {
        set({ isLoading: false });
        return false;
      }
      if (data.user) {
        const profile = await fetchProfile(data.user.id, data.user.email || '');
        if (profile) {
          saveToStorage(profile);
          set({ user: profile, isLoggedIn: true, isLoading: false });
          return true;
        }
        const fallback: User = {
          id: data.user.id,
          username,
          email,
          avatar: '',
          level: '初级',
          experience: 0,
          joinDate: new Date().toISOString(),
          targetLanguages: [],
        };
        saveToStorage(fallback);
        set({ user: fallback, isLoggedIn: true, isLoading: false });
        return true;
      }
      set({ isLoading: false });
      return false;
    },

    logout: async () => {
      await supabase.auth.signOut();
      saveToStorage(null);
      set({ user: null, isLoggedIn: false });
    },

    updateUser: async (updates) => {
      const state = get();
      if (!state.user) return;
      const updated = { ...state.user, ...updates };
      saveToStorage(updated);
      set({ user: updated });

      const dbUpdates: Record<string, unknown> = {};
      if (updates.username !== undefined) dbUpdates.username = updates.username;
      if (updates.avatar !== undefined) dbUpdates.avatar = updates.avatar;
      if (updates.level !== undefined) dbUpdates.level = updates.level;
      if (updates.experience !== undefined) dbUpdates.experience = updates.experience;
      if (updates.targetLanguages !== undefined) dbUpdates.target_languages = updates.targetLanguages;

      if (Object.keys(dbUpdates).length > 0) {
        const { error } = await supabase
          .from('profiles')
          .update(dbUpdates)
          .eq('id', state.user.id);
        if (error) {
          console.error('更新用户资料失败:', error.message);
        }
      }
    },

    addExperience: async (xp) => {
      const state = get();
      if (!state.user) return;
      const newXp = state.user.experience + xp;
      const updated: User = {
        ...state.user,
        experience: newXp,
        level: computeLevel(newXp),
      };
      saveToStorage(updated);
      set({ user: updated });

      const { error } = await supabase
        .from('profiles')
        .update({ experience: newXp, level: updated.level })
        .eq('id', state.user.id);
      if (error) {
        console.error('同步经验值失败:', error.message);
      }
    },
  };
});
