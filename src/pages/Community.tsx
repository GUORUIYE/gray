import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, ImagePlus } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { useCommunityStore } from '@/stores/communityStore';
import { cn } from '@/lib/utils';
import type { CommunityPost } from '@/types';

const avatarGradients = [
  'from-pink-400 to-rose-500',
  'from-sky-400 to-cyan-500',
  'from-violet-400 to-purple-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-indigo-400 to-blue-500',
  'from-fuchsia-400 to-pink-500',
  'from-lime-400 to-green-500',
];

const typeConfig: Record<CommunityPost['type'], { label: string; bg: string; text: string }> = {
  progress: { label: '学习进度', bg: 'bg-gradient-to-r from-blue-50 to-blue-100/50', text: 'text-blue-600' },
  achievement: { label: '获得成就', bg: 'bg-gradient-to-r from-purple-50 to-pink-100/50', text: 'text-purple-600' },
  question: { label: '求助提问', bg: 'bg-gradient-to-r from-orange-50 to-amber-100/50', text: 'text-orange-600' },
  tip: { label: '学习技巧', bg: 'bg-gradient-to-r from-green-50 to-emerald-100/50', text: 'text-green-600' },
};

function formatTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}天前`;
  return new Date(iso).toLocaleDateString('zh-CN');
}

function PostCard({ post, onLike, index }: { post: CommunityPost; onLike: (id: string) => void; index: number }) {
  const typeInfo = typeConfig[post.type];
  const gradient = avatarGradients[index % avatarGradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 card-shadow p-5 relative"
    >
      <div className="flex items-start gap-3">
        <div className={cn('w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-lg shrink-0 shadow-sm', gradient)}>
          {post.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{post.username}</span>
            <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent', typeInfo.bg, typeInfo.text)}>
              {typeInfo.label}
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
          {post.image && (
            <img
              src={post.image}
              alt="post image"
              className="mt-3 rounded-xl w-full max-h-64 object-cover"
            />
          )}
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center gap-1.5 transition-all hover:text-red-500 group"
            >
              <Heart size={15} className={cn(
                'transition-transform duration-200 group-hover:scale-125 group-hover:animate-bounce',
                post.likes > 0 ? 'fill-red-500 text-red-500' : ''
              )} />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center gap-1.5">
              <MessageCircle size={15} />
              <span>{post.comments}</span>
            </div>
            <span className="ml-auto text-xs text-gray-300">{formatTime(post.createdAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Community() {
  const { posts, addPost, likePost } = useCommunityStore();
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    addPost({
      userId: 'user-1',
      username: 'LinguaLearner',
      avatar: '👋',
      content: trimmed,
      type: 'progress',
    });
    setContent('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-heading font-bold">社区动态</h1>
          <p className="text-gray-500 text-sm mt-1">与其他学习者分享你的进步和心得</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 card-shadow p-5"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享你的学习进度、成就或问题..."
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#E8953C] focus:ring-2 focus:ring-[#E8953C]/30 focus:shadow-lg focus:shadow-orange-200/50"
          />
          <div className="flex items-center justify-between mt-3">
            <button className="p-2 rounded-lg text-gray-400 hover:text-[#E8953C] hover:bg-orange-50 transition-colors">
              <ImagePlus size={18} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{content.length} / 500</span>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!content.trim()}
              >
                <Send size={14} className="mr-1.5" />
                发布
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {posts.map((post, index) => (
            <div key={post.id} className="relative">
              {index > 0 && (
                <div className="absolute -top-2 left-14 right-0 flex items-center gap-2 pointer-events-none">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>
              )}
              <PostCard post={post} onLike={likePost} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
}
