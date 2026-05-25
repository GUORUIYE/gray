export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar: string;
          level: string;
          experience: number;
          join_date: string;
          target_languages: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          avatar?: string;
          level?: string;
          experience?: number;
          join_date?: string;
          target_languages?: string[];
        };
        Update: {
          username?: string;
          avatar?: string;
          level?: string;
          experience?: number;
          target_languages?: string[];
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          lesson_id: string;
          progress: number;
          score: number;
          time_spent: number;
          last_accessed: string;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          lesson_id: string;
          progress: number;
          score: number;
          time_spent: number;
          last_accessed: string;
          completed: boolean;
        };
        Update: {
          progress?: number;
          score?: number;
          time_spent?: number;
          last_accessed?: string;
          completed?: boolean;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          earned_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          earned_date: string;
        };
        Update: {
          achievement_id?: string;
          earned_date?: string;
        };
      };
      community_posts: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          avatar: string;
          content: string;
          type: string;
          likes: number;
          comments: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          username: string;
          avatar: string;
          content: string;
          type: string;
          likes?: number;
          comments?: number;
        };
        Update: {
          content?: string;
          likes?: number;
          comments?: number;
        };
      };
      study_streaks: {
        Row: {
          id: string;
          user_id: string;
          current_streak: number;
          longest_streak: number;
          study_dates: string[];
          last_study_date: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_streak: number;
          longest_streak: number;
          study_dates: string[];
          last_study_date: string;
        };
        Update: {
          current_streak?: number;
          longest_streak?: number;
          study_dates?: string[];
          last_study_date?: string;
          updated_at?: string;
        };
      };
    };
  };
}
