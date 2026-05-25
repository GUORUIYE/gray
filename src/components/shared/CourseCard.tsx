import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  progress?: number;
  className?: string;
  langName?: string;
  langFlag?: string;
}

const levelColors: Record<string, string> = {
  'L1': 'bg-gradient-to-r from-green-400/20 to-green-500/10 text-green-600',
  'L2': 'bg-gradient-to-r from-blue-400/20 to-blue-500/10 text-blue-600',
  'L3': 'bg-gradient-to-r from-purple-400/20 to-purple-500/10 text-purple-600',
  'L4': 'bg-gradient-to-r from-orange-400/20 to-orange-500/10 text-orange-600',
  'L5': 'bg-gradient-to-r from-red-400/20 to-red-500/10 text-red-600',
};

const shimmerStyle = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
`;

export function CourseCard({ course, progress = 0, className, langName, langFlag }: CourseCardProps) {
  return (
    <Link
      to={`/learn/${course.id}`}
      className={cn(
        'group block bg-white rounded-2xl border border-gray-100 card-shadow overflow-hidden transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1',
        className
      )}
    >
      <style>{shimmerStyle}</style>
      <div className="h-36 relative overflow-hidden" style={{ backgroundColor: course.coverColor + '15' }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, ${course.coverColor}80 0%, transparent 50%)`,
        }} />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 80% 60%, ${course.coverColor} 0%, transparent 40%)`,
        }} />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(135deg, ${course.coverColor}40 0%, transparent 50%, ${course.coverColor}20 100%)`,
        }} />
        {langName && (
          <div className="absolute top-2 left-2 z-10">
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/70 backdrop-blur-sm text-gray-600 shadow-sm">
              {langFlag} {langName}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', levelColors[course.level] || 'bg-gradient-to-r from-gray-200 to-gray-100 text-gray-600')}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-3 right-3 text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3">{course.icon}</div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < course.difficulty ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_2px_rgba(251,191,36,0.4)]' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-sm mb-1.5 group-hover:text-[#E8953C] transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={12} />
            {course.totalLessons} 节课
          </span>
          <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-500">{course.category === 'comprehensive' ? '综合' : {
            vocabulary: '词汇', grammar: '语法', speaking: '口语', listening: '听力',
          }[course.category]}</span>
        </div>
        {progress > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">学习进度</span>
              <span className="text-[#E8953C] font-medium">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#E8953C] to-[#F5B86E] rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${progress}%` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  style={{ animation: 'shimmer 2s ease-in-out infinite' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
