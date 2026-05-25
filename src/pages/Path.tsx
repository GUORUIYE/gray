import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Target, MapPin, CheckCircle, Clock, BarChart3, Plus, Minus, RotateCcw } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CourseCard } from '@/components/shared/CourseCard';
import { useCourseStore } from '@/stores/courseStore';
import { mockLearningPath, languageInfo } from '@/data/mockData';
import { cn } from '@/lib/utils';

const roadmapLevels = [
  { level: 'L1', label: '入门' },
  { level: 'L2', label: '初级' },
  { level: 'L3', label: '中级' },
  { level: 'L4', label: '高级' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const categoryLabels: Record<string, string> = {
  comprehensive: '综合',
  vocabulary: '词汇',
  grammar: '语法',
  speaking: '口语',
  listening: '听力',
};

export default function Path() {
  const { courses, getCourseProgress } = useCourseStore();
  const [weeklyGoal, setWeeklyGoal] = useState(mockLearningPath.weeklyGoal);

  const langInfo = languageInfo[mockLearningPath.language as keyof typeof languageInfo];

  const recommendedCourseList = useMemo(
    () =>
      mockLearningPath.recommendedCourses
        .map((id) => courses.find((c) => c.id === id))
        .filter(Boolean),
    [courses]
  );

  const currentLevelIndex = roadmapLevels.findIndex(
    (r) => r.level === mockLearningPath.currentLevel
  );

  const getNodeStatus = (index: number) => {
    if (index < currentLevelIndex) return 'completed';
    if (index === currentLevelIndex) return 'current';
    return 'upcoming';
  };

  return (
    <Layout>
      <motion.div
        className="max-w-6xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2.5">
            <Target size={28} className="text-[#E8953C]" />
            <h1 className="text-2xl font-heading font-bold">学习路径</h1>
          </div>
          <p className="text-gray-500 mt-1">
            为你的 {langInfo?.flag} {langInfo?.name} 学习打造个性化推荐路线
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative bg-gradient-to-br from-[#E8953C]/10 via-[#F2A7B3]/5 to-[#F5B86E]/10 rounded-2xl border border-orange-100/50 card-shadow p-6 lg:p-8 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#E8953C_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8953C] to-[#D4852E] flex items-center justify-center text-white shadow-lg shadow-orange-200 shrink-0">
              <BarChart3 size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">当前语言水平</p>
              <h2 className="text-xl font-heading font-bold">
                {mockLearningPath.currentLevel} · {langInfo?.name} {roadmapLevels[currentLevelIndex]?.label || ''}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                预估 {mockLearningPath.estimatedDuration}
              </p>
            </div>
            <button className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E8953C] bg-orange-50 hover:bg-orange-100 transition-colors px-4 py-2 rounded-xl">
              <RotateCcw size={14} />
              重新测试
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-[#E8953C]" />
            <h2 className="text-lg font-heading font-semibold">学习路线图</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 card-shadow p-6">
            <div className="flex items-center justify-between">
              {roadmapLevels.map((node, index) => {
                const status = getNodeStatus(index);
                const isLast = index === roadmapLevels.length - 1;
                return (
                  <div key={node.level} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-500',
                          status === 'completed' &&
                            'bg-green-100 text-green-600 border-2 border-green-300 shadow-sm shadow-green-200',
                          status === 'current' &&
                            'bg-orange-100 text-orange-600 border-2 border-orange-300 shadow-md shadow-orange-200 scale-110',
                          status === 'upcoming' &&
                            'bg-gray-50 text-gray-400 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                        )}
                        style={
                          status === 'completed'
                            ? { boxShadow: '0 0 12px rgba(34, 197, 94, 0.3)' }
                            : status === 'current'
                              ? { animation: 'none' }
                              : undefined
                        }
                      >
                        {status === 'completed' ? (
                          <CheckCircle size={20} />
                        ) : (
                          node.level
                        )}
                      </div>
                      <span
                        className={cn(
                          'text-xs font-medium mt-1.5 transition-colors duration-300',
                          status === 'completed' && 'text-green-600',
                          status === 'current' && 'text-orange-600',
                          status === 'upcoming' && 'text-gray-400'
                        )}
                      >
                        {node.label}
                      </span>
                    </div>
                    {!isLast && (
                      <div
                        className={cn(
                          'flex-1 h-0.5 mx-3 self-center mt-[-1.5rem] transition-all duration-500',
                          index < currentLevelIndex
                            ? 'bg-gradient-to-r from-green-300 to-green-400'
                            : index === currentLevelIndex
                              ? 'bg-gradient-to-r from-orange-300 via-orange-200 to-gray-200'
                              : 'bg-gray-200'
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-[#E8953C]" />
                <h2 className="text-lg font-heading font-semibold">推荐课程</h2>
              </div>
              <span className="text-xs text-gray-400">
                基于你的 {mockLearningPath.currentLevel} 水平推荐
              </span>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {recommendedCourseList.length > 0 ? (
                recommendedCourseList.map((course, index) => {
                  const lang = languageInfo[course!.language as keyof typeof languageInfo];
                  return (
                    <motion.div
                      key={course!.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <div className="mb-2 flex items-center gap-1.5">
                        <span className="text-xs text-gray-400">{lang?.flag}</span>
                        <span className="text-xs text-gray-400">{lang?.name}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400">
                          {categoryLabels[course!.category] || course!.category}
                        </span>
                      </div>
                      <CourseCard
                        course={course!}
                        progress={getCourseProgress(course!.id)}
                      />
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12 text-gray-400">
                  暂无推荐课程
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 card-shadow p-5 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-[#E8953C]" />
                <h3 className="text-sm font-heading font-semibold">每周课时目标</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setWeeklyGoal((g) => Math.max(1, g - 1))}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E8953C] hover:text-[#E8953C] hover:bg-orange-50 transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="text-3xl font-heading font-bold text-[#E8953C]">
                  {weeklyGoal}
                </span>
                <button
                  onClick={() => setWeeklyGoal((g) => Math.min(20, g + 1))}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E8953C] hover:text-[#E8953C] hover:bg-orange-50 transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">节 / 周</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 card-shadow p-5 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Target size={16} className="text-[#E8953C]" />
                <h3 className="text-sm font-heading font-semibold">焦点领域</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {mockLearningPath.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-orange-50 to-amber-50 text-[#E8953C] border border-orange-200/50"
                  >
                    {categoryLabels[area] || area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
