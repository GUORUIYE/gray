import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Mail, Settings, LogOut, Bell, Globe,
  Calendar, Clock, Trophy, BookOpen, ChevronRight,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/stores/userStore';
import { useCommunityStore } from '@/stores/communityStore';
import { useCourseStore } from '@/stores/courseStore';
import { languageInfo } from '@/data/mockData';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const levelExperienceMap: Record<string, { label: string; nextLevel: string; threshold: number }> = {
  初级: { label: '初级', nextLevel: '中级', threshold: 2000 },
  中级: { label: '中级', nextLevel: '高级', threshold: 5000 },
  高级: { label: '高级', nextLevel: '满级', threshold: 5000 },
};

const languageOptions = [
  { key: 'english', ...languageInfo.english },
  { key: 'japanese', ...languageInfo.japanese },
  { key: 'korean', ...languageInfo.korean },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, isLoggedIn, updateUser, logout, addExperience } = useUserStore();
  const { achievements, streak } = useCommunityStore();
  const { courses, progress } = useCourseStore();

  const [editingLanguages, setEditingLanguages] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    user?.targetLanguages || []
  );
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('20:00');

  const levelInfo = user ? levelExperienceMap[user.level] : null;

  const experienceProgress = useMemo(() => {
    if (!user || !levelInfo) return 0;
    if (user.level === '高级') return 100;
    return Math.min(100, Math.round((user.experience / levelInfo.threshold) * 100));
  }, [user, levelInfo]);

  const xpToNext = useMemo(() => {
    if (!user || !levelInfo) return 0;
    return levelInfo.threshold;
  }, [user, levelInfo]);

  const daysSinceJoined = useMemo(() => {
    if (!user) return 0;
    const join = new Date(user.joinDate);
    const now = new Date();
    return Math.floor((now.getTime() - join.getTime()) / (1000 * 60 * 60 * 24));
  }, [user]);

  const earnedBadges = useMemo(
    () => achievements.filter((a) => a.isEarned).length,
    [achievements]
  );

  const studyDays = streak.studyDates.length;

  const totalStudyHours = useMemo(() => {
    if (progress.length === 0) return 0;
    const totalMinutes = progress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
    return Math.round(totalMinutes / 60);
  }, [progress]);

  const recentRecords = useMemo(() => {
    const sorted = [...progress]
      .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
      .slice(0, 5);
    return sorted.map((p) => {
      const course = courses.find((c) => c.id === p.courseId);
      return { ...p, courseTitle: course?.title || '未知课程', courseIcon: course?.icon || '📖' };
    });
  }, [progress, courses]);

  const handleSaveLanguages = () => {
    updateUser({ targetLanguages: selectedLanguages });
    setEditingLanguages(false);
  };

  const toggleLanguage = (key: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isLoggedIn || !user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20">
          <User size={48} className="text-gray-300 mb-4" />
          <h2 className="text-lg font-heading font-semibold text-gray-500 mb-2">未登录</h2>
          <Button variant="primary" onClick={() => navigate('/login')}>
            前往登录
          </Button>
        </div>
      </Layout>
    );
  }

  const firstLetter = user.username.charAt(0).toUpperCase();

  return (
    <Layout>
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2.5">
            <User size={28} className="text-[#E8953C]" />
            <h1 className="text-2xl font-heading font-bold">个人中心</h1>
          </div>
          <p className="text-gray-500 mt-1">管理你的个人资料和学习设置</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl border border-gray-100 card-shadow p-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E8953C]/30 to-[#F2A7B3]/30 blur-xl animate-pulse" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8953C] to-[#D4852E] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-200 relative">
                {firstLetter}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-heading font-bold truncate">{user.username}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                <Mail size={14} />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-gradient-to-r from-orange-50 to-amber-50 text-[#E8953C] border border-orange-200">
                  {user.level}
                </span>
                <span className="text-xs text-gray-400">
                  经验值 {user.experience}
                </span>
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate('/settings')}>
              <Settings size={14} className="mr-1" />
              编辑资料
            </Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-gray-100 card-shadow p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-heading font-semibold">经验值进度</span>
            <span className="text-xs text-gray-400">
              {user.experience} / {xpToNext}
            </span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#E8953C] via-[#F5B86E] to-[#F2A7B3] relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${experienceProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </motion.div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            再积累 {xpToNext - user.experience} 经验值即可升级至
            <span className="text-[#E8953C] font-medium"> {levelInfo?.nextLevel || '满级'}</span>
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: Calendar, label: '注册天数', value: `${daysSinceJoined} 天`, color: 'text-blue-500', bg: 'bg-gradient-to-br from-blue-400/20 to-cyan-300/10' },
            { icon: Clock, label: '累计学习', value: `${studyDays} 天`, color: 'text-green-500', bg: 'bg-gradient-to-br from-green-400/20 to-emerald-300/10' },
            { icon: Trophy, label: '获得徽章', value: `${earnedBadges} 个`, color: 'text-purple-500', bg: 'bg-gradient-to-br from-purple-400/20 to-pink-300/10' },
            { icon: BookOpen, label: '学习时长', value: `${totalStudyHours} 小时`, color: 'text-orange-500', bg: 'bg-gradient-to-br from-orange-400/20 to-amber-300/10' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-gray-100 card-shadow p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', stat.bg)}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <p className="text-2xl font-heading font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-gray-100 card-shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={16} className="text-[#E8953C]" />
            <h3 className="text-sm font-heading font-semibold">目标语言</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.targetLanguages.map((key) => {
              const lang = languageOptions.find((l) => l.key === key);
              if (!lang) return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${lang.bgColor} 0%, ${lang.bgColor}dd 100%)`,
                    color: lang.color,
                  }}
                >
                  {lang.flag} {lang.name}
                </span>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-gray-100 card-shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-[#E8953C]" />
            <h3 className="text-sm font-heading font-semibold">最近学习记录</h3>
          </div>
          {recentRecords.length > 0 ? (
            <div className="space-y-3">
              {recentRecords.map((record) => (
                <div
                  key={`${record.courseId}-${record.lessonId}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 hover:shadow-sm transition-all duration-200"
                >
                  <span className="text-lg">{record.courseIcon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{record.courseTitle}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(record.lastAccessed).toLocaleDateString('zh-CN')} · 得分 {record.score}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <BookOpen size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">还没有学习记录</p>
              <p className="text-xs mt-1">开始学习吧！</p>
            </div>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-gray-100 card-shadow p-6">
          <div className="flex items-center gap-2 mb-5">
            <Settings size={16} className="text-[#E8953C]" />
            <h3 className="text-sm font-heading font-semibold">学习设置</h3>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-gray-400" />
                  <span className="text-sm font-medium">目标语言</span>
                </div>
                <button
                  onClick={() => {
                    if (editingLanguages) {
                      handleSaveLanguages();
                    } else {
                      setSelectedLanguages(user.targetLanguages);
                      setEditingLanguages(true);
                    }
                  }}
                  className="text-xs font-medium text-[#E8953C] hover:text-[#D4852E] transition-colors"
                >
                  {editingLanguages ? '保存' : '修改'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map((lang) => {
                  const isSelected = selectedLanguages.includes(lang.key);
                  return (
                    <button
                      key={lang.key}
                      disabled={!editingLanguages}
                      onClick={() => toggleLanguage(lang.key)}
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all',
                        isSelected
                          ? 'border-current shadow-sm'
                          : 'border-gray-200 text-gray-400',
                        editingLanguages && 'cursor-pointer',
                        !editingLanguages && 'cursor-default'
                      )}
                      style={isSelected ? { background: `linear-gradient(135deg, ${lang.bgColor} 0%, ${lang.bgColor}dd 100%)`, color: lang.color } : {}}
                    >
                      {lang.flag} {lang.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bell size={14} className="text-gray-400" />
                  <span className="text-sm font-medium">学习提醒</span>
                </div>
                <button
                  onClick={() => setReminderEnabled(!reminderEnabled)}
                  className={cn(
                    'relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner',
                    reminderEnabled
                      ? 'bg-gradient-to-r from-[#E8953C] to-[#F5B86E] shadow-orange-200'
                      : 'bg-gray-200'
                  )}
                >
                  <div
                    className={cn(
                      'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300',
                      reminderEnabled ? 'left-[22px]' : 'left-0.5'
                    )}
                  />
                </button>
              </div>
              {reminderEnabled && (
                <div className="flex items-center gap-2 mt-3">
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#E8953C] focus:ring-1 focus:ring-[#E8953C]/20"
                  />
                  <span className="text-xs text-gray-400">每天提醒学习</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            variant="danger"
            size="lg"
            className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 border-0 shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transition-all duration-300"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2" />
            退出登录
          </Button>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
