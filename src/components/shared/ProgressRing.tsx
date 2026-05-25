import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
}

export function ProgressRing({ progress, size = 60, strokeWidth = 5, className, color = '#E8953C' }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;
  const angle = (progress / 100) * 2 * Math.PI;
  const dotX = cx + radius * Math.sin(angle);
  const dotY = cy - radius * Math.cos(angle);

  return (
    <svg width={size} height={size} className={cn('transform -rotate-90', className)}>
      <defs>
        <linearGradient id={`gradient-${progress}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8953C" />
          <stop offset="50%" stopColor="#F2A7B3" />
          <stop offset="100%" stopColor="#E8953C" />
        </linearGradient>
        <filter id={`glow-${progress}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={`url(#gradient-${progress})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={`url(#gradient-${progress})`}
        strokeWidth={strokeWidth + 2}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        opacity="0.25"
        filter={`url(#glow-${progress})`}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      {progress > 0 && progress < 100 && (
        <circle
          cx={dotX}
          cy={dotY}
          r={strokeWidth / 2 + 1}
          fill="#F2A7B3"
          className="drop-shadow-[0_0_3px_rgba(242,167,179,0.6)]"
          transform={`rotate(90, ${dotX}, ${dotY})`}
        />
      )}
      {progress >= 100 && (
        <circle
          cx={cx}
          cy={cy - radius}
          r={strokeWidth / 2 + 1}
          fill="#F2A7B3"
          className="drop-shadow-[0_0_3px_rgba(242,167,179,0.6)]"
          transform="rotate(0, 0, 0)"
        />
      )}
    </svg>
  );
}
