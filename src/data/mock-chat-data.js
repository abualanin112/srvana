export const MOCK_CHAT_DB = {
  // Chat ID 1: Ahmed Mohamed (Updated Offer)
  1: {
    id: 1,
    messages: [
      {
        id: 1,
        sender: "other",
        type: "text",
        content: "مرحباً، هل يمكننا مناقشة تفاصيل المشروع؟",
        time: "09:30 ص",
      },
      {
        id: 2,
        sender: "user",
        type: "text",
        content: "أهلاً بك، بالتأكيد. تفضل بطرح استفساراتك.",
        time: "09:32 ص",
      },
      {
        id: 3,
        sender: "other",
        type: "text",
        content: "تمام، سأكون عندك غداً الساعة 10 صباحاً.",
        time: "09:34 ص",
      },
    ],
    project: {
      title: "تشطيب شقة سكنية 150 متر",
      status: "open",
      budget: "50000",
      duration: "7",
      durationUnit: "days",
      location: { address: "الرياض، حي العليا" },
      questions: [
        "هل لديك خبرة سابقة في مشاريع مماثلة؟",
        "هل يمكنك توفير المواد الخام؟",
      ],
    },
    offer: {
      id: 501,
      status: "updated",
      price: "4500",
      originalPrice: "5000",
      duration: "5",
      originalDuration: "7",
      description: "سأقوم بتنفيذ العمل بجودة عالية وفي الوقت المحدد.",
      answers: [
        {
          question: "هل لديك خبرة سابقة في مشاريع مماثلة؟",
          answer: "نعم، قمت بتنفيذ 5 مشاريع مشابهة في نفس الحي.",
        },
        {
          question: "هل يمكنك توفير المواد الخام؟",
          answer: "نعم، يمكنني توفيرها مع الفواتير الأصلية.",
        },
      ],
    },
  },
  // Chat ID 2: Modern Construction Co. (Initial Offer)
  2: {
    id: 2,
    messages: [
      {
        id: 1,
        sender: "user",
        type: "text",
        content: "السلام عليكم، هل تم الانتهاء من إعداد عرض السعر؟",
        time: "أمس",
      },
      {
        id: 2,
        sender: "other",
        type: "text",
        content: "وعليكم السلام، نعم.",
        time: "أمس",
      },
      {
        id: 3,
        sender: "other",
        type: "text",
        content: "تم إرسال عرض السعر الجديد، يرجى المراجعة.",
        time: "أمس",
      },
    ],
    project: {
      title: "تشطيب شقة سكنية 150 متر",
      status: "open",
      budget: "50000",
      duration: "7",
      durationUnit: "days",
      location: { address: "الرياض، حي العليا" },
    },
    offer: {
      id: 502,
      status: "initial",
      price: "4800",
      duration: "6",
      description: "عرض مبدئي يشمل جميع الأعمال المطلوبة.",
    },
  },
  // Chat ID 3: Mahmoud Ali (Initial Offer - Different Project)
  3: {
    id: 3,
    messages: [
      {
        id: 1,
        sender: "other",
        type: "text",
        content: "هل يمكن توفير المواد الخام من طرفكم؟",
        time: "منذ يومين",
      },
    ],
    project: {
      title: "صيانة كهرباء فيلا",
      status: "open",
      budget: "2000",
      duration: "2",
      durationUnit: "days",
      location: { address: "جدة، حي الروضة" },
    },
    offer: {
      id: 503,
      status: "initial",
      price: "1500",
      duration: "2",
      description: "صيانة شاملة للوحة الكهرباء الرئيسية.",
    },
  },
  // Default empty state for other IDs
  default: {
    messages: [],
    project: {
      title: "مشروع جديد",
      status: "open",
      budget: "0",
      duration: "0",
      durationUnit: "days",
      location: { address: "غير محدد" },
    },
    offer: {
      status: "initial",
      price: "0",
      duration: "0",
      description: "لا يوجد عرض حالياً.",
    },
  },
};

// Helper to get full chat details (messages + project + offer)
export const getChatDetails = (chatId) => {
  return MOCK_CHAT_DB[chatId] || MOCK_CHAT_DB["default"];
};

// Helper to get messages for a chat ID (kept for backward compatibility if needed)
export const getMessagesForChat = (chatId) => {
  return MOCK_CHAT_DB[chatId]?.messages || [];
};

// Helper to add a message
export const addMessageToChat = (chatId, message) => {
  if (!MOCK_CHAT_DB[chatId]) {
    MOCK_CHAT_DB[chatId] = {
      ...MOCK_CHAT_DB["default"],
      id: chatId,
      messages: [],
    };
  }
  MOCK_CHAT_DB[chatId].messages.push(message);
  return MOCK_CHAT_DB[chatId].messages;
};
