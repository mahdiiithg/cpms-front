export const LOCALES = [
  { code: 'en', label: 'EN', dir: 'ltr', name: 'English' },
  { code: 'fa', label: 'FA', dir: 'rtl', name: 'فارسی' },
  { code: 'ar', label: 'AR', dir: 'rtl', name: 'العربية' },
];

export const copy = {
  en: {
    nav: {
      product: 'Product',
      how: 'How it works',
      channels: 'Channels',
      demo: 'Live demo',
      signIn: 'Sign in',
      cta: 'Request access',
    },
    hero: {
      brand: 'Sefir',
      headline: 'Customer conversations, governed by your knowledge.',
      sub: 'An AI communication layer for WhatsApp, Instagram, and Email — answering from approved knowledge, handing off to people, and respecting opt-outs.',
      primaryCta: 'Explore the message flow',
      secondaryCta: 'See how it works',
      badge: 'AI customer communication',
      graphLabel: 'Message graph',
      graphTitle: 'Live pathway',
      graphOutcomes: 'Answer · Handover · Stop',
      inbound: 'Inbound',
      evaluate: 'Evaluate',
      outcome: 'Outcome',
    },
    flow: {
      eyebrow: 'Interactive demo',
      title: 'Watch how Sefir decides',
      subtitle:
        'Choose a scenario. Messages stay simulated — nothing is sent to real customer accounts.',
      simLabel: 'Simulation',
      channels: {
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
        email: 'Email',
      },
      scenarios: {
        answer: {
          label: 'Answer from knowledge',
          customer: 'What are your business hours this week?',
          thinking: 'Checking approved knowledge & rules…',
          decision: 'Answer',
          reply:
            'We’re open Sun–Thu, 9:00–18:00. Shall I share the holiday schedule too?',
          note: 'Reply grounded in company-approved knowledge.',
        },
        handover: {
          label: 'Hand over to a human',
          customer: 'I need to change an invoice for account #4821.',
          thinking: 'Detecting account-specific request…',
          decision: 'Human handoff',
          reply:
            'Connecting you with a teammate who can update billing details.',
          note: 'Sensitive or account-bound work routes to a person.',
        },
        stop: {
          label: 'Respect opt-out',
          customer: 'Please stop messaging me.',
          thinking: 'Recognizing opt-out intent…',
          decision: 'Stop',
          reply: 'Understood — we won’t send further outreach on this channel.',
          note: 'Opt-out requests are respected immediately.',
        },
      },
      steps: {
        inbound: 'Inbound',
        evaluate: 'Evaluate',
        outcome: 'Outcome',
      },
      play: 'Play scenario',
      replay: 'Replay',
    },
    channels: {
      eyebrow: 'Channels',
      title: 'One layer across the conversations you already run',
      subtitle:
        'Connect WhatsApp, Instagram, and Email so replies stay consistent with your rules.',
      items: [
        {
          key: 'whatsapp',
          title: 'WhatsApp',
          body: 'Handle customer chats with approved answers and clear handoffs.',
        },
        {
          key: 'instagram',
          title: 'Instagram',
          body: 'Keep social inbox replies aligned with the same knowledge base.',
        },
        {
          key: 'email',
          title: 'Email',
          body: 'Bring email threads into the same governed conversation flow.',
        },
      ],
    },
    capabilities: {
      eyebrow: 'Capabilities',
      title: 'Built around trust, not guesswork',
      items: [
        {
          title: 'Approved knowledge',
          body: 'Answers only from the information your business has approved.',
        },
        {
          title: 'Human when needed',
          body: 'Hand conversations to a person when the scenario requires it.',
        },
        {
          title: 'Opt-out respect',
          body: 'Stop or suppress outreach when customers ask not to be contacted.',
        },
        {
          title: 'Outreach workflows',
          body: 'Support follow-ups subject to product capabilities and channel rules.',
        },
      ],
    },
    how: {
      eyebrow: 'How it works',
      title: 'From message to governed action',
      steps: [
        {
          title: 'Message arrives',
          body: 'A customer reaches you on WhatsApp, Instagram, or Email.',
        },
        {
          title: 'Sefir evaluates',
          body: 'The request is checked against company knowledge and rules.',
        },
        {
          title: 'Action follows',
          body: 'Answer, hand over, or stop — with a clear, auditable outcome.',
        },
      ],
    },
    languages: {
      eyebrow: 'Languages',
      title: 'English, Persian, and Arabic',
      body: 'Operate with correct LTR and RTL directionality for the teams and customers you serve.',
    },
    cta: {
      title: 'Bring order to every customer channel',
      body: 'See how Sefir keeps replies consistent, human when needed, and respectful of opt-outs.',
      button: 'Request access',
      note: 'Existing product sign-in remains available for authorized users.',
    },
    footer: {
      product: 'Product',
      legal: 'For authorized teams',
      copy: 'Sefir — AI-powered customer communication.',
    },
  },
  fa: {
    nav: {
      product: 'محصول',
      how: 'نحوه کار',
      channels: 'کانال‌ها',
      demo: 'دموی زنده',
      signIn: 'ورود',
      cta: 'درخواست دسترسی',
    },
    hero: {
      brand: 'سفیر',
      headline: 'گفت‌وگوی مشتریان، بر اساس دانش تأییدشده شما.',
      sub: 'لایه ارتباطی هوش مصنوعی برای واتساپ، اینستاگرام و ایمیل — پاسخ از دانش تأییدشده، واگذاری به انسان، و احترام به انصراف.',
      primaryCta: 'مشاهده جریان پیام',
      secondaryCta: 'نحوه کار',
      badge: 'ارتباط با مشتری با هوش مصنوعی',
      graphLabel: 'گراف پیام',
      graphTitle: 'مسیر زنده',
      graphOutcomes: 'پاسخ · واگذاری · توقف',
      inbound: 'ورودی',
      evaluate: 'ارزیابی',
      outcome: 'نتیجه',
    },
    flow: {
      eyebrow: 'دموی تعاملی',
      title: 'ببینید سفیر چگونه تصمیم می‌گیرد',
      subtitle:
        'یک سناریو را انتخاب کنید. پیام‌ها شبیه‌سازی‌اند — به حساب واقعی مشتری ارسال نمی‌شود.',
      simLabel: 'شبیه‌سازی',
      channels: {
        whatsapp: 'واتساپ',
        instagram: 'اینستاگرام',
        email: 'ایمیل',
      },
      scenarios: {
        answer: {
          label: 'پاسخ از دانش',
          customer: 'ساعات کاری این هفته چیست؟',
          thinking: 'در حال بررسی دانش و قوانین تأییدشده…',
          decision: 'پاسخ',
          reply:
            'شنبه تا چهارشنبه، ۹ تا ۱۸ باز هستیم. برنامه تعطیلات را هم بفرستم؟',
          note: 'پاسخ بر پایه دانش تأییدشده شرکت.',
        },
        handover: {
          label: 'واگذاری به انسان',
          customer: 'می‌خواهم فاکتور حساب ۴۸۲۱ را تغییر دهم.',
          thinking: 'تشخیص درخواست وابسته به حساب…',
          decision: 'واگذاری انسانی',
          reply: 'شما را به همکاری که جزئیات مالی را به‌روز می‌کند وصل می‌کنیم.',
          note: 'کارهای حساس یا وابسته به حساب به فرد واگذار می‌شود.',
        },
        stop: {
          label: 'احترام به انصراف',
          customer: 'لطفاً دیگر پیام نفرستید.',
          thinking: 'تشخیص درخواست انصراف…',
          decision: 'توقف',
          reply: 'متوجه شدیم — در این کانال پیام بیشتری ارسال نمی‌کنیم.',
          note: 'درخواست‌های انصراف فوراً رعایت می‌شود.',
        },
      },
      steps: {
        inbound: 'ورودی',
        evaluate: 'ارزیابی',
        outcome: 'نتیجه',
      },
      play: 'اجرای سناریو',
      replay: 'پخش مجدد',
    },
    channels: {
      eyebrow: 'کانال‌ها',
      title: 'یک لایه روی گفت‌وگوهایی که همین حالا دارید',
      subtitle:
        'واتساپ، اینستاگرام و ایمیل را متصل کنید تا پاسخ‌ها با قوانین شما هم‌راستا بمانند.',
      items: [
        {
          key: 'whatsapp',
          title: 'واتساپ',
          body: 'گفت‌وگوهای مشتری را با پاسخ‌های تأییدشده و واگذاری شفاف مدیریت کنید.',
        },
        {
          key: 'instagram',
          title: 'اینستاگرام',
          body: 'پاسخ‌های اینباکس اجتماعی را با همان پایگاه دانش هم‌تراز نگه دارید.',
        },
        {
          key: 'email',
          title: 'ایمیل',
          body: 'رشته‌های ایمیل را وارد همان جریان گفت‌وگوی قانون‌مند کنید.',
        },
      ],
    },
    capabilities: {
      eyebrow: 'قابلیت‌ها',
      title: 'ساخته‌شده بر اعتماد، نه حدس',
      items: [
        {
          title: 'دانش تأییدشده',
          body: 'پاسخ فقط از اطلاعاتی که کسب‌وکار شما تأیید کرده است.',
        },
        {
          title: 'انسان در صورت نیاز',
          body: 'وقتی سناریو ایجاب کند، گفت‌وگو به فرد واگذار می‌شود.',
        },
        {
          title: 'احترام به انصراف',
          body: 'وقتی مشتری درخواست قطع ارتباط دارد، ارسال متوقف می‌شود.',
        },
        {
          title: 'گردش‌کار پیگیری',
          body: 'پشتیبانی از پیگیری‌ها در چارچوب قابلیت محصول و محدودیت کانال.',
        },
      ],
    },
    how: {
      eyebrow: 'نحوه کار',
      title: 'از پیام تا اقدام قانون‌مند',
      steps: [
        {
          title: 'پیام می‌رسد',
          body: 'مشتری از واتساپ، اینستاگرام یا ایمیل پیام می‌دهد.',
        },
        {
          title: 'سفیر ارزیابی می‌کند',
          body: 'درخواست با دانش و قوانین شرکت تطبیق داده می‌شود.',
        },
        {
          title: 'اقدام انجام می‌شود',
          body: 'پاسخ، واگذاری یا توقف — با نتیجه‌ای شفاف و قابل پیگیری.',
        },
      ],
    },
    languages: {
      eyebrow: 'زبان‌ها',
      title: 'انگلیسی، فارسی و عربی',
      body: 'با جهت‌گیری صحیح چپ‌به‌راست و راست‌به‌چپ برای تیم‌ها و مشتریان شما.',
    },
    cta: {
      title: 'نظم را به همه کانال‌های مشتری بیاورید',
      body: 'ببینید چگونه سفیر پاسخ‌ها را یکدست، در صورت نیاز انسانی، و محترم به انصراف نگه می‌دارد.',
      button: 'درخواست دسترسی',
      note: 'ورود محصول برای کاربران مجاز همچنان در دسترس است.',
    },
    footer: {
      product: 'محصول',
      legal: 'برای تیم‌های مجاز',
      copy: 'سفیر — ارتباط با مشتری مبتنی بر هوش مصنوعی.',
    },
  },
  ar: {
    nav: {
      product: 'المنتج',
      how: 'كيف يعمل',
      channels: 'القنوات',
      demo: 'عرض حي',
      signIn: 'تسجيل الدخول',
      cta: 'طلب الوصول',
    },
    hero: {
      brand: 'سفير',
      headline: 'محادثات العملاء، وفق معرفتك المعتمدة.',
      sub: 'طبقة تواصل بالذكاء الاصطناعي لواتساب وإنستغرام والبريد — تجيب من معرفة معتمدة، وتحيل للبشر، وتحترم طلبات الإيقاف.',
      primaryCta: 'استكشف تدفق الرسائل',
      secondaryCta: 'كيف يعمل',
      badge: 'تواصل عملاء بالذكاء الاصطناعي',
      graphLabel: 'مخطط الرسائل',
      graphTitle: 'مسار مباشر',
      graphOutcomes: 'إجابة · تحويل · إيقاف',
      inbound: 'وارد',
      evaluate: 'تقييم',
      outcome: 'نتيجة',
    },
    flow: {
      eyebrow: 'عرض تفاعلي',
      title: 'شاهد كيف يقرر سفير',
      subtitle:
        'اختر سيناريو. الرسائل محاكاة فقط — لا تُرسل إلى حسابات عملاء حقيقية.',
      simLabel: 'محاكاة',
      channels: {
        whatsapp: 'واتساب',
        instagram: 'إنستغرام',
        email: 'البريد',
      },
      scenarios: {
        answer: {
          label: 'إجابة من المعرفة',
          customer: 'ما ساعات العمل هذا الأسبوع؟',
          thinking: 'جارٍ التحقق من المعرفة والقواعد المعتمدة…',
          decision: 'إجابة',
          reply:
            'نعمل من الأحد إلى الخميس، ٩:٠٠–١٨:٠٠. هل أرسل جدول العطل أيضاً؟',
          note: 'رد مستند إلى معرفة الشركة المعتمدة.',
        },
        handover: {
          label: 'تحويل إلى بشر',
          customer: 'أحتاج تعديل فاتورة للحساب رقم ٤٨٢١.',
          thinking: 'اكتشاف طلب مرتبط بالحساب…',
          decision: 'تحويل بشري',
          reply: 'نصلك بزميل يمكنه تحديث تفاصيل الفوترة.',
          note: 'المهام الحساسة أو المرتبطة بالحساب تُحوَّل إلى شخص.',
        },
        stop: {
          label: 'احترام الإيقاف',
          customer: 'يرجى التوقف عن مراسلتي.',
          thinking: 'التعرف على نية الإيقاف…',
          decision: 'إيقاف',
          reply: 'حسناً — لن نرسل المزيد عبر هذه القناة.',
          note: 'تُحترم طلبات الإيقاف فوراً.',
        },
      },
      steps: {
        inbound: 'وارد',
        evaluate: 'تقييم',
        outcome: 'نتيجة',
      },
      play: 'تشغيل السيناريو',
      replay: 'إعادة',
    },
    channels: {
      eyebrow: 'القنوات',
      title: 'طبقة واحدة عبر المحادثات التي تديرها اليوم',
      subtitle:
        'اربط واتساب وإنستغرام والبريد لتبقى الردود متسقة مع قواعدك.',
      items: [
        {
          key: 'whatsapp',
          title: 'واتساب',
          body: 'أدِر محادثات العملاء بإجابات معتمدة وتحويلات واضحة.',
        },
        {
          key: 'instagram',
          title: 'إنستغرام',
          body: 'أبقِ ردود صندوق الوارد الاجتماعي متوافقة مع قاعدة المعرفة نفسها.',
        },
        {
          key: 'email',
          title: 'البريد',
          body: 'أدخل خيوط البريد في نفس تدفق المحادثة المنضبط.',
        },
      ],
    },
    capabilities: {
      eyebrow: 'القدرات',
      title: 'مبني على الثقة لا التخمين',
      items: [
        {
          title: 'معرفة معتمدة',
          body: 'إجابات فقط من المعلومات التي اعتمدها عملك.',
        },
        {
          title: 'بشر عند الحاجة',
          body: 'حوِّل المحادثة إلى شخص عندما يتطلب السيناريو ذلك.',
        },
        {
          title: 'احترام الإيقاف',
          body: 'أوقف المراسلة عندما يطلب العميل عدم التواصل.',
        },
        {
          title: 'سير عمل المتابعة',
          body: 'دعم المتابعات وفق قدرات المنتج وقيود القناة.',
        },
      ],
    },
    how: {
      eyebrow: 'كيف يعمل',
      title: 'من الرسالة إلى إجراء منضبط',
      steps: [
        {
          title: 'تصل الرسالة',
          body: 'يتواصل العميل عبر واتساب أو إنستغرام أو البريد.',
        },
        {
          title: 'يقيّم سفير',
          body: 'يُراجع الطلب وفق معرفة الشركة وقواعدها.',
        },
        {
          title: 'يتبع الإجراء',
          body: 'إجابة أو تحويل أو إيقاف — بنتيجة واضحة وقابلة للتتبع.',
        },
      ],
    },
    languages: {
      eyebrow: 'اللغات',
      title: 'الإنجليزية والفارسية والعربية',
      body: 'اعمل باتجاه صحيح من اليسار لليمين ومن اليمين لليسار لفرقك وعملائك.',
    },
    cta: {
      title: 'أدخل النظام إلى كل قناة عملاء',
      body: 'شاهد كيف يحافظ سفير على اتساق الردود، والتحويل البشري عند الحاجة، واحترام الإيقاف.',
      button: 'طلب الوصول',
      note: 'تسجيل دخول المنتج يبقى متاحاً للمستخدمين المصرح لهم.',
    },
    footer: {
      product: 'المنتج',
      legal: 'للفرق المصرح لها',
      copy: 'سفير — تواصل عملاء مدعوم بالذكاء الاصطناعي.',
    },
  },
};
