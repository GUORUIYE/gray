import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/stores/userStore';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('请填写所有字段'); return; }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8953C]/5 via-transparent to-[#1A3A5C]/5 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#E8953C_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8953C] to-[#D4852E] flex items-center justify-center text-white font-bold text-xl">L</div>
          <span className="font-heading text-xl font-semibold">LinguaLearn</span>
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 card-shadow p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-heading font-bold">欢迎回来</h1>
              <p className="text-gray-500 text-sm mt-1">登录以继续你的学习之旅</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">邮箱地址</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="input-field !pl-11"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">密码</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field !pl-11"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? '登录中...' : <><LogIn size={18} /> 登录</>}
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            还没有账号？<Link to="/register" className="text-[#E8953C] font-medium hover:underline">立即注册</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
