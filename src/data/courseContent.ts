import type { VocabularyWord } from '@/types';

export interface CourseContentData {
  courseId: string;
  vocabulary: VocabularyWord[];
  grammar: GrammarRule[];
  speaking: SpeakingItemData[];
  listening: ListeningItemData[];
}

export interface GrammarRule {
  rule: string;
  explanation: string;
  example: string;
  questions: { question: string; options: string[]; correctIndex: number }[];
}

export interface SpeakingItemData {
  text: string;
  translation: string;
}

export interface ListeningItemData {
  transcript: string;
  translation: string;
  questions: { question: string; options: string[]; correctIndex: number }[];
}

export const allCourseContent: Record<string, CourseContentData> = {
  // ========== 英语：入门基础 ==========
  'eng-beginner-1': {
    courseId: 'eng-beginner-1',
    vocabulary: [
      { id: 'eng-b1-v1', word: 'hello', translation: '你好', pronunciation: '/həˈloʊ/', exampleSentence: 'Hello, nice to meet you!', exampleTranslation: '你好，很高兴认识你！', partOfSpeech: 'int.', difficulty: 1, masteryLevel: 5, reviewCount: 20, nextReviewDate: '2025-06-01' },
      { id: 'eng-b1-v2', word: 'goodbye', translation: '再见', pronunciation: '/ɡʊdˈbaɪ/', exampleSentence: 'Goodbye, see you tomorrow!', exampleTranslation: '再见，明天见！', partOfSpeech: 'int.', difficulty: 1, masteryLevel: 5, reviewCount: 18, nextReviewDate: '2025-06-01' },
      { id: 'eng-b1-v3', word: 'thank you', translation: '谢谢', pronunciation: '/θæŋk juː/', exampleSentence: 'Thank you for your help.', exampleTranslation: '谢谢你的帮助。', partOfSpeech: 'phr.', difficulty: 1, masteryLevel: 5, reviewCount: 15, nextReviewDate: '2025-06-01' },
      { id: 'eng-b1-v4', word: 'please', translation: '请', pronunciation: '/pliːz/', exampleSentence: 'Please sit down.', exampleTranslation: '请坐。', partOfSpeech: 'adv.', difficulty: 1, masteryLevel: 4, reviewCount: 12, nextReviewDate: '2025-06-02' },
      { id: 'eng-b1-v5', word: 'sorry', translation: '对不起', pronunciation: '/ˈsɒri/', exampleSentence: "I'm sorry, I'm late.", exampleTranslation: '对不起，我迟到了。', partOfSpeech: 'adj.', difficulty: 1, masteryLevel: 4, reviewCount: 10, nextReviewDate: '2025-06-02' },
      { id: 'eng-b1-v6', word: 'water', translation: '水', pronunciation: '/ˈwɔːtər/', exampleSentence: 'Can I have a glass of water?', exampleTranslation: '能给我一杯水吗？', partOfSpeech: 'n.', difficulty: 1, masteryLevel: 4, reviewCount: 8, nextReviewDate: '2025-06-03' },
      { id: 'eng-b1-v7', word: 'book', translation: '书', pronunciation: '/bʊk/', exampleSentence: 'This is an interesting book.', exampleTranslation: '这是一本有趣的书。', partOfSpeech: 'n.', difficulty: 1, masteryLevel: 4, reviewCount: 8, nextReviewDate: '2025-05-30' },
      { id: 'eng-b1-v8', word: 'friend', translation: '朋友', pronunciation: '/frend/', exampleSentence: 'She is my best friend.', exampleTranslation: '她是我最好的朋友。', partOfSpeech: 'n.', difficulty: 1, masteryLevel: 5, reviewCount: 14, nextReviewDate: '2025-06-01' },
    ],
    grammar: [
      {
        rule: 'be 动词 (am/is/are)',
        explanation: 'be 动词是英语中最基本的动词。I 用 am，he/she/it 用 is，we/you/they 用 are。',
        example: 'I am a student. She is a teacher. They are friends.',
        questions: [
          { question: 'I ___ a student.', options: ['am', 'is', 'are', 'be'], correctIndex: 0 },
          { question: 'She ___ from China.', options: ['am', 'is', 'are', 'be'], correctIndex: 1 },
          { question: 'We ___ in the classroom.', options: ['am', 'is', 'are', 'be'], correctIndex: 2 },
          { question: 'They ___ happy.', options: ['am', 'is', 'are', 'be'], correctIndex: 2 },
        ],
      },
      {
        rule: '一般疑问句 (Yes/No Questions)',
        explanation: '将 be 动词提到句首构成一般疑问句，回答用 Yes 或 No。',
        example: 'Are you a student? Yes, I am. / No, I\'m not.',
        questions: [
          { question: '___ she your sister?', options: ['Am', 'Is', 'Are', 'Do'], correctIndex: 1 },
          { question: '___ they at home?', options: ['Am', 'Is', 'Are', 'Does'], correctIndex: 2 },
          { question: '___ you tired?', options: ['Am', 'Is', 'Are', 'Be'], correctIndex: 2 },
          { question: '___ it a cat?', options: ['Am', 'Is', 'Are', 'Do'], correctIndex: 1 },
        ],
      },
    ],
    speaking: [
      { text: 'Hello! My name is Tom. Nice to meet you.', translation: '你好！我叫汤姆。很高兴认识你。' },
      { text: 'I am from China. I study English every day.', translation: '我来自中国。我每天学习英语。' },
      { text: 'This is my book. It is very interesting.', translation: '这是我的书。它非常有趣。' },
    ],
    listening: [
      { transcript: 'Hello everyone! Welcome to our English class. Today we will learn basic greetings.', translation: '大家好！欢迎来到我们的英语课。今天我们将学习基本问候语。', questions: [
        { question: '这段内容是关于什么的？', options: ['数学课', '英语课', '体育课', '音乐课'], correctIndex: 1 },
        { question: '今天学习什么内容？', options: ['数字', '颜色', '基本问候语', '动物名称'], correctIndex: 2 },
      ]},
      { transcript: 'Please open your book to page five. Let\'s read the dialogue together.', translation: '请打开书到第五页。让我们一起朗读对话。', questions: [
        { question: '请打开书到第几页？', options: ['第三页', '第五页', '第十页', '第一页'], correctIndex: 1 },
        { question: '他们一起做什么？', options: ['写作业', '朗读对话', '听音乐', '画画'], correctIndex: 1 },
      ]},
    ],
  },

  // ========== 英语：初级会话 ==========
  'eng-elem-1': {
    courseId: 'eng-elem-1',
    vocabulary: [
      { id: 'eng-e1-v1', word: 'restaurant', translation: '餐厅', pronunciation: '/ˈrestərɑːnt/', exampleSentence: 'Let\'s go to a restaurant for dinner.', exampleTranslation: '我们去餐厅吃晚饭吧。', partOfSpeech: 'n.', difficulty: 2, masteryLevel: 3, reviewCount: 6, nextReviewDate: '2025-05-25' },
      { id: 'eng-e1-v2', word: 'delicious', translation: '美味的', pronunciation: '/dɪˈlɪʃəs/', exampleSentence: 'The food here is delicious.', exampleTranslation: '这里的食物很美味。', partOfSpeech: 'adj.', difficulty: 2, masteryLevel: 2, reviewCount: 4, nextReviewDate: '2025-05-24' },
      { id: 'eng-e1-v3', word: 'weather', translation: '天气', pronunciation: '/ˈweðər/', exampleSentence: 'The weather is nice today.', exampleTranslation: '今天天气很好。', partOfSpeech: 'n.', difficulty: 1, masteryLevel: 3, reviewCount: 7, nextReviewDate: '2025-05-28' },
      { id: 'eng-e1-v4', word: 'expensive', translation: '昂贵的', pronunciation: '/ɪkˈspensɪv/', exampleSentence: 'This bag is too expensive.', exampleTranslation: '这个包太贵了。', partOfSpeech: 'adj.', difficulty: 2, masteryLevel: 2, reviewCount: 5, nextReviewDate: '2025-05-25' },
      { id: 'eng-e1-v5', word: 'appointment', translation: '预约', pronunciation: '/əˈpɔɪntmənt/', exampleSentence: 'I have a doctor\'s appointment at 3 PM.', exampleTranslation: '我下午3点有个医生预约。', partOfSpeech: 'n.', difficulty: 3, masteryLevel: 1, reviewCount: 3, nextReviewDate: '2025-05-22' },
      { id: 'eng-e1-v6', word: 'direction', translation: '方向', pronunciation: '/dɪˈrekʃn/', exampleSentence: 'Can you tell me the direction to the station?', exampleTranslation: '能告诉我去车站怎么走吗？', partOfSpeech: 'n.', difficulty: 2, masteryLevel: 2, reviewCount: 4, nextReviewDate: '2025-05-23' },
    ],
    grammar: [
      {
        rule: '一般现在时 (Simple Present)',
        explanation: '表示习惯性动作或客观事实。第三人称单数加 -s/-es。',
        example: 'I eat breakfast at 7 AM. She eats breakfast at 8 AM.',
        questions: [
          { question: 'He ___ coffee every morning.', options: ['drink', 'drinks', 'drinking', 'drank'], correctIndex: 1 },
          { question: 'They ___ to school by bus.', options: ['go', 'goes', 'going', 'went'], correctIndex: 0 },
          { question: 'She ___ English very well.', options: ['speak', 'speaks', 'speaking', 'spoke'], correctIndex: 1 },
          { question: 'The sun ___ in the east.', options: ['rise', 'rises', 'rising', 'rose'], correctIndex: 1 },
        ],
      },
      {
        rule: '现在进行时 (Present Continuous)',
        explanation: '表示正在进行的动作。结构为 am/is/are + 动词-ing。',
        example: 'I am reading a book right now.',
        questions: [
          { question: 'She ___ dinner at the moment.', options: ['cook', 'cooks', 'is cooking', 'cooked'], correctIndex: 2 },
          { question: 'They ___ football in the park now.', options: ['play', 'plays', 'are playing', 'played'], correctIndex: 2 },
          { question: 'Listen! Someone ___ at the door.', options: ['knocks', 'is knocking', 'knock', 'knocked'], correctIndex: 1 },
          { question: "The children ___ in the garden.", options: ['play', 'plays', 'are playing', 'played'], correctIndex: 2 },
        ],
      },
    ],
    speaking: [
      { text: 'Excuse me, can you tell me how to get to the nearest subway station?', translation: '打扰一下，你能告诉我最近的地铁站怎么走吗？' },
      { text: 'I\'d like to order a cup of coffee and a sandwich, please.', translation: '我想点一杯咖啡和一个三明治。' },
      { text: 'What\'s the weather like today? It looks like it\'s going to rain.', translation: '今天天气怎么样？看起来要下雨了。' },
    ],
    listening: [
      { transcript: 'Good morning! Today\'s weather forecast: sunny and warm, with a high of 25 degrees Celsius.', translation: '早上好！今天的天气预报：晴朗温暖，最高温度25摄氏度。', questions: [
        { question: '今天天气怎么样？', options: ['下雨', '下雪', '晴朗温暖', '大风'], correctIndex: 2 },
        { question: '最高温度是多少？', options: ['20度', '25度', '30度', '15度'], correctIndex: 1 },
      ]},
      { transcript: 'Welcome to our restaurant. Here is the menu. Today\'s special is grilled salmon with vegetables.', translation: '欢迎来到我们餐厅。这是菜单。今天的特色菜是烤三文鱼配蔬菜。', questions: [
        { question: '这是什么地方？', options: ['图书馆', '餐厅', '超市', '医院'], correctIndex: 1 },
        { question: '今天的特色菜是什么？', options: ['牛排', '烤三文鱼', '沙拉', '意大利面'], correctIndex: 1 },
      ]},
    ],
  },

  // ========== 英语：中级语法 ==========
  'eng-inter-1': {
    courseId: 'eng-inter-1',
    vocabulary: [
      { id: 'eng-i1-v1', word: 'condition', translation: '条件', pronunciation: '/kənˈdɪʃn/', exampleSentence: 'Hard work is a condition for success.', exampleTranslation: '努力是成功的条件。', partOfSpeech: 'n.', difficulty: 3, masteryLevel: 2, reviewCount: 5, nextReviewDate: '2025-05-25' },
      { id: 'eng-i1-v2', word: 'consequence', translation: '后果', pronunciation: '/ˈkɑːnsɪkwens/', exampleSentence: 'Every action has a consequence.', exampleTranslation: '每个行动都有后果。', partOfSpeech: 'n.', difficulty: 4, masteryLevel: 1, reviewCount: 3, nextReviewDate: '2025-05-22' },
      { id: 'eng-i1-v3', word: 'inevitable', translation: '不可避免的', pronunciation: '/ɪnˈevɪtəbl/', exampleSentence: 'Change is inevitable in life.', exampleTranslation: '变化在生活中是不可避免的。', partOfSpeech: 'adj.', difficulty: 4, masteryLevel: 0, reviewCount: 1, nextReviewDate: '2025-05-21' },
      { id: 'eng-i1-v4', word: 'nevertheless', translation: '尽管如此', pronunciation: '/ˌnevərðəˈles/', exampleSentence: 'It was difficult; nevertheless, she succeeded.', exampleTranslation: '这很难；尽管如此，她成功了。', partOfSpeech: 'adv.', difficulty: 4, masteryLevel: 1, reviewCount: 2, nextReviewDate: '2025-05-23' },
      { id: 'eng-i1-v5', word: 'phenomenon', translation: '现象', pronunciation: '/fəˈnɑːmɪnən/', exampleSentence: 'The aurora is a natural phenomenon.', exampleTranslation: '极光是一种自然现象。', partOfSpeech: 'n.', difficulty: 3, masteryLevel: 2, reviewCount: 4, nextReviewDate: '2025-05-24' },
      { id: 'eng-i1-v6', word: 'significant', translation: '重要的，显著的', pronunciation: '/sɪɡˈnɪfɪkənt/', exampleSentence: 'There was a significant increase in sales.', exampleTranslation: '销售额有了显著增长。', partOfSpeech: 'adj.', difficulty: 3, masteryLevel: 2, reviewCount: 4, nextReviewDate: '2025-05-25' },
      { id: 'eng-i1-v7', word: 'ultimately', translation: '最终', pronunciation: '/ˈʌltɪmətli/', exampleSentence: 'Ultimately, the decision is yours.', exampleTranslation: '最终，决定权在你。', partOfSpeech: 'adv.', difficulty: 3, masteryLevel: 1, reviewCount: 3, nextReviewDate: '2025-05-22' },
    ],
    grammar: [
      {
        rule: '现在完成时 (Present Perfect)',
        explanation: '表示过去发生的动作对现在有影响，或持续到现在的状态。结构：have/has + 过去分词。',
        example: 'I have lived in Shanghai for five years.',
        questions: [
          { question: 'She ___ to London several times.', options: ['has been', 'have been', 'went', 'was going'], correctIndex: 0 },
          { question: '___ you ever ___ Japanese food?', options: ['Have, eat', 'Has, eaten', 'Have, eaten', 'Did, eat'], correctIndex: 2 },
          { question: 'They ___ lived here for 10 years.', options: ['has', 'have', 'are', 'were'], correctIndex: 1 },
          { question: 'He ___ just ___ the office.', options: ['has, leave', 'have, left', 'has, left', 'is, leaving'], correctIndex: 2 },
        ],
      },
      {
        rule: '第一条件句 (First Conditional)',
        explanation: '表示可能发生的真实条件。结构：If + 一般现在时，will + 动词原形。',
        example: 'If it rains tomorrow, I will stay at home.',
        questions: [
          { question: 'If you ___ hard, you will pass the exam.', options: ['study', 'studied', 'will study', 'studying'], correctIndex: 0 },
          { question: 'She ___ happy if she gets the gift.', options: ['is', 'will be', 'would be', 'was'], correctIndex: 1 },
          { question: 'If they ___ now, they will arrive by noon.', options: ['leave', 'left', 'will leave', 'leaving'], correctIndex: 0 },
          { question: 'We ___ the game if we practice more.', options: ['win', 'will win', 'won', 'would win'], correctIndex: 1 },
        ],
      },
      {
        rule: '被动语态 (Passive Voice)',
        explanation: '强调动作的承受者而非执行者。结构：be + 过去分词。',
        example: 'The book was written by a famous author.',
        questions: [
          { question: 'The letter ___ yesterday.', options: ['sent', 'was sent', 'is sent', 'sends'], correctIndex: 1 },
          { question: 'English ___ all over the world.', options: ['speak', 'is spoken', 'spoke', 'was spoken'], correctIndex: 1 },
          { question: 'The building ___ in 2020.', options: ['built', 'was built', 'builds', 'is built'], correctIndex: 1 },
          { question: 'Coffee ___ in many countries.', options: ['grows', 'is grown', 'grew', 'was grown'], correctIndex: 1 },
        ],
      },
    ],
    speaking: [
      { text: 'I have been learning English for three years, and I can already hold a conversation.', translation: '我已经学了三年英语，已经能进行对话了。' },
      { text: 'If I had more time, I would travel around the world and experience different cultures.', translation: '如果我有更多时间，我会环游世界，体验不同的文化。' },
      { text: 'The best way to learn a language is to practice speaking it every day without being afraid of making mistakes.', translation: '学习语言最好的方式就是每天练习说，不要害怕犯错。' },
    ],
    listening: [
      { transcript: 'Today\'s news: A new language learning app has been launched, helping millions of users worldwide to learn languages more effectively.', translation: '今日新闻：一款新的语言学习应用已上线，帮助全球数百万用户更有效地学习语言。', questions: [
        { question: '今天新闻的主要内容是什么？', options: ['新手机发布', '新语言学习应用上线', '新电影上映', '新餐厅开业'], correctIndex: 1 },
        { question: '这个应用帮助谁？', options: ['只帮助中国人', '全球数百万用户', '只帮助美国人', '只帮助儿童'], correctIndex: 1 },
      ]},
      { transcript: 'In today\'s business meeting, the CEO announced that the company will expand its operations to three new countries next year.', translation: '在今天的商务会议上，CEO宣布公司将明年扩展到三个新的国家。', questions: [
        { question: '谁做了宣布？', options: ['经理', 'CEO', '员工', '客户'], correctIndex: 1 },
        { question: '公司明年扩张到几个新国家？', options: ['两个', '三个', '五个', '一个'], correctIndex: 1 },
      ]},
    ],
  },

  // ========== 英语：高频词汇 1000 ==========
  'eng-vocab-1': {
    courseId: 'eng-vocab-1',
    vocabulary: [
      { id: 'eng-v1-v1', word: 'abandon', translation: '放弃，遗弃', pronunciation: '/əˈbændən/', exampleSentence: 'They had to abandon the project due to lack of funds.', exampleTranslation: '由于缺乏资金，他们不得不放弃这个项目。', partOfSpeech: 'v.', difficulty: 3, masteryLevel: 1, reviewCount: 3, nextReviewDate: '2025-05-22' },
      { id: 'eng-v1-v2', word: 'benefit', translation: '利益，好处', pronunciation: '/ˈbenɪfɪt/', exampleSentence: 'Regular exercise has many health benefits.', exampleTranslation: '定期锻炼对健康有很多好处。', partOfSpeech: 'n.', difficulty: 2, masteryLevel: 3, reviewCount: 6, nextReviewDate: '2025-05-26' },
      { id: 'eng-v1-v3', word: 'challenge', translation: '挑战', pronunciation: '/ˈtʃælɪndʒ/', exampleSentence: 'Learning a new language is a challenge.', exampleTranslation: '学习一门新语言是一项挑战。', partOfSpeech: 'n./v.', difficulty: 2, masteryLevel: 4, reviewCount: 8, nextReviewDate: '2025-05-28' },
      { id: 'eng-v1-v4', word: 'determine', translation: '决定，确定', pronunciation: '/dɪˈtɜːrmɪn/', exampleSentence: 'We need to determine the cause of the problem.', exampleTranslation: '我们需要确定问题的原因。', partOfSpeech: 'v.', difficulty: 3, masteryLevel: 2, reviewCount: 4, nextReviewDate: '2025-05-23' },
      { id: 'eng-v1-v5', word: 'establish', translation: '建立，设立', pronunciation: '/ɪˈstæblɪʃ/', exampleSentence: 'The company was established in 1990.', exampleTranslation: '这家公司成立于1990年。', partOfSpeech: 'v.', difficulty: 3, masteryLevel: 1, reviewCount: 3, nextReviewDate: '2025-05-22' },
      { id: 'eng-v1-v6', word: 'frequently', translation: '频繁地', pronunciation: '/ˈfriːkwəntli/', exampleSentence: 'I frequently visit my grandparents on weekends.', exampleTranslation: '我周末经常去看望祖父母。', partOfSpeech: 'adv.', difficulty: 2, masteryLevel: 3, reviewCount: 5, nextReviewDate: '2025-05-25' },
      { id: 'eng-v1-v7', word: 'generate', translation: '产生，生成', pronunciation: '/ˈdʒenəreɪt/', exampleSentence: 'The wind turbines generate electricity.', exampleTranslation: '风力涡轮机发电。', partOfSpeech: 'v.', difficulty: 3, masteryLevel: 1, reviewCount: 2, nextReviewDate: '2025-05-21' },
      { id: 'eng-v1-v8', word: 'illustrate', translation: '说明，阐明', pronunciation: '/ˈɪləstreɪt/', exampleSentence: 'Let me illustrate my point with an example.', exampleTranslation: '让我用一个例子来说明我的观点。', partOfSpeech: 'v.', difficulty: 4, masteryLevel: 1, reviewCount: 2, nextReviewDate: '2025-05-23' },
    ],
    grammar: [],
    speaking: [
      { text: 'Vocabulary is the foundation of language learning. The more words you know, the better you can express yourself.', translation: '词汇是语言学习的基础。你知道的单词越多，就越能很好地表达自己。' },
      { text: 'One effective way to memorize new words is to use them in sentences every day.', translation: '记忆新单词的一个有效方法是每天在句子中使用它们。' },
    ],
    listening: [
      { transcript: 'Tip for learning vocabulary: Instead of memorizing individual words, learn them in context. This helps you remember both the meaning and the usage.', translation: '词汇学习技巧：不要孤立地记忆单词，而是在语境中学习。这有助于你记住词义和用法。', questions: [
        { question: '这个技巧建议如何学习词汇？', options: ['死记硬背', '在语境中学习', '抄写单词', '听写'], correctIndex: 1 },
        { question: '这种方法有什么好处？', options: ['更快背诵', '记住词义和用法', '更容易拼写', '提高发音'], correctIndex: 1 },
      ]},
    ],
  },

  // ========== 英语：听力进阶 ==========
  'eng-listening-1': {
    courseId: 'eng-listening-1',
    vocabulary: [
      { id: 'eng-l1-v1', word: 'pronunciation', translation: '发音', pronunciation: '/prəˌnʌnsiˈeɪʃn/', exampleSentence: 'Your pronunciation has improved a lot.', exampleTranslation: '你的发音进步了很多。', partOfSpeech: 'n.', difficulty: 3, masteryLevel: 2, reviewCount: 4, nextReviewDate: '2025-05-24' },
      { id: 'eng-l1-v2', word: 'conversation', translation: '对话', pronunciation: '/ˌkɑːnvərˈseɪʃn/', exampleSentence: 'I had an interesting conversation with her.', exampleTranslation: '我和她进行了一次有趣的对话。', partOfSpeech: 'n.', difficulty: 2, masteryLevel: 3, reviewCount: 6, nextReviewDate: '2025-05-26' },
      { id: 'eng-l1-v3', word: 'intonation', translation: '语调', pronunciation: '/ˌɪntəˈneɪʃn/', exampleSentence: 'Intonation can change the meaning of a sentence.', exampleTranslation: '语调可以改变句子的意思。', partOfSpeech: 'n.', difficulty: 3, masteryLevel: 1, reviewCount: 2, nextReviewDate: '2025-05-22' },
    ],
    grammar: [],
    speaking: [],
    listening: [
      { transcript: 'Welcome to the English Listening Course. Today we will practice understanding different English accents, including British, American, and Australian English.', translation: '欢迎来到英语听力课程。今天我们将练习理解不同的英语口音，包括英式、美式和澳式英语。', questions: [
        { question: '今天练习什么？', options: ['语法', '写作', '理解不同口音', '阅读'], correctIndex: 2 },
        { question: '不包括哪种口音？', options: ['英式', '美式', '澳式', '印度式'], correctIndex: 3 },
      ]},
      { transcript: 'The meeting will start at 10 AM in conference room B. Please bring your reports and a laptop.', translation: '会议将于上午10点在B会议室开始。请携带报告和笔记本电脑。', questions: [
        { question: '会议几点开始？', options: ['9 AM', '10 AM', '2 PM', '3 PM'], correctIndex: 1 },
        { question: '在哪个房间？', options: ['A会议室', 'B会议室', 'C会议室', '大厅'], correctIndex: 1 },
        { question: '需要带什么？', options: ['报告和电脑', '手机和钱包', '书本和笔', '食物和水'], correctIndex: 0 },
      ]},
      { transcript: 'The flight to Tokyo has been delayed by two hours due to bad weather. Passengers are advised to wait at the gate.', translation: '由于恶劣天气，飞往东京的航班延误了2小时。建议乘客在登机口等待。', questions: [
        { question: '航班为什么延误？', options: ['机械故障', '恶劣天气', '乘客太少', '机场关闭'], correctIndex: 1 },
        { question: '延误了多长时间？', options: ['1小时', '2小时', '3小时', '30分钟'], correctIndex: 1 },
      ]},
    ],
  },

  // ========== 日语：五十音图 ==========
  'jpn-beginner-1': {
    courseId: 'jpn-beginner-1',
    vocabulary: [
      { id: 'jpn-b1-v1', word: 'ありがとう', translation: '谢谢', pronunciation: 'a-ri-ga-tō', exampleSentence: 'ありがとうございます。', exampleTranslation: '非常感谢。', partOfSpeech: 'phr.', difficulty: 1, masteryLevel: 5, reviewCount: 18, nextReviewDate: '2025-06-01' },
      { id: 'jpn-b1-v2', word: 'すみません', translation: '对不起，打扰一下', pronunciation: 'su-mi-ma-sen', exampleSentence: 'すみません、駅はどこですか？', exampleTranslation: '对不起，车站在哪里？', partOfSpeech: 'phr.', difficulty: 1, masteryLevel: 4, reviewCount: 12, nextReviewDate: '2025-06-01' },
      { id: 'jpn-b1-v3', word: 'おはよう', translation: '早上好', pronunciation: 'o-ha-yō', exampleSentence: 'おはようございます！', exampleTranslation: '早上好！', partOfSpeech: 'int.', difficulty: 1, masteryLevel: 5, reviewCount: 15, nextReviewDate: '2025-06-02' },
      { id: 'jpn-b1-v4', word: 'こんにちは', translation: '你好', pronunciation: 'kon-ni-chi-wa', exampleSentence: 'こんにちは、元気ですか？', exampleTranslation: '你好，你还好吗？', partOfSpeech: 'int.', difficulty: 1, masteryLevel: 5, reviewCount: 16, nextReviewDate: '2025-06-02' },
      { id: 'jpn-b1-v5', word: 'さようなら', translation: '再见', pronunciation: 'sa-yō-na-ra', exampleSentence: 'さようなら、また明日！', exampleTranslation: '再见，明天见！', partOfSpeech: 'int.', difficulty: 1, masteryLevel: 4, reviewCount: 10, nextReviewDate: '2025-05-30' },
      { id: 'jpn-b1-v6', word: 'はい', translation: '是', pronunciation: 'ha-i', exampleSentence: 'はい、わかりました。', exampleTranslation: '是，我明白了。', partOfSpeech: 'int.', difficulty: 1, masteryLevel: 5, reviewCount: 20, nextReviewDate: '2025-06-03' },
      { id: 'jpn-b1-v7', word: 'いいえ', translation: '不是', pronunciation: 'i-i-e', exampleSentence: 'いいえ、ちがいます。', exampleTranslation: '不，不是这样的。', partOfSpeech: 'int.', difficulty: 1, masteryLevel: 4, reviewCount: 8, nextReviewDate: '2025-06-01' },
      { id: 'jpn-b1-v8', word: 'お願いします', translation: '拜托了，请', pronunciation: 'o-ne-gai shi-ma-su', exampleSentence: 'コーヒーをお願いします。', exampleTranslation: '请给我一杯咖啡。', partOfSpeech: 'phr.', difficulty: 1, masteryLevel: 3, reviewCount: 7, nextReviewDate: '2025-05-28' },
    ],
    grammar: [
      {
        rule: 'です/ます 体 (敬体)',
        explanation: '日语敬体是礼貌的表达方式。です用于名词句和形容动词句，ます用于动词句。',
        example: '私は学生です。（我是学生。）／ 本を読みます。（读书。）',
        questions: [
          { question: '私は田中___。', options: ['です', 'ます', 'だ', 'である'], correctIndex: 0 },
          { question: '毎日日本語を勉強し___。', options: ['です', 'ます', 'だ', 'でした'], correctIndex: 1 },
          { question: 'これは本___.', options: ['ます', 'です', 'だ', 'である'], correctIndex: 1 },
          { question: '明日学校へ行き___。', options: ['です', 'ます', 'だ', 'ますか'], correctIndex: 1 },
        ],
      },
      {
        rule: '助詞「は」「が」',
        explanation: '「は」提示主题，「が」提示主语。は用于已知信息，が用于新信息。',
        example: '私は学生です。（我是学生）／ 猫がいます。（有猫）',
        questions: [
          { question: '私___田中です。', options: ['は', 'が', 'を', 'に'], correctIndex: 0 },
          { question: 'ここ___駅ですか？', options: ['は', 'が', 'を', 'に'], correctIndex: 0 },
          { question: '部屋に猫___います。', options: ['は', 'が', 'を', 'で'], correctIndex: 1 },
          { question: 'どちら___山田さんですか？', options: ['は', 'が', 'を', 'に'], correctIndex: 1 },
        ],
      },
    ],
    speaking: [
      { text: 'こんにちは、私はリンです。はじめまして、よろしくお願いします。', translation: '你好，我是小李。初次见面，请多关照。' },
      { text: '今日はいい天気ですね。一緒に散歩しませんか？', translation: '今天天气真好呢。一起散步怎么样？' },
      { text: 'すみません、この電車は渋谷に行きますか？', translation: '不好意思，这趟电车去涩谷吗？' },
    ],
    listening: [
      { transcript: '皆さん、こんにちは。今日から日本語の授業を始めます。よろしくお願いします。', translation: '各位好。从今天开始上日语课。请多关照。', questions: [
        { question: '这段话是在什么场合说的？', options: ['日本語の授業', '英語の授業', '会議', 'パーティー'], correctIndex: 0 },
        { question: '話し手は何を始めると言っていますか？', options: ['仕事', '日本語の授業', '旅行', '料理'], correctIndex: 1 },
      ]},
      { transcript: '明日のテストは午前9時からです。鉛筆と消しゴムを持ってきてください。', translation: '明天的考试从上午9点开始。请带铅笔和橡皮。', questions: [
        { question: 'テストは何時からですか？', options: ['8時', '9時', '10時', '11時'], correctIndex: 1 },
        { question: '何を持っていきますか？', options: ['本とノート', '鉛筆と消しゴム', '辞書とペン', '計算機'], correctIndex: 1 },
      ]},
    ],
  },

  // ========== 日语：初级语法 ==========
  'jpn-elem-1': {
    courseId: 'jpn-elem-1',
    vocabulary: [
      { id: 'jpn-e1-v1', word: '食べる', translation: '吃', pronunciation: 'ta-be-ru', exampleSentence: '朝ごはんを食べます。', exampleTranslation: '吃早餐。', partOfSpeech: 'v.', difficulty: 2, masteryLevel: 4, reviewCount: 8, nextReviewDate: '2025-05-28' },
      { id: 'jpn-e1-v2', word: '飲む', translation: '喝', pronunciation: 'no-mu', exampleSentence: '水を飲みたいです。', exampleTranslation: '想喝水。', partOfSpeech: 'v.', difficulty: 2, masteryLevel: 3, reviewCount: 6, nextReviewDate: '2025-05-26' },
      { id: 'jpn-e1-v3', word: '行く', translation: '去', pronunciation: 'i-ku', exampleSentence: '学校に行きます。', exampleTranslation: '去学校。', partOfSpeech: 'v.', difficulty: 2, masteryLevel: 4, reviewCount: 9, nextReviewDate: '2025-05-29' },
      { id: 'jpn-e1-v4', word: '見る', translation: '看', pronunciation: 'mi-ru', exampleSentence: 'テレビを見ます。', exampleTranslation: '看电视。', partOfSpeech: 'v.', difficulty: 2, masteryLevel: 3, reviewCount: 7, nextReviewDate: '2025-05-27' },
      { id: 'jpn-e1-v5', word: '聞く', translation: '听，问', pronunciation: 'ki-ku', exampleSentence: '音楽を聞きます。', exampleTranslation: '听音乐。', partOfSpeech: 'v.', difficulty: 2, masteryLevel: 3, reviewCount: 6, nextReviewDate: '2025-05-26' },
      { id: 'jpn-e1-v6', word: '話す', translation: '说，谈', pronunciation: 'ha-na-su', exampleSentence: '日本語で話しましょう。', exampleTranslation: '用日语说吧。', partOfSpeech: 'v.', difficulty: 2, masteryLevel: 2, reviewCount: 5, nextReviewDate: '2025-05-25' },
    ],
    grammar: [
      {
        rule: '助詞「を」「に」「で」',
        explanation: '「を」表示动作的对象（宾语）。「に」表示目的地或时间点。「で」表示动作发生的场所或手段。',
        example: 'ご飯を食べます（吃饭）／学校に行きます（去学校）／電車で行きます（坐电车去）',
        questions: [
          { question: 'りんご___食べます。', options: ['を', 'に', 'で', 'が'], correctIndex: 0 },
          { question: '公園___散歩します。', options: ['を', 'に', 'で', 'が'], correctIndex: 2 },
          { question: '明日9時___学校に行きます。', options: ['を', 'に', 'で', 'が'], correctIndex: 1 },
          { question: 'バス___会社へ行きます。', options: ['を', 'に', 'で', 'が'], correctIndex: 2 },
        ],
      },
      {
        rule: 'て形 (动词て形)',
        explanation: 'て形用于连接句子、表示请求、进行时等。动词变形规则按分类不同：五段动词、一段动词、不规则动词。',
        example: '宿題をして、テレビを見ます。（做完作业看电视。）',
        questions: [
          { question: '毎朝6時に___、学校へ行きます。', options: ['起きて', '起きる', '起きます', '起きた'], correctIndex: 0 },
          { question: 'ちょっと待って___.', options: ['ください', 'ます', 'ました', 'ません'], correctIndex: 0 },
          { question: '今、宿題を___います。', options: ['して', 'する', 'します', 'した'], correctIndex: 0 },
          { question: 'この本を___もいいですか？', options: ['読んで', '読む', '読みます', '読んだ'], correctIndex: 0 },
        ],
      },
    ],
    speaking: [
      { text: '毎日日本語を勉強しています。だんだん上手になってきました。', translation: '我每天都在学日语。逐渐变得擅长了。' },
      { text: 'すみません、この漢字の読み方を教えてください。', translation: '不好意思，请告诉我这个汉字的读法。' },
      { text: '休みの日はいつも本を読んだり、映画を見たりしています。', translation: '休息日我经常看看书、看看电影。' },
    ],
    listening: [
      { transcript: '今日の宿題は第5課の練習問題です。明日の授業までにやってきてください。', translation: '今天的作业是第5课的练习题。请在明天的课之前做好。', questions: [
        { question: '宿題はどの課ですか？', options: ['第3課', '第5課', '第7課', '第10課'], correctIndex: 1 },
        { question: '宿題の締切はいつですか？', options: ['今日', '明日の授業まで', '来週', '来月'], correctIndex: 1 },
      ]},
      { transcript: '来週の月曜日は祝日です。授業はお休みです。次の授業は水曜日です。', translation: '下周一是节假日。停课。下次课是周三。', questions: [
        { question: '来週の月曜日は何ですか？', options: ['テスト', '祝日', '運動会', '遠足'], correctIndex: 1 },
        { question: '次の授業はいつですか？', options: ['火曜日', '水曜日', '木曜日', '金曜日'], correctIndex: 1 },
      ]},
    ],
  },

  // ========== 日语：中级听力 ==========
  'jpn-inter-1': {
    courseId: 'jpn-inter-1',
    vocabulary: [
      { id: 'jpn-i1-v1', word: '経験', translation: '经验', pronunciation: 'ke-i-ken', exampleSentence: 'これはいい経験になりました。', exampleTranslation: '这成为了很好的经验。', partOfSpeech: 'n.', difficulty: 3, masteryLevel: 1, reviewCount: 3, nextReviewDate: '2025-05-22' },
      { id: 'jpn-i1-v2', word: '習慣', translation: '习惯', pronunciation: 'shū-kan', exampleSentence: '毎日勉強する習慣をつけましょう。', exampleTranslation: '养成每天学习的习惯吧。', partOfSpeech: 'n.', difficulty: 2, masteryLevel: 2, reviewCount: 4, nextReviewDate: '2025-05-24' },
      { id: 'jpn-i1-v3', word: '約束', translation: '约定，承诺', pronunciation: 'ya-ku-so-ku', exampleSentence: '約束を忘れないでください。', exampleTranslation: '请不要忘记约定。', partOfSpeech: 'n.', difficulty: 2, masteryLevel: 2, reviewCount: 5, nextReviewDate: '2025-05-25' },
      { id: 'jpn-i1-v4', word: '挑戦', translation: '挑战', pronunciation: 'chō-sen', exampleSentence: '新しいことに挑戦するのが好きです。', exampleTranslation: '我喜欢挑战新事物。', partOfSpeech: 'n./v.', difficulty: 3, masteryLevel: 1, reviewCount: 2, nextReviewDate: '2025-05-22' },
      { id: 'jpn-i1-v5', word: '感動', translation: '感动', pronunciation: 'kan-dō', exampleSentence: 'その映画に感動しました。', exampleTranslation: '我被那部电影感动了。', partOfSpeech: 'n.', difficulty: 2, masteryLevel: 2, reviewCount: 4, nextReviewDate: '2025-05-23' },
    ],
    grammar: [
      {
        rule: 'た形 (过去式)',
        explanation: '动词た形表示过去发生的事情，相当于英语的过去式。',
        example: '昨日、映画を見ました。（昨天看了电影。）',
        questions: [
          { question: '昨日、何を___か？', options: ['した', 'する', 'します', 'している'], correctIndex: 0 },
          { question: '先週、京都へ___。', options: ['行った', '行く', '行きます', '行っている'], correctIndex: 0 },
          { question: '朝ごはんを___？', options: ['食べた', '食べる', '食べます', '食べている'], correctIndex: 0 },
          { question: 'もう宿題を___。', options: ['終わった', '終わる', '終わります', '終わっている'], correctIndex: 0 },
        ],
      },
      {
        rule: 'たい形 (愿望表达)',
        explanation: '动词ます形去掉ます + たい，表示"想要做某事"。',
        example: '日本に行きたいです。（想去日本。）',
        questions: [
          { question: '将来、日本で仕事を___です。', options: ['したい', 'する', 'します', 'している'], correctIndex: 0 },
          { question: '何を___ですか？', options: ['食べたい', '食べる', '食べます', '食べた'], correctIndex: 0 },
          { question: '新しい携帯を___です。', options: ['買いたい', '買う', '買います', '買った'], correctIndex: 0 },
          { question: 'アニメを___ですか？', options: ['見たい', '見る', '見ます', '見た'], correctIndex: 0 },
        ],
      },
    ],
    speaking: [
      { text: '日本のアニメが大好きで、毎週何個も見ています。おかげで日本語のリスニングが上達しました。', translation: '我非常喜欢日本动漫，每周看好几部。托它的福，日语听力进步了。' },
      { text: '来年、日本に留学したいと思っています。そのために、もっと日本語を勉強しなければなりません。', translation: '我想明年去日本留学。为此，必须更加努力学习日语。' },
    ],
    listening: [
      { transcript: '日本の四季はとても美しいです。春は桜、夏は花火、秋は紅葉、冬は雪景色が楽しめます。', translation: '日本的四季非常美丽。春天可以欣赏樱花，夏天看烟花，秋天看红叶，冬天看雪景。', questions: [
        { question: '日本で春には何を楽しめますか？', options: ['花火', '桜', '紅葉', '雪'], correctIndex: 1 },
        { question: '秋には何が楽しめますか？', options: ['桜', '花火', '紅葉', '雪景色'], correctIndex: 2 },
      ]},
      { transcript: '昨日、友達と新宿で買い物をしました。その後、美味しいラーメンを食べて、カラオケに行きました。とても楽しい一日でした。', translation: '昨天和朋友在新宿购物了。之后吃了美味的拉面，去了卡拉OK。是非常开心的一天。', questions: [
        { question: '昨日どこで買い物をしましたか？', options: ['渋谷', '新宿', '池袋', '銀座'], correctIndex: 1 },
        { question: '買い物の後に何をしましたか？', options: ['映画を見た', 'ラーメンを食べた', '本を読んだ', '公園を散歩した'], correctIndex: 1 },
      ]},
    ],
  },

  // ========== 日语：核心词汇 ==========
  'jpn-vocab-1': {
    courseId: 'jpn-vocab-1',
    vocabulary: [
      { id: 'jpn-v1-v1', word: '図書館', translation: '图书馆', pronunciation: 'to-sho-kan', exampleSentence: '図書館で勉強します。', exampleTranslation: '在图书馆学习。', partOfSpeech: 'n.', difficulty: 2, masteryLevel: 3, reviewCount: 6, nextReviewDate: '2025-05-26' },
      { id: 'jpn-v1-v2', word: '病院', translation: '医院', pronunciation: 'byō-in', exampleSentence: '病院に行かなければなりません。', exampleTranslation: '必须去医院。', partOfSpeech: 'n.', difficulty: 2, masteryLevel: 3, reviewCount: 5, nextReviewDate: '2025-05-25' },
      { id: 'jpn-v1-v3', word: '天気予報', translation: '天气预报', pronunciation: 'ten-ki yo-hō', exampleSentence: '天気予報によると、明日は雨です。', exampleTranslation: '据天气预报，明天有雨。', partOfSpeech: 'n.', difficulty: 3, masteryLevel: 1, reviewCount: 3, nextReviewDate: '2025-05-22' },
      { id: 'jpn-v1-v4', word: '電車', translation: '电车', pronunciation: 'den-sha', exampleSentence: '電車で学校に行きます。', exampleTranslation: '坐电车去学校。', partOfSpeech: 'n.', difficulty: 2, masteryLevel: 4, reviewCount: 8, nextReviewDate: '2025-05-28' },
      { id: 'jpn-v1-v5', word: '映画館', translation: '电影院', pronunciation: 'ei-ga-kan', exampleSentence: '映画館で新しい映画を見ました。', exampleTranslation: '在电影院看了新电影。', partOfSpeech: 'n.', difficulty: 2, masteryLevel: 2, reviewCount: 4, nextReviewDate: '2025-05-24' },
      { id: 'jpn-v1-v6', word: '誕生日', translation: '生日', pronunciation: 'tan-jō-bi', exampleSentence: '昨日は私の誕生日でした。', exampleTranslation: '昨天是我的生日。', partOfSpeech: 'n.', difficulty: 1, masteryLevel: 4, reviewCount: 7, nextReviewDate: '2025-05-27' },
      { id: 'jpn-v1-v7', word: '旅行', translation: '旅行', pronunciation: 'ryo-kō', exampleSentence: '夏休みに北海道へ旅行します。', exampleTranslation: '暑假去北海道旅行。', partOfSpeech: 'n./v.', difficulty: 2, masteryLevel: 3, reviewCount: 5, nextReviewDate: '2025-05-25' },
    ],
    grammar: [],
    speaking: [
      { text: '東京にはたくさん観光スポットがあります。浅草や渋谷、新宿が特に人気です。', translation: '东京有很多观光景点。浅草、涩谷和新宿尤其受欢迎。' },
      { text: '日本に行ったら、ぜひお好み焼きを食べてみてください。とても美味しいですよ。', translation: '如果去日本的话，请一定尝尝大阪烧，非常好吃哦。' },
    ],
    listening: [
      { transcript: '日本語の漢字には音読みと訓読みがあります。音読みは中国からの発音、訓読みは日本語本来の読み方です。', translation: '日语的汉字有音读和训读。音读源自中文发音，训读是日语原本的读法。', questions: [
        { question: '漢字の読み方には何種類ありますか？', options: ['1種類', '2種類', '3種類', '4種類'], correctIndex: 1 },
        { question: '訓読みは何ですか？', options: ['英語の読み方', '中国からの発音', '日本語本来の読み方', '新しい読み方'], correctIndex: 2 },
      ]},
    ],
  },

  // ========== 韩语：入门发音 ==========
  'kor-beginner-1': {
    courseId: 'kor-beginner-1',
    vocabulary: [
      { id: 'kor-b1-v1', word: '안녕하세요', translation: '你好', pronunciation: 'an-nyeong-ha-se-yo', exampleSentence: '안녕하세요, 만나서 반갑습니다.', exampleTranslation: '你好，很高兴认识你。', partOfSpeech: 'phr.', difficulty: 1, masteryLevel: 5, reviewCount: 18, nextReviewDate: '2025-06-01' },
      { id: 'kor-b1-v2', word: '감사합니다', translation: '谢谢', pronunciation: 'gam-sa-ham-ni-da', exampleSentence: '도와주셔서 감사합니다.', exampleTranslation: '感谢您的帮助。', partOfSpeech: 'phr.', difficulty: 1, masteryLevel: 5, reviewCount: 16, nextReviewDate: '2025-06-01' },
      { id: 'kor-b1-v3', word: '죄송합니다', translation: '对不起', pronunciation: 'joe-song-ham-ni-da', exampleSentence: '죄송합니다, 늦었습니다.', exampleTranslation: '对不起，我迟到了。', partOfSpeech: 'phr.', difficulty: 1, masteryLevel: 4, reviewCount: 10, nextReviewDate: '2025-05-30' },
      { id: 'kor-b1-v4', word: '네', translation: '是的', pronunciation: 'ne', exampleSentence: '네, 맞습니다.', exampleTranslation: '是的，没错。', partOfSpeech: 'int.', difficulty: 1, masteryLevel: 5, reviewCount: 20, nextReviewDate: '2025-06-03' },
      { id: 'kor-b1-v5', word: '아니요', translation: '不是', pronunciation: 'a-ni-yo', exampleSentence: '아니요, 괜찮습니다.', exampleTranslation: '不，没关系。', partOfSpeech: 'int.', difficulty: 1, masteryLevel: 4, reviewCount: 8, nextReviewDate: '2025-06-01' },
      { id: 'kor-b1-v6', word: '사랑해요', translation: '我爱你', pronunciation: 'sa-rang-hae-yo', exampleSentence: '사랑해요, 언니!', exampleTranslation: '姐姐/哥哥我爱你！', partOfSpeech: 'phr.', difficulty: 1, masteryLevel: 5, reviewCount: 22, nextReviewDate: '2025-06-05' },
      { id: 'kor-b1-v7', word: '물', translation: '水', pronunciation: 'mul', exampleSentence: '물 한 잔 주세요.', exampleTranslation: '请给我一杯水。', partOfSpeech: 'n.', difficulty: 1, masteryLevel: 4, reviewCount: 9, nextReviewDate: '2025-05-29' },
    ],
    grammar: [
      {
        rule: '韩语字母 (한글) 基础',
        explanation: '韩语字母由元音和辅音组成。基本元音：ㅏ(a), ㅑ(ya), ㅓ(eo), ㅕ(yeo), ㅗ(o), ㅛ(yo), ㅜ(u), ㅠ(yu), ㅡ(eu), ㅣ(i)。基本辅音：ㄱ(g), ㄴ(n), ㄷ(d), ㅁ(m), ㅂ(b), ㅅ(s), ㅇ(ng), ㅈ(j), ㅊ(ch), ㅋ(k), ㅌ(t), ㅍ(p), ㅎ(h)。',
        example: '가 = ㄱ + ㅏ ／ 나 = ㄴ + ㅏ ／ 다 = ㄷ + ㅏ',
        questions: [
          { question: '한글의 기본 자음(辅音)은 몇 개인가요?', options: ['10개', '14개', '19개', '24개'], correctIndex: 1 },
          { question: '"사랑"의 첫 글자 "사"는 어떤 자음+모음으로 이루어져 있나요?', options: ['ㅅ+ㅏ', 'ㄱ+ㅏ', 'ㄷ+ㅏ', 'ㅂ+ㅏ'], correctIndex: 0 },
        ],
      },
      {
        rule: '입니다/입니까 (陈述/疑问句)',
        explanation: '입니다 是"是..."的敬体陈述形式。입니까 是疑问形式，相当于"是...吗？"。',
        example: '학생입니다.（是学生。）/ 학생입니까?（是学生吗？）',
        questions: [
          { question: '저는 한국 사람___。', options: ['입니다', '입니까', '이에요', '이야'], correctIndex: 0 },
          { question: '이것은 책___？', options: ['입니다', '입니까', '입니다?', '이에요?'], correctIndex: 1 },
          { question: '그분은 선생님___。', options: ['입니다', '입니까', '이에요', '이다'], correctIndex: 0 },
          { question: '여기가 학교___？', options: ['입니다', '입니까', '이에요?', '입니까?'], correctIndex: 1 },
        ],
      },
    ],
    speaking: [
      { text: '안녕하세요! 저는 중국에서 왔습니다. 한국어를 공부하고 있습니다.', translation: '你好！我来自中国。正在学习韩语。' },
      { text: '이 음식 정말 맛있어요! 이름이 뭐예요?', translation: '这个食物真的很好吃！叫什么名字？' },
      { text: '한국 드라마를 좋아해서 한국어를 배우기 시작했습니다.', translation: '因为喜欢韩剧，所以开始学韩语了。' },
    ],
    listening: [
      { transcript: '안녕하세요, 여러분! 오늘부터 한국어 수업을 시작하겠습니다. 열심히 공부합시다!', translation: '大家好！从今天开始上韩语课。让我们一起努力学习吧！', questions: [
        { question: 'これは何の場面ですか？', options: ['한국어 수업', '영어 수업', '회의', '파티'], correctIndex: 0 },
        { question: '先生は何と言いましたか？', options: ['공부하지 마세요', '열심히 공부합시다', '숙제가 없어요', '시험입니다'], correctIndex: 1 },
      ]},
      { transcript: '오늘 날씨가 정말 좋네요. 밖에 나가서 산책하는 게 어때요?', translation: '今天天气真好啊。出去散步怎么样？', questions: [
        { question: '오늘 날씨가 어때요?', options: ['나쁘다', '좋다', '춥다', '덥다'], correctIndex: 1 },
        { question: '何を提案していますか？', options: ['영화 보기', '산책하기', '공부하기', '요리하기'], correctIndex: 1 },
      ]},
    ],
  },

  // ========== 韩语：日常口语 ==========
  'kor-elem-1': {
    courseId: 'kor-elem-1',
    vocabulary: [
      { id: 'kor-e1-v1', word: '맛있다', translation: '好吃', pronunciation: 'ma-sit-da', exampleSentence: '이 김치찌개 진짜 맛있어요!', exampleTranslation: '这个泡菜汤真的好好吃！', partOfSpeech: 'adj.', difficulty: 1, masteryLevel: 5, reviewCount: 14, nextReviewDate: '2025-06-02' },
      { id: 'kor-e1-v2', word: '예쁘다', translation: '漂亮', pronunciation: 'ye-ppeu-da', exampleSentence: '한복이 정말 예뻐요.', exampleTranslation: '韩服真的好漂亮。', partOfSpeech: 'adj.', difficulty: 1, masteryLevel: 4, reviewCount: 10, nextReviewDate: '2025-05-30' },
      { id: 'kor-e1-v3', word: '재미있다', translation: '有趣', pronunciation: 'jae-mi-it-da', exampleSentence: '이 드라마 정말 재미있어요!', exampleTranslation: '这部电视剧真的很有趣！', partOfSpeech: 'adj.', difficulty: 1, masteryLevel: 4, reviewCount: 11, nextReviewDate: '2025-05-31' },
      { id: 'kor-e1-v4', word: '어렵다', translation: '难', pronunciation: 'eo-ryeop-da', exampleSentence: '한국어 문법이 어렵지만 재미있어요.', exampleTranslation: '韩语语法虽然难但很有趣。', partOfSpeech: 'adj.', difficulty: 2, masteryLevel: 2, reviewCount: 5, nextReviewDate: '2025-05-25' },
      { id: 'kor-e1-v5', word: '얼마예요', translation: '多少钱', pronunciation: 'eol-ma-ye-yo', exampleSentence: '이거 얼마예요?', exampleTranslation: '这个多少钱？', partOfSpeech: 'phr.', difficulty: 1, masteryLevel: 4, reviewCount: 12, nextReviewDate: '2025-06-01' },
      { id: 'kor-e1-v6', word: '어디', translation: '哪里', pronunciation: 'eo-di', exampleSentence: '화장실이 어디에 있어요?', exampleTranslation: '洗手间在哪里？', partOfSpeech: 'adv.', difficulty: 1, masteryLevel: 4, reviewCount: 9, nextReviewDate: '2025-05-29' },
      { id: 'kor-e1-v7', word: '주세요', translation: '请给我', pronunciation: 'ju-se-yo', exampleSentence: '김밥 두 줄 주세요.', exampleTranslation: '请给我两卷紫菜包饭。', partOfSpeech: 'phr.', difficulty: 1, masteryLevel: 5, reviewCount: 16, nextReviewDate: '2025-06-03' },
    ],
    grammar: [
      {
        rule: '-아요/-어요 (敬体终结词尾)',
        explanation: '韩语动词和形容词在句子末尾加 -아요/-어요 变成敬体。元音 ㅏ/ㅗ 后用 -아요，其他元音后用 -어요。하다 动词变为 해요。',
        example: '가다 → 가요（去）／ 먹다 → 먹어요（吃）／ 하다 → 해요（做）',
        questions: [
          { question: '먹다 + 어요 = ___', options: ['먹어요', '먹아요', '먹요', '먹어'], correctIndex: 0 },
          { question: '가다 + 아요 = ___', options: ['가어요', '가요', '가아요', '가'], correctIndex: 1 },
          { question: '공부하다 + 여요 = ___', options: ['공부하요', '공부해요', '공부하다요', '공부했어요'], correctIndex: 1 },
          { question: '예쁘다 → 예뻐요，이것은 어떤 규칙인가요?', options: ['ㅡ 탈락', 'ㄹ 탈락', 'ㅂ 특수', '르 특수'], correctIndex: 0 },
        ],
      },
      {
        rule: '이/가 (主格助词)',
        explanation: '이/가 是主格助词，表示主语。名词以辅音结尾用 이，以元音结尾用 가。',
        example: '책이 있습니다.（有书。）／ 친구가 왔어요.（朋友来了。）',
        questions: [
          { question: '물___ 있습니다. (水)', options: ['이', '가', '을', '는'], correctIndex: 0 },
          { question: '학교___ 멀어요. (学校)', options: ['이', '가', '을', '는'], correctIndex: 1 },
          { question: '한국어___ 재미있어요. (韩语)', options: ['이', '가', '을', '는'], correctIndex: 1 },
          { question: '어디___ 아파요? (哪里)', options: ['이', '가', '을', '는'], correctIndex: 1 },
        ],
      },
    ],
    speaking: [
      { text: '이거 얼마예요? 너무 비싸요. 좀 깎아 주세요.', translation: '这个多少钱？太贵了。能便宜点吗？' },
      { text: '저는 K-pop을 좋아해요. 특히 BTS의 노래를 자주 들어요.', translation: '我喜欢K-pop。特别是经常听BTS的歌。' },
      { text: '한국에 가 본 적이 있어요? 저는 아직 없지만 꼭 가 보고 싶어요.', translation: '你去过韩国吗？我还没去过，但一定要去看看。' },
    ],
    listening: [
      { transcript: '여기는 명동입니다. 쇼핑하기 좋은 곳이에요. 화장품 가게와 옷 가게가 많아요.', translation: '这里是明洞。是购物好去处。有很多化妆品店和服装店。', questions: [
        { question: '여기는 어디인가요?', options: ['강남', '명동', '홍대', '인사동'], correctIndex: 1 },
        { question: '이 곳에는 무엇이 많나요?', options: ['식당', '화장품 가게와 옷 가게', '도서관', '영화관'], correctIndex: 1 },
      ]},
      { transcript: '오늘 저녁에 같이 한식 먹을래요? 제가 아는 맛있는 집이 있어요. 김치찌개가 정말 일품이에요.', translation: '今天晚上一起吃韩餐怎么样？我知道一家很好吃的店。泡菜汤真的是一绝。', questions: [
        { question: '何を誘っていますか？', options: ['저녁 식사', '점심 식사', '영화', '산책'], correctIndex: 0 },
        { question: '何が美味しいと言っていますか？', options: ['비빔밥', '김치찌개', '불고기', '떡볶이'], correctIndex: 1 },
      ]},
    ],
  },
};
