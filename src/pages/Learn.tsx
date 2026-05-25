import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Pencil, Mic, Headphones, Check, X, Volume2, ChevronRight, RotateCcw, Star, AlertCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { useCourseStore } from '@/stores/courseStore';
import { allCourseContent } from '@/data/courseContent';
import type { CourseContentData, GrammarRule, SpeakingItemData, ListeningItemData } from '@/data/courseContent';
import type { VocabularyWord } from '@/types';
import { cn } from '@/lib/utils';

type Module = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

const modules: { key: Module; label: string; icon: typeof BookOpen }[] = [
  { key: 'vocabulary', label: '词汇', icon: BookOpen },
  { key: 'grammar', label: '语法', icon: Pencil },
  { key: 'speaking', label: '口语', icon: Mic },
  { key: 'listening', label: '听力', icon: Headphones },
];

function FlashCard({ words }: { words: VocabularyWord[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = words.length;
  const current = words[currentIndex];

  if (finished) {
    const totalAnswered = knownCount + unknownCount;
    const rate = totalAnswered > 0 ? Math.round((knownCount / totalAnswered) * 100) : 0;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-10 h-10 text-green-500" fill="currentColor" />
            </motion.div>
          </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">学习完成！</h3>
        <p className="text-gray-500 mb-8">本次共学习 {totalAnswered} 个单词</p>
        <div className="flex items-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{knownCount}</div>
            <div className="text-sm text-gray-400 mt-1">已认识</div>
          </div>
          <div className="w-px h-12 bg-gray-200" />
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">{unknownCount}</div>
            <div className="text-sm text-gray-400 mt-1">不认识</div>
          </div>
          <div className="w-px h-12 bg-gray-200" />
          <div className="text-center">
            <div className="text-3xl font-bold text-[#E8953C]">{rate}%</div>
            <div className="text-sm text-gray-400 mt-1">正确率</div>
          </div>
        </div>
        <Button variant="primary" onClick={() => {
          setCurrentIndex(0); setKnownCount(0); setUnknownCount(0); setIsFlipped(false); setFinished(false);
        }}>
          <RotateCcw size={16} className="mr-2" />再来一轮
        </Button>
      </motion.div>
    );
  }

  const handleKnown = () => {
    setKnownCount((c) => c + 1);
    if (currentIndex + 1 >= total) { setFinished(true); return; }
    setCurrentIndex((i) => i + 1); setIsFlipped(false);
  };
  const handleUnknown = () => {
    setUnknownCount((c) => c + 1);
    if (currentIndex + 1 >= total) { setFinished(true); return; }
    setCurrentIndex((i) => i + 1); setIsFlipped(false);
  };
  const progress = (currentIndex / total) * 100;

  return (
    <div className="flex flex-col items-center px-4 pt-6 pb-8">
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">{currentIndex + 1} / {total}</span>
          <span className="text-sm text-gray-400">已认识 {knownCount} · 不认识 {unknownCount}</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#E8953C] via-[#F5B86E] to-[#5B9E6B]"
            initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
      </div>

      <div className="w-full sm:max-w-sm aspect-[4/5] cursor-pointer perspective-[1000px] mb-8"
        onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div className="relative w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border border-orange-100/50 card-shadow-hover flex flex-col items-center justify-center p-8"
            style={{ backfaceVisibility: 'hidden' }}>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-orange-50/20 to-transparent pointer-events-none" />
            <p className="text-xs text-gray-400 mb-4">{current.partOfSpeech}</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{current.word}</h2>
            <p className="text-lg text-gray-400">{current.pronunciation}</p>
            <p className="text-xs text-gray-300 absolute bottom-6">点击翻转</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border border-orange-100/50 card-shadow-hover flex flex-col items-center justify-center p-8"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-orange-50/20 to-transparent pointer-events-none" />
            <p className="text-xs text-gray-400 mb-4">释义</p>
            <h2 className="text-2xl font-bold text-[#E8953C] mb-6">{current.translation}</h2>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-2xl p-4 w-full">
              <p className="text-sm text-gray-700 italic">{current.exampleSentence}</p>
              <p className="text-sm text-gray-400 mt-2">{current.exampleTranslation}</p>
            </div>
            <p className="text-xs text-gray-300 absolute bottom-6">点击翻转</p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        <motion.button onClick={handleUnknown}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 flex items-center justify-center text-red-400 hover:bg-red-100 hover:border-red-300 hover:text-red-500 hover:shadow-lg hover:shadow-red-200/40 transition-all">
          <X size={24} />
        </motion.button>
        <span className="text-sm text-gray-400">不认识</span>
        <div className="w-16" />
        <span className="text-sm text-gray-400">认识</span>
        <motion.button onClick={handleKnown}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-200 flex items-center justify-center text-green-400 hover:bg-green-100 hover:border-green-300 hover:text-green-500 hover:shadow-lg hover:shadow-green-200/40 transition-all">
          <Check size={24} />
        </motion.button>
      </div>
    </div>
  );
}

function GrammarExercise({ rules }: { rules: GrammarRule[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const allQuestions = rules.flatMap((g) =>
    g.questions.map((q) => ({ ...q, rule: g.rule, explanation: g.explanation, example: g.example }))
  );
  const total = allQuestions.length;
  const current = allQuestions[currentIndex];

  if (finished) {
    const rate = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-6">
          <Star className="w-10 h-10 text-[#E8953C]" fill="currentColor" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">练习完成！</h3>
        <p className="text-gray-500 mb-8">语法练习得分</p>
        <div className="text-6xl font-bold text-[#E8953C] mb-2">{rate}<span className="text-2xl text-gray-400">%</span></div>
        <p className="text-gray-400 mb-8">答对 {score} / {total} 题</p>
        <Button variant="primary" onClick={() => {
          setCurrentIndex(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setFinished(false);
        }}>
          <RotateCcw size={16} className="mr-2" />重新练习
        </Button>
      </motion.div>
    );
  }

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index); setShowResult(true);
    if (index === current.correctIndex) setScore((s) => s + 1);
  };
  const handleNext = () => {
    if (currentIndex + 1 >= total) { setFinished(true); return; }
    setCurrentIndex((i) => i + 1); setSelectedAnswer(null); setShowResult(false);
  };

  return (
    <div className="px-4 pt-6 pb-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-400">第 {currentIndex + 1} / {total} 题</span>
        <span className="text-sm text-gray-400">得分 {score}</span>
      </div>

      <div className="relative bg-gradient-to-br from-white to-orange-50/30 rounded-2xl border border-orange-100/50 card-shadow-hover p-8 mb-6 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E8953C] to-[#F5B86E] rounded-l-full" />
        <div className="flex items-start gap-2 mb-3">
          <span className="text-xs font-medium text-white bg-gradient-to-r from-[#E8953C] to-[#D4852E] px-2.5 py-1 rounded-md whitespace-nowrap shadow-sm">语法规则</span>
        </div>
        <h4 className="font-semibold text-gray-800 mb-1">{current.rule}</h4>
        <p className="text-sm text-gray-500 mb-3">{current.explanation}</p>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-xl p-3 border border-gray-100/50">
          <p className="text-sm text-gray-600 italic">{current.example}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <p className="font-medium text-gray-800 mb-4">{current.question}</p>
          <div className="space-y-3">
            {current.options.map((option, index) => {
              const isCorrect = index === current.correctIndex;
              const isSelected = index === selectedAnswer;
              let optionClass = 'border-gray-200 bg-white hover:border-[#E8953C] hover:bg-orange-50 hover:shadow-md hover:shadow-orange-100/30';
              if (showResult) {
                if (isCorrect) optionClass = 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50/50 text-green-700';
                else if (isSelected && !isCorrect) optionClass = 'border-red-400 bg-gradient-to-r from-red-50 to-rose-50/50 text-red-700';
                else optionClass = 'border-gray-200 bg-white opacity-50';
              }
              return (
                <motion.button key={index} onClick={() => handleSelect(index)} disabled={showResult}
                  whileTap={!showResult ? { scale: 0.98 } : undefined}
                  className={cn('w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center gap-3', optionClass)}>
                  <span className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0',
                    showResult && isCorrect && 'bg-green-400 text-white',
                    showResult && isSelected && !isCorrect && 'bg-red-400 text-white',
                    !showResult && 'bg-gray-100 text-gray-500')}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-sm">{option}</span>
                  {showResult && isCorrect && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <Check size={16} className="ml-auto text-green-500" />
                    </motion.span>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <X size={16} className="ml-auto text-red-500" />
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {showResult && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <Button variant="primary" size="lg" className="w-full" onClick={handleNext}>
            {currentIndex + 1 >= total ? '查看结果' : '下一题'} <ChevronRight size={16} className="ml-1" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}

function Speaking({ items }: { items: SpeakingItemData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const item = items[currentIndex];
  const total = items.length;

  const handlePlay = () => { setIsPlaying(true); setTimeout(() => setIsPlaying(false), 2000); };
  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setScore(Math.floor(Math.random() * 41) + 60);
    } else {
      setIsRecording(true); setScore(null);
      setTimeout(() => {
        setIsRecording(false);
        setScore(Math.floor(Math.random() * 41) + 60);
      }, 3000);
    }
  };
  const handleNext = () => {
    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1); setScore(null); setIsRecording(false); setIsPlaying(false);
    }
  };

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-400">第 {currentIndex + 1} / {total} 段</span>
      </div>
      <div className="relative bg-gradient-to-br from-white to-orange-50/20 rounded-2xl border border-orange-100/30 card-shadow-hover p-6 mb-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none noise-bg" />
        <p className="text-lg text-gray-800 leading-relaxed mb-4 relative">{item.text}</p>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-xl p-4 border border-gray-100/50 relative">
          <p className="text-sm text-gray-500">{item.translation}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 mb-6">
        <motion.button onClick={handlePlay} disabled={isPlaying}
          whileTap={{ scale: 0.9 }}
          className={cn('w-16 h-16 rounded-full flex items-center justify-center transition-all',
            isPlaying ? 'bg-[#E8953C] text-white scale-110 shadow-lg shadow-orange-200' : 'bg-orange-50 text-[#E8953C] hover:bg-orange-100 hover:shadow-md hover:shadow-orange-100/30')}>
          <Volume2 size={28} />
        </motion.button>
        <motion.button onClick={handleRecord}
          whileTap={{ scale: 0.9 }}
          className={cn('w-20 h-20 rounded-full flex items-center justify-center transition-all relative',
            isRecording ? 'bg-gradient-to-br from-red-500 to-red-400 text-white shadow-xl shadow-red-200/50' : 'bg-gradient-to-br from-red-50 to-red-100/50 text-red-400 hover:bg-red-100 hover:shadow-lg hover:shadow-red-200/30')}>
          {isRecording ? (
            <><motion.span className="absolute inset-0 rounded-full bg-red-400/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} /><Mic size={28} className="relative" /></>
          ) : <Mic size={28} />}
        </motion.button>
      </div>
      {isRecording && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-red-500 font-medium mb-4">录音中...</motion.p>
      )}
      {score !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl border border-orange-100/50 card-shadow-hover p-6 mb-6 text-center">
          <p className="text-sm text-gray-400 mb-2">发音评分</p>
          <div className="text-5xl font-bold mb-2" style={{ color: score >= 80 ? '#22c55e' : score >= 60 ? '#E8953C' : '#ef4444' }}>{score}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16}
                className={star <= Math.ceil(score / 20) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
            ))}
          </div>
          <p className="text-sm text-gray-500">{score >= 90 ? '非常棒！' : score >= 80 ? '很好！' : score >= 70 ? '还不错！' : '多加练习！'}</p>
        </motion.div>
      )}
      {score !== null && currentIndex + 1 < total && (
        <Button variant="primary" size="lg" className="w-full" onClick={handleNext}>
          下一段 <ChevronRight size={16} className="ml-1" />
        </Button>
      )}
    </div>
  );
}

