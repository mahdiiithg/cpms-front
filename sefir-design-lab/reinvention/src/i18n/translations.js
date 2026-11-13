export const locales = {
  en: { dir: 'ltr', label: 'EN', name: 'English', font: 'latin' },
  fa: { dir: 'rtl', label: 'فا', name: 'فارسی', font: 'vazir' },
  ar: { dir: 'rtl', label: 'ع', name: 'العربية', font: 'vazir' },
}

export const copy = {
  en: {
    nav: {
      product: 'Product',
      demo: 'Live demo',
      channels: 'Channels',
      contact: 'Contact',
      cta: 'Request access',
    },
    hero: {
      brand: 'Sefir',
      headline: 'Customer conversations, routed with intention.',
      support:
        'An AI communication layer for WhatsApp, Instagram, and Email — answering from approved knowledge, handing off to people, and respecting opt-outs.',
      primary: 'Explore the desk',
      secondary: 'Watch a simulation',
      simNote: 'All demos are labeled simulations. Nothing is sent to real accounts.',
    },
    channels: {
      eyebrow: 'Connected channels',
      title: 'One desk for the channels your customers already use.',
      items: [
        { id: 'whatsapp', name: 'WhatsApp', blurb: 'Inbound questions and follow-ups in the thread customers open first.' },
        { id: 'instagram', name: 'Instagram', blurb: 'DMs handled with the same knowledge and routing rules.' },
        { id: 'email', name: 'Email', blurb: 'Longer threads kept on the same decision path as chat.' },
      ],
    },
    desk: {
      eyebrow: 'How Sefir decides',
      title: 'Every message meets a clear outcome.',
      lead:
        'Depending on the scenario, Sefir answers from company-approved knowledge, hands the conversation to a human, or stops when a customer opts out.',
      lanes: [
        {
          id: 'answer',
          title: 'Answer',
          body: 'Respond using approved knowledge and rules your team defines.',
        },
        {
          id: 'handoff',
          title: 'Hand over',
          body: 'Pass the thread to a person when judgment or escalation is needed.',
        },
        {
          id: 'stop',
          title: 'Stop',
          body: 'Respect opt-out requests and halt outreach for that customer.',
        },
      ],
    },
    demo: {
      eyebrow: 'Interactive simulation',
      title: 'Route a message yourself.',
      lead:
        'Pick a sample customer message. Sefir classifies it and shows the path it would take. This is a simulation — nothing is delivered.',
      badge: 'SIMULATION',
      pick: 'Choose a message',
      run: 'Run routing',
      reset: 'Reset desk',
      running: 'Routing…',
      result: 'Decision',
      knowledge: 'Knowledge used',
      scenarios: [
        {
          id: 'hours',
          channel: 'WhatsApp',
          customer: 'Are you open on Friday?',
          decision: 'answer',
          decisionLabel: 'Answer',
          reply:
            'Yes — we are open Friday 9:00–18:00. Walk-ins welcome until 17:30.',
          knowledge: 'Store hours · Public FAQ',
        },
        {
          id: 'refund',
          channel: 'Email',
          customer: 'I need a refund for order #4821 — the item arrived damaged.',
          decision: 'handoff',
          decisionLabel: 'Hand over',
          reply:
            'This needs a specialist. Routing to a human agent with order context attached.',
          knowledge: 'Refund policy · Escalation rule',
        },
        {
          id: 'optout',
          channel: 'Instagram',
          customer: 'Please stop messaging me.',
          decision: 'stop',
          decisionLabel: 'Stop',
          reply: 'Opt-out recorded. Outreach paused for this customer.',
          knowledge: 'Consent · Opt-out rule',
        },
        {
          id: 'followup',
          channel: 'WhatsApp',
          customer: 'Did my appointment get confirmed?',
          decision: 'answer',
          decisionLabel: 'Answer',
          reply:
            'Confirmed for Tuesday at 14:00. Reply RESCHEDULE if you need another slot.',
          knowledge: 'Appointments · Follow-up workflow',
        },
      ],
      laneLabels: { answer: 'Answer', handoff: 'Hand over', stop: 'Stop' },
      footer: 'Simulation only · Never sent to real customer accounts',
    },
    outreach: {
      eyebrow: 'Outreach & follow-up',
      title: 'Follow-ups that stay inside your rules.',
      body:
        'Sefir supports outreach and follow-up workflows subject to product capabilities and channel restrictions — always with the same answer, handoff, and stop paths.',
    },
    languages: {
      eyebrow: 'Languages',
      title: 'English, Persian, and Arabic — with direction that feels native.',
      body: 'Switch the interface language anytime. Layout mirrors for RTL without losing the lattice structure.',
    },
    cta: {
      title: 'Bring your channels to one intentional desk.',
      body: 'Request access to see Sefir against your knowledge base and routing rules.',
      button: 'Request access',
    },
    footer: {
      mark: 'Sefir',
      tag: 'AI-powered customer communication',
      note: 'Concept B · Complete reinvention · Design lab preview',
      rights: '© Sefir design lab',
    },
  },
  fa: {
    nav: {
      product: 'محصول',
      demo: 'نمایش زنده',
      channels: 'کانال‌ها',
      contact: 'تماس',
      cta: 'درخواست دسترسی',
    },
    hero: {
      brand: 'سفیر',
      headline: 'گفت‌وگوی مشتریان، با مسیریابی آگاهانه.',
      support:
        'لایهٔ ارتباطی هوش مصنوعی برای واتساپ، اینستاگرام و ایمیل — پاسخ از دانش تأییدشده، تحویل به انسان، و احترام به انصراف.',
      primary: 'میز کار را ببینید',
      secondary: 'تماشای شبیه‌سازی',
      simNote: 'همهٔ نمایش‌ها شبیه‌سازی برچسب‌خورده‌اند. چیزی به حساب واقعی ارسال نمی‌شود.',
    },
    channels: {
      eyebrow: 'کانال‌های متصل',
      title: 'یک میز برای کانال‌هایی که مشتریانتان همین حالا استفاده می‌کنند.',
      items: [
        { id: 'whatsapp', name: 'واتساپ', blurb: 'پرسش‌ها و پیگیری‌ها در همان رشته‌ای که مشتری اول باز می‌کند.' },
        { id: 'instagram', name: 'اینستاگرام', blurb: 'پیام‌های مستقیم با همان دانش و قواعد مسیریابی.' },
        { id: 'email', name: 'ایمیل', blurb: 'رشته‌های طولانی روی همان مسیر تصمیم گفت‌وگو.' },
      ],
    },
    desk: {
      eyebrow: 'نحوهٔ تصمیم سفیر',
      title: 'هر پیام به یک نتیجهٔ روشن می‌رسد.',
      lead:
        'بسته به موقعیت، سفیر از دانش تأییدشده پاسخ می‌دهد، گفت‌وگو را به انسان می‌سپارد، یا هنگام انصراف متوقف می‌شود.',
      lanes: [
        {
          id: 'answer',
          title: 'پاسخ',
          body: 'با دانش و قواعد تأییدشدهٔ تیم شما پاسخ دهید.',
        },
        {
          id: 'handoff',
          title: 'تحویل',
          body: 'وقتی قضاوت یا ارتقا لازم است، رشته را به فرد بسپارید.',
        },
        {
          id: 'stop',
          title: 'توقف',
          body: 'درخواست انصراف را رعایت کنید و ارتباط را برای آن مشتری متوقف کنید.',
        },
      ],
    },
    demo: {
      eyebrow: 'شبیه‌سازی تعاملی',
      title: 'خودتان یک پیام را مسیریابی کنید.',
      lead:
        'یک پیام نمونه انتخاب کنید. سفیر آن را طبقه‌بندی می‌کند و مسیر را نشان می‌دهد. این شبیه‌سازی است — چیزی ارسال نمی‌شود.',
      badge: 'شبیه‌سازی',
      pick: 'انتخاب پیام',
      run: 'اجرای مسیریابی',
      reset: 'بازنشانی میز',
      running: 'در حال مسیریابی…',
      result: 'تصمیم',
      knowledge: 'دانش استفاده‌شده',
      scenarios: [
        {
          id: 'hours',
          channel: 'واتساپ',
          customer: 'جمعه باز هستید؟',
          decision: 'answer',
          decisionLabel: 'پاسخ',
          reply: 'بله — جمعه ۹:۰۰ تا ۱۸:۰۰ باز هستیم. پذیرش تا ۱۷:۳۰.',
          knowledge: 'ساعات کاری · پرسش‌های عمومی',
        },
        {
          id: 'refund',
          channel: 'ایمیل',
          customer: 'برای سفارش ۴۸۲۱ بازپرداخت می‌خواهم — کالا آسیب دیده رسیده.',
          decision: 'handoff',
          decisionLabel: 'تحویل',
          reply: 'نیاز به متخصص دارد. با زمینهٔ سفارش به کارشناس انسانی منتقل می‌شود.',
          knowledge: 'سیاست بازپرداخت · قاعدهٔ ارتقا',
        },
        {
          id: 'optout',
          channel: 'اینستاگرام',
          customer: 'لطفاً دیگر پیام ندهید.',
          decision: 'stop',
          decisionLabel: 'توقف',
          reply: 'انصراف ثبت شد. ارتباط برای این مشتری متوقف شد.',
          knowledge: 'رضایت · قاعدهٔ انصراف',
        },
        {
          id: 'followup',
          channel: 'واتساپ',
          customer: 'نوبت من تأیید شد؟',
          decision: 'answer',
          decisionLabel: 'پاسخ',
          reply: 'برای سه‌شنبه ساعت ۱۴:۰۰ تأیید شد. برای تغییر، RESCHEDULE بفرستید.',
          knowledge: 'نوبت‌ها · جریان پیگیری',
        },
      ],
      laneLabels: { answer: 'پاسخ', handoff: 'تحویل', stop: 'توقف' },
      footer: 'فقط شبیه‌سازی · هرگز به حساب واقعی مشتری ارسال نمی‌شود',
    },
    outreach: {
      eyebrow: 'ارتباط و پیگیری',
      title: 'پیگیری‌هایی که در چارچوب قواعد شما می‌مانند.',
      body:
        'سفیر از جریان‌های ارتباط و پیگیری پشتیبانی می‌کند، مشروط به قابلیت‌های محصول و محدودیت‌های کانال — همیشه با همان مسیرهای پاسخ، تحویل و توقف.',
    },
    languages: {
      eyebrow: 'زبان‌ها',
      title: 'انگلیسی، فارسی و عربی — با جهتی که بومی به‌نظر می‌رسد.',
      body: 'هر زمان زبان رابط را عوض کنید. چیدمان برای راست‌به‌چپ آینه می‌شود بدون از دست دادن ساختار شبکه.',
    },
    cta: {
      title: 'کانال‌هایتان را به یک میز هدفمند بیاورید.',
      body: 'برای دیدن سفیر روی پایگاه دانش و قواعد مسیریابی‌تان درخواست دسترسی دهید.',
      button: 'درخواست دسترسی',
    },
    footer: {
      mark: 'سفیر',
      tag: 'ارتباط با مشتری مبتنی بر هوش مصنوعی',
      note: 'مفهوم B · بازآفرینی کامل · پیش‌نمایش آزمایشگاه طراحی',
      rights: '© آزمایشگاه طراحی سفیر',
    },
  },
  ar: {
    nav: {
      product: 'المنتج',
      demo: 'عرض حي',
      channels: 'القنوات',
      contact: 'تواصل',
      cta: 'طلب الوصول',
    },
    hero: {
      brand: 'سفير',
      headline: 'محادثات العملاء، بتوجيه مقصود.',
      support:
        'طبقة تواصل بالذكاء الاصطناعي لواتساب وإنستغرام والبريد — تجيب من معرفة معتمدة، وتسلّم للبشر، وتحترم طلبات الإيقاف.',
      primary: 'استكشف المكتب',
      secondary: 'شاهد محاكاة',
      simNote: 'كل العروض محاكيات معلّمة. لا يُرسل شيء إلى حسابات حقيقية.',
    },
    channels: {
      eyebrow: 'القنوات المتصلة',
      title: 'مكتب واحد للقنوات التي يستخدمها عملاؤك بالفعل.',
      items: [
        { id: 'whatsapp', name: 'واتساب', blurb: 'أسئلة ومتابعات في الخيط الذي يفتحه العميل أولاً.' },
        { id: 'instagram', name: 'إنستغرام', blurb: 'الرسائل المباشرة بنفس المعرفة وقواعد التوجيه.' },
        { id: 'email', name: 'البريد', blurb: 'خيوط أطول على نفس مسار القرار كالمحادثة.' },
      ],
    },
    desk: {
      eyebrow: 'كيف يقرر سفير',
      title: 'كل رسالة تصل إلى نتيجة واضحة.',
      lead:
        'حسب السيناريو، يجيب سفير من معرفة معتمدة، أو يسلّم المحادثة لإنسان، أو يتوقف عند طلب الإلغاء.',
      lanes: [
        {
          id: 'answer',
          title: 'إجابة',
          body: 'الرد باستخدام معرفة وقواعد يعتمدها فريقك.',
        },
        {
          id: 'handoff',
          title: 'تسليم',
          body: 'تمرير الخيط إلى شخص عند الحاجة إلى حكم أو تصعيد.',
        },
        {
          id: 'stop',
          title: 'إيقاف',
          body: 'احترام طلبات الإلغاء ووقف التواصل لذلك العميل.',
        },
      ],
    },
    demo: {
      eyebrow: 'محاكاة تفاعلية',
      title: 'وجّه رسالة بنفسك.',
      lead:
        'اختر رسالة عميل نموذجية. يصنّفها سفير ويعرض المسار. هذه محاكاة — لا يُرسل شيء.',
      badge: 'محاكاة',
      pick: 'اختر رسالة',
      run: 'تشغيل التوجيه',
      reset: 'إعادة المكتب',
      running: 'جارٍ التوجيه…',
      result: 'القرار',
      knowledge: 'المعرفة المستخدمة',
      scenarios: [
        {
          id: 'hours',
          channel: 'واتساب',
          customer: 'هل أنتم مفتوحون يوم الجمعة؟',
          decision: 'answer',
          decisionLabel: 'إجابة',
          reply: 'نعم — مفتوحون الجمعة ٩:٠٠–١٨:٠٠. الاستقبال حتى ١٧:٣٠.',
          knowledge: 'ساعات العمل · الأسئلة العامة',
        },
        {
          id: 'refund',
          channel: 'البريد',
          customer: 'أحتاج استردادًا للطلب ٤٨٢١ — وصل التالف.',
          decision: 'handoff',
          decisionLabel: 'تسليم',
          reply: 'يحتاج مختصًا. يُوجَّه إلى وكيل بشري مع سياق الطلب.',
          knowledge: 'سياسة الاسترداد · قاعدة التصعيد',
        },
        {
          id: 'optout',
          channel: 'إنستغرام',
          customer: 'يرجى التوقف عن مراسلتي.',
          decision: 'stop',
          decisionLabel: 'إيقاف',
          reply: 'تم تسجيل الإلغاء. توقف التواصل لهذا العميل.',
          knowledge: 'الموافقة · قاعدة الإلغاء',
        },
        {
          id: 'followup',
          channel: 'واتساب',
          customer: 'هل تأكد موعدي؟',
          decision: 'answer',
          decisionLabel: 'إجابة',
          reply: 'مؤكد للثلاثاء الساعة ١٤:٠٠. أرسل RESCHEDULE لتغيير الموعد.',
          knowledge: 'المواعيد · سير المتابعة',
        },
      ],
      laneLabels: { answer: 'إجابة', handoff: 'تسليم', stop: 'إيقاف' },
      footer: 'محاكاة فقط · لا تُرسل إلى حسابات عملاء حقيقية',
    },
    outreach: {
      eyebrow: 'التواصل والمتابعة',
      title: 'متابعات تبقى داخل قواعدك.',
      body:
        'يدعم سفير سير عمل التواصل والمتابعة وفق قدرات المنتج وقيود القناة — دائمًا بنفس مسارات الإجابة والتسليم والإيقاف.',
    },
    languages: {
      eyebrow: 'اللغات',
      title: 'الإنجليزية والفارسية والعربية — باتجاه يبدو أصليًا.',
      body: 'بدّل لغة الواجهة في أي وقت. ينعكس التخطيط لـ RTL دون فقدان بنية الشبكة.',
    },
    cta: {
      title: 'اجمع قنواتك في مكتب مقصود واحد.',
      body: 'اطلب الوصول لرؤية سفير على قاعدة معرفتك وقواعد التوجيه.',
      button: 'طلب الوصول',
    },
    footer: {
      mark: 'سفير',
      tag: 'تواصل العملاء بالذكاء الاصطناعي',
      note: 'المفهوم B · إعادة ابتكار كاملة · معاينة مختبر التصميم',
      rights: '© مختبر تصميم سفير',
    },
  },
}
