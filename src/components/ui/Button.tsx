import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  const variants = {
    primary: 'text-white bg-gradient-to-r from-[#E8953C] to-[#D4852E] shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:-translate-y-0.5',
    secondary: 'text-gray-700 bg-white border border-gray-200 hover:border-[#E8953C] hover:text-[#E8953C] hover:shadow-md hover:-translate-y-0.5',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:scale-[1.02]',
    danger: 'text-white bg-red-500 hover:bg-red-600 active:scale-95',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
