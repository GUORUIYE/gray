import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Flame, BarChart3, ChevronRight, ArrowRight, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CourseCard } from '@/components/shared/CourseCard';
import { useUserStore } from '@/stores/userStore';
import { useCourseStore } from '@/stores/courseStore';
import { useCommunityStore } from '@/stores/communityStore';
import { languageInfo } from '@/data/mockData';
import { Layout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';

const languages = [
  { key: 'english', ...languageInfo.english },
  { key: 'japanese', ...languageInfo.japanese },
  { key: 'korean', ...languageInfo.korean },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Home() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUserStore();
  const { courses, getCourseProgress } = useCourseStore();
  const { streak } = useCommunityStore();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  const filteredCourses = selectedLang
    ? courses.filter((c) => c.language === selectedLang).slice(0, 3)
    : courses.slice(0, 4);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F8F6F1]">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E8953C] to-[#D4852E] flex items-center justify-center text-white font-bold text-lg">L</div>
              <span className="font-heading text-lg font-semibold">LinguaLearn</span>
            </Link>
            <div className="flex gap-2">
              <Link to="/login" className="btn-secondary text-sm !px-4 !py-2">登录</Link>
              <Link to="/register" className="btn-primary text-sm !px-4 !py-2">注册</Link>
            </div>
          </div>
        </header>

        <main>
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8953C]/10 via-transparent to-[#1A3A5C]/5" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="text-[10rem] sm:text-[14rem] lg:text-[18rem] font-heading font-bold text-gray-900/[0.04] tracking-[0.15em] leading-none">
                LINGUA
              </span>
            </div>
            <div className="absolute top-16 left-8 w-3 h-3 rounded-full bg-[#E8953C]/20 animate-float" />
            <div className="absolute top-32 right-12 w-5 h-5 rounded-full bg-[#1A3A5C]/10 animate-float-delayed" />
            <div className="absolute bottom-32 left-16 w-4 h-4 rounded-full bg-[#F2A7B3]/20 animate-float-slow" />
            <div className="absolute bottom-48 right-24 w-3 h-3 rounded-full bg-[#E8953C]/15 animate-float" style={{ animationDelay: '-3s' }} />
            <div className="absolute top-1/2 left-8 w-2 h-2 rounded-full bg-[#5B9E6B]/15 animate-float-delayed" style={{ animationDelay: '-2s' }} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8953C]/10 rounded-full text-[#E8953C] text-sm font-medium mb-6">
                  <GraduationCap size={16} />
                  开启你的语言之旅
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-wide leading-tight mb-6 relative">
                  <span className="text-gradient-warm">沉浸式</span>
                  {' '}
                  <span className="text-gradient">多语种</span>
                  {' '}
                  学习体验
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
                  英语 · 日语 · 韩语 — 个性化学习路径、互动练习、社区激励，让语言学习变得有趣而高效
                </p>
                <Link to="/register" className="btn-primary text-base inline-flex items-center gap-2 group">
                  免费开始学习 <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E8953C]/30 to-transparent" />
          </div>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 relative">
            <h2 className="text-2xl font-heading font-semibold tracking-wide mb-8 text-center section-underline-center pb-2">选择你的目标语言</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => navigate('/register')}
                  className="bg-white rounded-2xl border border-gray-100 card-shadow p-6 cursor-pointer group hover:shadow-xl hover:border-[#E8953C]/20 hover:bg-gradient-to-br hover:from-white hover:to-orange-50/60 transition-all duration-300"
                >
                  <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">{lang.flag}</div>
                  <h3 className="text-lg font-heading font-semibold mb-1 group-hover:text-[#E8953C] transition-colors duration-300">{lang.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{lang.nativeName}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{lang.students} 学员</span>
                    <span>{lang.courses} 课程</span>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-[#E8953C] font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0">
                    开始学习 <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-100/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/40 to-transparent" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-xl border border-gray-100 card-shadow p-6 relative overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#E8953C]/5 pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8953C] to-[#D4852E] flex items-center justify-center text-white font-bold text-xl shadow-md shadow-orange-200">
                  {user?.username?.[0] || 'U'}
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold">
                    欢迎回来，{user?.username}
                  </h1>
                  <p className="text-gray-500 mt-1">今日是提升语言能力的好时机</p>
                </div>
              </div>
              <Button onClick={() => navigate('/path')} variant="primary" size="sm">
                学习路径 <ChevronRight size={14} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: '连续学习', value: `${streak.currentStreak}天`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
              { label: '课程进度', value: `${courses.filter(c => getCourseProgress(c.id) > 0).length}门`, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: '总经验值', value: `${user?.experience ?? 0} XP`, icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50' },
              { label: '今日任务', value: '3项', icon: GraduationCap, color: 'text-green-500', bg: 'bg-green-50' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="bg-white rounded-xl border border-gray-100 card-shadow p-4 group hover:-translate-y-1 hover:card-shadow-md transition-all duration-300"
              >
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6', stat.bg)}>
                  <stat.icon size={18} className={cn(stat.color, 'transition-transform duration-300 group-hover:scale-110')} />
                </div>
                <p className="text-2xl font-extrabold bg-gradient-to-r from-[#E8953C] to-[#1A3A5C] bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />

        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-lg font-heading font-semibold section-underline pb-1">选择语种</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedLang(null)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300',
                !selectedLang
                  ? 'bg-[#E8953C] text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] shadow-md shadow-orange-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#E8953C] hover:shadow-sm hover:shadow-orange-100 hover:scale-[1.02]'
              )}
            >
              全部
            </button>
            {languages.map((lang) => (
              <button
                key={lang.key}
                onClick={() => setSelectedLang(lang.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300',
                  selectedLang === lang.key
                    ? 'bg-[#E8953C] text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] shadow-md shadow-orange-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#E8953C] hover:shadow-sm hover:shadow-orange-100 hover:scale-[1.02]'
                )}
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />

        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-heading font-semibold section-underline pb-1">
              {selectedLang ? languageInfo[selectedLang as keyof typeof languageInfo]?.name : '推荐'}课程
            </h2>
            <button onClick={() => navigate('/courses')} className="text-sm text-[#E8953C] font-medium hover:underline group">
              查看全部 <ChevronRight size={14} className="inline transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} progress={getCourseProgress(course.id)} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