function Listening({ items }: { items: ListeningItemData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const item = items[currentIndex];
  const questions = item.questions;
  const question = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex + 1 >= questions.length;
  const isLastItem = currentIndex + 1 >= items.length;

  const handlePlay = () => { setIsPlaying(true); setTimeout(() => setIsPlaying(false), 2500); };
  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index); setShowResult(true);
  };
  const handleNext = () => {
    if (isLastQuestion) {
      if (isLastItem) { setCurrentIndex(0); setCurrentQuestionIndex(0); setSelectedAnswer(null); setShowResult(false); }
      else { setCurrentIndex((i) => i + 1); setCurrentQuestionIndex(0); setSelectedAnswer(null); setShowResult(false); }
    } else {
      setCurrentQuestionIndex((i) => i + 1); setSelectedAnswer(null); setShowResult(false);
    }
  };
  const isCorrect = selectedAnswer === question.correctIndex;

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-400">第 {currentIndex + 1} 段 · 问题 {currentQuestionIndex + 1}/{questions.length}</span>
      </div>
      <div className="flex justify-center mb-8">
        <motion.button onClick={handlePlay} disabled={isPlaying}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className={cn('w-20 h-20 rounded-full flex items-center justify-center transition-all relative overflow-hidden group',
            isPlaying ? 'bg-[#E8953C] text-white scale-110 shadow-xl shadow-orange-200' : 'bg-orange-50 text-[#E8953C] hover:bg-orange-100 hover:shadow-lg hover:shadow-orange-100/30')}>
          {!isPlaying && (
            <span className="absolute inset-0 rounded-full border-2 border-[#E8953C]/20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-500" />
          )}
          {!isPlaying && (
            <span className="absolute inset-2 rounded-full border-2 border-[#E8953C]/10 group-hover:scale-150 group-hover:opacity-0 transition-all duration-500 delay-100" />
          )}
          <Headphones size={32} className="relative" />
        </motion.button>
      </div>
      {isPlaying && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#E8953C]"
                animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">播放中...</p>
        </motion.div>
      )}
      {!isPlaying && (
        <motion.div key={currentQuestionIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <p className="font-medium text-gray-800 mb-4">{question.question}</p>
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let optionClass = 'border-gray-200 bg-white hover:border-[#E8953C] hover:bg-orange-50 hover:shadow-md hover:shadow-orange-100/30';
              if (showResult) {
                if (index === question.correctIndex) optionClass = 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50/50 text-green-700';
                else if (index === selectedAnswer && index !== question.correctIndex) optionClass = 'border-red-400 bg-gradient-to-r from-red-50 to-rose-50/50 text-red-700';
                else optionClass = 'border-gray-200 bg-white opacity-50';
              }
              return (
                <motion.button key={index} onClick={() => handleSelect(index)} disabled={showResult}
                  whileTap={!showResult ? { scale: 0.98 } : undefined}
                  className={cn('w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center gap-3', optionClass)}>
                  <span className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0',
                    showResult && index === question.correctIndex && 'bg-green-400 text-white',
                    showResult && index === selectedAnswer && index !== question.correctIndex && 'bg-red-400 text-white',
                    !showResult && 'bg-gray-100 text-gray-500')}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-sm">{option}</span>
                  {showResult && index === question.correctIndex && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <Check size={16} className="ml-auto text-green-500" />
                    </motion.span>
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctIndex && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <X size={16} className="ml-auto text-red-500" />
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
      {showResult && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <div className={cn('rounded-xl p-4 mb-4 text-sm', isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
            {isCorrect ? '回答正确！' : `回答错误。正确答案是 ${String.fromCharCode(65 + question.correctIndex)}`}
          </div>
          <Button variant="primary" size="lg" className="w-full" onClick={handleNext}>
            {isLastQuestion && isLastItem ? '重新开始' : '下一题'} <ChevronRight size={16} className="ml-1" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}

const emptyContent: CourseContentData = {
  courseId: '',
  vocabulary: [],
  grammar: [],
  speaking: [],
  listening: [],
};

export default function Learn() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseById, setCurrentCourse } = useCourseStore();
  const [activeModule, setActiveModule] = useState<Module>('vocabulary');

  const course = courseId ? getCourseById(courseId) : null;
  const content = courseId && allCourseContent[courseId] ? allCourseContent[courseId] : emptyContent;

  useEffect(() => {
    if (course) setCurrentCourse(course);
  }, [courseId]);

  const languageLabel: Record<string, string> = { english: '英语', japanese: '日语', korean: '韩语' };

  if (!course) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-24">
          <AlertCircle size={48} className="text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-600 mb-2">课程未找到</h2>
          <p className="text-gray-400 mb-6">该课程可能不存在或已被删除</p>
          <Button onClick={() => navigate('/courses')}>返回课程中心</Button>
        </div>
      </Layout>
    );
  }

  const hasModule = (type: Module) => {
    if (type === 'vocabulary') return content.vocabulary.length > 0;
    if (type === 'grammar') return content.grammar.length > 0;
    if (type === 'speaking') return content.speaking.length > 0;
    if (type === 'listening') return content.listening.length > 0;
    return false;
  };

  const availableModules = modules.filter(m => hasModule(m.key));
  const displayModule = hasModule(activeModule) ? activeModule : availableModules[0]?.key || 'vocabulary';

  return (
    <Layout>
      <div className="-m-4 sm:-m-6 lg:-m-8 min-h-[calc(100vh-4rem)] flex flex-col bg-gradient-to-b from-white to-[#F8F6F1]">
        <div className="sticky top-0 z-30 bg-gradient-to-b from-white/95 to-orange-50/80 backdrop-blur-xl border-b border-orange-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center h-14 gap-2">
              <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-white/60 transition-colors text-gray-500">
                <ArrowLeft size={20} />
              </button>
              <div className="flex-1 min-w-0 ml-1">
                <h1 className="font-semibold text-gray-800 text-sm truncate">{course.title}</h1>
                <p className="text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    {course.icon} {languageLabel[course.language] || course.language}
                  </span>
                  <span className="mx-1.5">·</span>
                  {course.level}
                  <span className="mx-1.5">·</span>
                  共 {course.totalLessons} 课
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-orange-100/30">
                难度{' '}
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < course.difficulty ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex gap-1 -mb-px overflow-x-auto scrollbar-hide">
              {modules.map((m) => {
                const isActive = displayModule === m.key;
                const Icon = m.icon;
                const disabled = !hasModule(m.key);
                return (
                  <button key={m.key}
                    onClick={() => hasModule(m.key) && setActiveModule(m.key)}
                    disabled={disabled}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all relative whitespace-nowrap',
                      isActive ? 'text-[#E8953C]' : disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'
                    )}>
                    <Icon size={16} />
                    {m.label}
                    {disabled && <span className="text-xs text-gray-300">(无)</span>}
                    {isActive && (
                      <motion.div layoutId="module-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-[#E8953C] to-[#F5B86E] shadow-[0_0_6px_rgba(232,149,60,0.5)]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="flex-1">
          {content === emptyContent ? (
            <div className="flex flex-col items-center justify-center py-24">
              <AlertCircle size={36} className="text-gray-300 mb-3" />
              <p className="text-gray-400">该课程的互动内容正在准备中...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={displayModule}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}>
                {displayModule === 'vocabulary' && <FlashCard words={content.vocabulary} />}
                {displayModule === 'grammar' && <GrammarExercise rules={content.grammar} />}
                {displayModule === 'speaking' && <Speaking items={content.speaking} />}
                {displayModule === 'listening' && <Listening items={content.listening} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </Layout>
  );
}
