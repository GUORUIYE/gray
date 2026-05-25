import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CourseCard } from '@/components/shared/CourseCard';
import { useCourseStore } from '@/stores/courseStore';
import { languageInfo } from '@/data/mockData';
import { cn } from '@/lib/utils';

const languages = [
  { key: 'all', name: '全部' },
  { key: 'english', name: languageInfo.english.name, flag: languageInfo.english.flag },
  { key: 'japanese', name: languageInfo.japanese.name, flag: languageInfo.japanese.flag },
  { key: 'korean', name: languageInfo.korean.name, flag: languageInfo.korean.flag },
];

const categories = [
  { key: 'all', label: '全部' },
  { key: 'comprehensive', label: '综合' },
  { key: 'vocabulary', label: '词汇' },
  { key: 'grammar', label: '语法' },
  { key: 'speaking', label: '口语' },
  { key: 'listening', label: '听力' },
];

const categoryLabels: Record<string, string> = {
  comprehensive: '综合',
  vocabulary: '词汇',
  grammar: '语法',
  speaking: '口语',
  listening: '听力',
};

export default function Courses() {
  const { courses, getCourseProgress } = useCourseStore();
  const [selectedLang, setSelectedLang] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (selectedLang !== 'all' && course.language !== selectedLang) return false;
      if (selectedCategory !== 'all' && course.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [courses, selectedLang, selectedCategory, searchQuery]);

  const hasActiveFilters = selectedLang !== 'all' || selectedCategory !== 'all' || searchQuery.trim() !== '';

  const clearFilters = () => {
    setSelectedLang('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-start gap-3">
            <div className="w-1 h-10 mt-1.5 rounded-full bg-gradient-to-b from-[#E8953C] to-[#F5B86E] flex-shrink-0" />
            <div className="relative">
              <div className="absolute -top-6 -left-4 text-6xl opacity-[0.04] rotate-12 select-none pointer-events-none">📚</div>
              <div className="absolute -bottom-3 -right-2 text-5xl opacity-[0.04] -rotate-6 select-none pointer-events-none">🌍</div>
              <h1 className="text-2xl font-heading font-bold relative">课程中心</h1>
              <p className="text-gray-500 mt-1">
              共 {filteredCourses.length} 门课程
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-2 text-sm text-[#E8953C] hover:underline inline-flex items-center gap-0.5"
                >
                  清除筛选 <X size={12} />
                </button>
              )}
            </p>
          </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:flex-none">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="搜索课程..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#E8953C]/15 focus:border-[#E8953C] focus:shadow-lg focus:shadow-orange-100/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'p-2 rounded-xl border transition-all active:scale-90 active:shadow-inner',
                showFilters
                  ? 'bg-[#E8953C] text-white border-[#E8953C] shadow-md shadow-orange-200/50'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-[#E8953C] hover:shadow-sm hover:shadow-orange-100/30'
              )}
            >
              <Filter size={18} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: showFilters ? 1 : 0, height: showFilters ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="bg-gradient-to-br from-white to-orange-50/40 rounded-2xl border border-orange-100/50 card-shadow p-6 space-y-6">
            <div>
              <p className="text-xs font-medium text-gray-400 mb-3">按语种筛选</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.key}
                    onClick={() => setSelectedLang(lang.key)}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95',
                      selectedLang === lang.key
                        ? 'bg-gradient-to-r from-[#E8953C] to-[#D4852E] text-white shadow-lg shadow-orange-200/50'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    {lang.flag && <span>{lang.flag}</span>}
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400 mb-3">按类型筛选</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95',
                      selectedCategory === cat.key
                        ? 'bg-gradient-to-r from-[#E8953C] to-[#D4852E] text-white shadow-lg shadow-orange-200/50'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {filteredCourses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course, index) => {
                const langInfo = languageInfo[course.language as keyof typeof languageInfo];
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <CourseCard
                      course={course}
                      progress={getCourseProgress(course.id)}
                      langFlag={langInfo?.flag}
                      langName={langInfo?.name}
                    />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="relative inline-block mb-6">
                <div className="text-7xl">🔍</div>
                <motion.div
                  className="absolute -top-2 -right-2 text-2xl"
                  animate={{ rotate: [0, -10, 10, 0], y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >💡</motion.div>
              </div>
              <h3 className="text-lg font-heading font-semibold text-gray-700 mb-2">未找到匹配课程</h3>
              <p className="text-sm text-gray-500 mb-6">尝试调整筛选条件或搜索关键词</p>
              <button
                onClick={clearFilters}
                className="btn-primary text-sm !px-5 !py-2.5"
              >
                清除所有筛选
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
