import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen, Home, BarChart3, Users, Trophy, User, LogOut,
  Menu, X, ChevronRight, Target,
} from 'lucide-react';
import { useUserStore } from '@/stores/userStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/courses', icon: BookOpen, label: '课程中心' },
  { path: '/progress', icon: BarChart3, label: '学习进度' },
  { path: '/path', icon: Target, label: '学习路径' },
  { path: '/community', icon: Users, label: '社区' },
  { path: '/achievements', icon: Trophy, label: '成就' },
];

const sidebarItemVariants = {
  inactive: { x: 0 },
  active: { x: 4 },
};

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useUserStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActivePath = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#E8953C]/10 transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} className="text-[#E8953C]" /> : <Menu size={20} className="text-gray-600" />}
            </button>
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E8953C] via-[#D4852E] to-[#C23B22] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-200/50 group-hover:shadow-orange-300/60 transition-shadow duration-300">
                L
              </div>
              <span className="font-heading text-lg font-semibold hidden sm:block">
                Lingua<span className="text-[#E8953C]">Learn</span>
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'text-[#E8953C] bg-[#E8953C]/8'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/60'
                  )}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn && user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl hover:bg-[#E8953C]/5 transition-colors group"
              >
                <motion.div
                  whileHover={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E8953C] to-[#F2A7B3] flex items-center justify-center text-white text-xs font-medium shadow-md shadow-orange-200/40"
                >
                  {user.username[0]}
                </motion.div>
                <div className="hidden sm:block text-sm">
                  <p className="font-medium leading-tight group-hover:text-[#E8953C] transition-colors">{user.username}</p>
                  <p className="text-xs text-gray-400">{user.level}</p>
                </div>
              </Link>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn-secondary text-sm !px-4 !py-2">登录</Link>
                <Link to="/register" className="btn-primary text-sm !px-4 !py-2">注册</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex max-w-[1600px] mx-auto">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <aside className={cn(
          'fixed lg:sticky top-16 z-30 w-64 h-[calc(100vh-4rem)] bg-white/90 backdrop-blur-lg border-r border-gray-100/80 transition-transform duration-300 ease-out lg:translate-x-0 flex flex-col',
          'shadow-[1px_0_4px_rgba(0,0,0,0.02)]',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-[#E8953C]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-20 -right-10 w-40 h-40 bg-gradient-to-bl from-[#F2A7B3]/8 to-transparent rounded-full blur-2xl" />
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#E8953C]/10 to-transparent" />
          </div>

          <nav className="flex-1 space-y-0.5 p-3 relative z-10 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <motion.div
                  key={item.path}
                  variants={sidebarItemVariants}
                  animate={isActive ? 'active' : 'inactive'}
                >
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group',
                      isActive
                        ? 'text-[#E8953C] bg-gradient-to-r from-[#E8953C]/12 to-transparent'
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/60'
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#E8953C] to-[#D4852E] rounded-r-full shadow-sm shadow-orange-300/50" />
                    )}
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
                      isActive
                        ? 'bg-gradient-to-br from-[#E8953C] to-[#D4852E] text-white shadow-md shadow-orange-200/40'
                        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                    )}>
                      <item.icon size={16} />
                    </div>
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight size={14} className="text-[#E8953C]" />}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="p-3 relative z-10">
            <div className="h-px bg-gradient-to-r from-transparent via-[#E8953C]/15 to-transparent mb-2" />
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <LogOut size={16} />
                </div>
                退出登录
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <User size={16} />
                </div>
                登录 / 注册
              </Link>
            )}
          </div>
        </aside>

        <main className="flex-1 min-h-[calc(100vh-4rem)] relative">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#E8953C]/[0.02]" />
          <div className="relative p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-[1520px]">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
