export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: string;
  experience: number;
  joinDate: string;
  targetLanguages: string[];
}

export interface Course {
  id: string;
  language: string;
  title: string;
  description: string;
  level: string;
  category: 'vocabulary' | 'grammar' | 'speaking' | 'listening' | 'comprehensive';
  prerequisites: string[];
  totalLessons: number;
  coverColor: string;
  icon: string;
  difficulty: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening' | 'quiz';
  order: number;
  xpReward: number;
  content: LessonContent;
}

export interface LessonContent {
  instructions: string;
  items?: VocabItem[] | GrammarItem[] | SpeakingItem[] | ListeningItem[];
}

export interface VocabItem {
  word: string;
  translation: string;
  pronunciation: string;
  exampleSentence: string;
  exampleTranslation: string;
  partOfSpeech: string;
}

export interface GrammarItem {
  rule: string;
  explanation: string;
  examples: { sentence: string; translation: string }[];
  questions: GrammarQuestion[];
}

export interface GrammarQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface SpeakingItem {
  text: string;
  translation: string;
  audioUrl?: string;
}

export interface ListeningItem {
  audioUrl: string;
  transcript: string;
  translation: string;
  questions: ListeningQuestion[];
}

export interface ListeningQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LearningProgress {
  userId: string;
  courseId: string;
  lessonId: string;
  progress: number;
  score: number;
  timeSpent: number;
  lastAccessed: string;
  completed: boolean;
}

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  exampleSentence: string;
  exampleTranslation: string;
  partOfSpeech: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  masteryLevel: number;
  reviewCount: number;
  nextReviewDate: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  isEarned: boolean;
  earnedDate?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  type: 'progress' | 'achievement' | 'question' | 'tip';
  image?: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  studyDates: string[];
  lastStudyDate: string;
}

export interface LearningPath {
  language: string;
  currentLevel: string;
  recommendedCourses: string[];
  weeklyGoal: number;
  focusAreas: string[];
  estimatedDuration: string;
}

export type AppPage =
  | 'home'
  | 'login'
  | 'register'
  | 'courses'
  | 'courseDetail'
  | 'learn'
  | 'vocab'
  | 'grammar'
  | 'speaking'
  | 'listening'
  | 'progress'
  | 'community'
  | 'achievements'
  | 'profile'
  | 'path';
