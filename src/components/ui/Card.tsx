import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  shadow?: 'default' | 'md' | 'hover';
}

export function Card({ className, children, hover = false, shadow = 'default' }: CardProps) {
  const shadows = {
    default: 'card-shadow',
    md: 'card-shadow-md',
    hover: 'card-shadow-hover',
  };

  if (hover) {
    return (
      <div className={cn('relative group', className)}>
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#E8953C] to-[#F5B86E] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        <div className={cn(
          'bg-white rounded-2xl border border-gray-50',
          shadows[shadow],
          'transition-all duration-300 group-hover:card-shadow-hover group-hover:-translate-y-0.5'
        )}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-white rounded-2xl border border-gray-50',
      shadows[shadow],
      className
    )}>
      {children}
    </div>
  );
}
