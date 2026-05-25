import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Lock, Award, Medal, Star, Sparkles, BookOpen, Flame, Mic, Headphones, Globe, Users, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useCommunityStore } from '@/stores/communityStore';
import { cn } from '@/lib/utils';
import type { Achievement } from '@/types';

interface Category {
  label: string;
  icon: React.ReactNode;
  conditions: string[];
}

const categories: Category[] = [
  { label: '入门', icon: <Sparkles size={16} />, conditions: ['register', 'first_lesson'] },
  { label: '坚持', icon: <Flame size={16} />, conditions: ['streak_7', 'streak_30'] },
  { label: '词汇', icon: <BookOpen size={16} />, conditions: ['vocab_100', 'vocab_500'] },
  { label: '语法', icon: <Award size={16} />, conditions: ['grammar_master'] },
  { label: '多语', icon: <Globe size={16} />, conditions: ['tri_lingual'] },
  { label: '社区', icon: <Users size={16} />, conditions: ['community_star'] },
  { label: '口语', icon: <Mic size={16} />, conditions: ['speaking_10'] },
  { label: '时长', icon: <Clock size={16} />, conditions: ['hours_100'] },
  { label: '听力', icon: <Headphones size={16} />, conditions: ['listening_90'] },
];

function getCategory(condition: string): Category | undefined {
  return categories.find((c) => c.conditions.includes(condition));
}

const categoryIconBg: Record<string, string> = {
  '入门': 'bg-gradient-to-br from-sky-400/20 to-blue-400/10',
  '坚持': 'bg-gradient-to-br from-orange-400/20 to-rose-400/10',
  '词汇': 'bg-gradient-to-br from-green-400/20 to-emerald-400/10',
  '语法': 'bg-gradient-to-br from-purple-400/20 to-violet-400/10',
  '多语': 'bg-gradient-to-br from-pink-400/20 to-fuchsia-400/10',
  '社区': 'bg-gradient-to-br from-cyan-400/20 to-teal-400/10',
  '口语': 'bg-gradient-to-br from-amber-400/20 to-yellow-400/10',
  '时长': 'bg-gradient-to-br from-indigo-400/20 to-blue-400/10',
  '听力': 'bg-gradient-to-br from-emerald-400/20 to-green-400/10',
};

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const earned = achievement.isEarned;
  const category = getCategory(achievement.condition);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={earned ? { y: -4, transition: { type: 'spring', stiffness: 300 } } : undefined}
      className={cn(
        'relative rounded-2xl border p-5 text-center transition-all duration-300',
        earned
          ? 'bg-white border-gray-100 card-shadow hover:shadow-[0_0_16px_rgba(232,149,60,0.15)]'
          : 'bg-gray-50 border-gray-100 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.02)_0%,_transparent_70%)]'
      )}
    >
      {category && (
        <div className={cn(
          'absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium',
          earned ? 'bg-gradient-to-r from-orange-50 to-amber-50 text-[#E8953C] border border-orange-200/50' : 'bg-gray-200 text-gray-400'
        )}>
          {category.icon}
          {category.label}
        </div>
      )}

      <div className={cn(
        'w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 transition-all',
        earned
          ? 'bg-gradient-to-br from-[#E8953C]/10 to-[#F2A7B3]/10 shadow-sm'
          : 'bg-gray-200'
      )}>
        {earned ? achievement.icon : <Lock size={20} className="text-gray-300" />}
      </div>

      <h3 className={cn(
        'text-sm font-semibold mb-1',
        earned ? 'text-gray-900' : 'text-gray-400'
      )}>
        {achievement.name}
      </h3>
      <p className={cn(
        'text-xs leading-relaxed',
        earned ? 'text-gray-500' : 'text-gray-300'
      )}>
        {achievement.description}
      </p>
      {earned && achievement.earnedDate && (
        <p className="text-[10px] text-[#E8953C] mt-3 font-medium">
          获得于 {achievement.earnedDate}
        </p>
      )}
      {!earned && (
        <div className="mt-3 inline-flex items-center gap-1 text-[10px] text-gray-300">
          <Lock size={10} />
          尚未获得
        </div>
      )}
    </motion.div>
  );
}

export default function Achievements() {
  const { achievements } = useCommunityStore();

  const earnedCount = useMemo(() => achievements.filter((a) => a.isEarned).length, [achievements]);
  const totalCount = achievements.length;

  const grouped = useMemo(() => {
    const map = new Map<string, Achievement[]>();
    categories.forEach((cat) => {
      const items = achievements.filter((a) => cat.conditions.includes(a.condition));
      if (items.length > 0) map.set(cat.label, items);
    });
    const uncategorized = achievements.filter((a) => !getCategory(a.condition));
    if (uncategorized.length > 0) map.set('其他', uncategorized);
    return map;
  }, [achievements]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-heading font-bold">成就徽章</h1>
          <p className="text-gray-500 text-sm mt-1">完成不同的学习目标来解锁成就</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 rounded-2xl border border-orange-100/50 card-shadow p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8953C] via-[#F2A7B3] to-[#F5B86E] flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Trophy size={28} />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold">{earnedCount}</span>
                <span className="text-2xl text-gray-300 font-medium">/ {totalCount}</span>
              </div>
              <p className="text-sm text-gray-500">
                {earnedCount === 0
                  ? '继续学习，开始收集成就吧！'
                  : earnedCount === totalCount
                    ? '恭喜你集齐了所有成就！'
                    : `已获得 ${earnedCount} 个成就，继续加油！`}
              </p>
            </div>
          </div>
          <div className="mt-5 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(earnedCount / totalCount) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-[#E8953C] via-[#F2A7B3] to-[#F5B86E]"
            />
          </div>
        </motion.div>

        {Array.from(grouped.entries()).map(([categoryLabel, items], groupIndex) => (
          <motion.section
            key={categoryLabel}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.08 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className={cn(
                'w-8 h-8 rounded-xl flex items-center justify-center',
                categoryIconBg[categoryLabel] || 'bg-gray-100'
              )}>
                {categories.find(c => c.label === categoryLabel)?.icon}
              </div>
              <h2 className="text-lg font-heading font-semibold">{categoryLabel}成就</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
              <span className="text-xs text-gray-400">
                {items.filter((a) => a.isEarned).length} / {items.length}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </Layout>
  );
}
