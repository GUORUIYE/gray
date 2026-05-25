import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, Clock, BookOpen, BookMarked, Calendar,
  TrendingUp, Target,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { Layout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';
import { useCommunityStore } from '@/stores/communityStore';
import { useCourseStore } from '@/stores/courseStore';
import { weeklyStudyData, skillRadarData } from '@/data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1A3A5C',
      titleFont: { size: 12 },
      bodyFont: { size: 12 },
      padding: 8,
      cornerRadius: 8,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 4,
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: {
        stepSize: 1,
        font: { size: 11 },
        color: '#9CA3AF',
      },
    },
    x: {
      grid: { display: false },
      ticks: {
        font: { size: 11 },
        color: '#9CA3AF',
      },
    },
  },
};

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1A3A5C',
      titleFont: { size: 12 },
      bodyFont: { size: 12 },
      padding: 8,
      cornerRadius: 8,
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      grid: { color: 'rgba(0,0,0,0.06)' },
      angleLines: { color: 'rgba(0,0,0,0.06)' },
      pointLabels: {
        font: { size: 12, weight: 500 },
        color: '#6B7280',
      },
      ticks: {
        stepSize: 20,
        font: { size: 9 },
        color: '#9CA3AF',
        backdropColor: 'transparent',
      },
    },
  },
};

const barData = {
  labels: weeklyStudyData.map((d) => d.day),
  datasets: [
    {
      label: '学习时长',
      data: weeklyStudyData.map((d) => d.hours),
      backgroundColor: weeklyStudyData.map((d) =>
        d.hours > 0 ? 'rgba(232, 149, 60, 0.75)' : 'rgba(229, 231, 235, 0.5)'
      ),
      borderColor: weeklyStudyData.map((d) =>
        d.hours > 0 ? '#E8953C' : 'rgba(229, 231, 235, 0.5)'
      ),
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
};

const radarChartData = {
  labels: skillRadarData.labels,
  datasets: [
    {
      label: '技能水平',
      data: skillRadarData.values,
      backgroundColor: 'rgba(232, 149, 60, 0.2)',
      borderColor: '#E8953C',
      borderWidth: 2,
      pointBackgroundColor: '#E8953C',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function StudyCalendar({ studyDates }: { studyDates: string[] }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: { date: string | null; day: number; isStudyDay: boolean; isToday: boolean }[] = [];

    for (let i = 0; i < startPadding; i++) {
      days.push({ date: null, day: 0, isStudyDay: false, isToday: false });
    }

    const todayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        date: dateStr,
        day: d,
        isStudyDay: studyDates.includes(dateStr),
        isToday: dateStr === todayStr,
      });
    }

    return days;
  }, [studyDates, year, month, now.getDate()]);

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="text-center text-xs font-medium text-gray-400 py-1">
            {wd}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((item, i) => (
          <div key={i} className="aspect-square flex items-center justify-center">
            {item.date ? (
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300',
                  item.isToday && 'ring-2 ring-offset-1 ring-orange-300 ring-offset-white',
                  item.isStudyDay
                    ? 'bg-gradient-to-br from-[#E8953C] to-[#F5B86E] text-white font-medium shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100',
                  item.isStudyDay && 'shadow-[0_0_8px_rgba(232,149,60,0.35)]',
                  item.isToday && !item.isStudyDay && 'bg-gradient-to-br from-orange-400 to-amber-500 text-white'
                )}
              >
                {item.day}
              </div>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Progress() {
  const { streak } = useCommunityStore();
  const { courses, getCourseProgress, getCompletedLessons } = useCourseStore();

  const totalStudyHours = weeklyStudyData.reduce((sum, d) => sum + d.hours, 0);
  const completedCourses = courses.filter((c) => getCourseProgress(c.id) === 100).length;
  const totalCompletedLessons = courses.reduce((sum, c) => sum + getCompletedLessons(c.id), 0);

  const stats = [
    {
      label: '连续学习',
      value: `${streak.currentStreak}天`,
      sublabel: `最长 ${streak.longestStreak}天`,
      icon: Flame,
      color: 'text-orange-500',
      bg: 'bg-gradient-to-br from-orange-400/20 to-amber-300/10',
    },
    {
      label: '总学习时长',
      value: `${totalStudyHours}小时`,
      sublabel: '本周累计',
      icon: Clock,
      color: 'text-blue-500',
      bg: 'bg-gradient-to-br from-blue-400/20 to-cyan-300/10',
    },
    {
      label: '已完成课程',
      value: `${completedCourses}门`,
      sublabel: `${totalCompletedLessons}课时完成`,
      icon: BookOpen,
      color: 'text-purple-500',
      bg: 'bg-gradient-to-br from-purple-400/20 to-pink-300/10',
    },
    {
      label: '掌握词汇量',
      value: '120',
      sublabel: '持续增长中',
      icon: BookMarked,
      color: 'text-green-500',
      bg: 'bg-gradient-to-br from-green-400/20 to-emerald-300/10',
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <Target size={24} className="text-[#E8953C]" />
            <h1 className="text-2xl font-heading font-bold relative">
              学习进度
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-[#E8953C] to-transparent rounded-full" />
            </h1>
          </div>
          <p className="text-gray-500 mt-3">追踪你的学习旅程与成长轨迹</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 card-shadow p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', stat.bg)}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid xl:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 card-shadow p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-[#E8953C]" />
                <h2 className="text-base font-heading font-semibold">本周学习时长</h2>
              </div>
              <span className="text-xs text-gray-400">单位：小时</span>
            </div>
            <div className="h-56">
              <Bar options={barOptions} data={barData} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl border border-gray-100 card-shadow p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-[#E8953C]" />
                <h2 className="text-base font-heading font-semibold">技能评估</h2>
              </div>
            </div>
            <div className="h-56">
              <Radar options={radarOptions} data={radarChartData} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 card-shadow p-6 hover:shadow-xl transition-shadow duration-300 max-w-full"
        >
          <div className="flex items-center gap-2 mb-5">
            <Calendar size={18} className="text-[#E8953C]" />
            <h2 className="text-base font-heading font-semibold">学习日历</h2>
            <span className="text-xs text-gray-400 ml-auto">
              本月共 {streak.studyDates.filter((d) => d.startsWith(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`)).length} 天有学习记录
            </span>
          </div>
          <StudyCalendar studyDates={streak.studyDates} />
        </motion.div>
      </div>
    </Layout>
  );
}
