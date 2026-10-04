export type Locale = "fa" | "en";
export const isLocale = (value: string): value is Locale =>
  value === "fa" || value === "en";
type Localized = Record<Locale, string>;

export type Project = {
  slug: string;
  name: string;
  url: string;
  image: string;
  theme: string;
  category: "product" | "website";
  categoryLabel: Localized;
  title: Localized;
  description: Localized;
  details: Localized;
  features: Record<Locale, string[]>;
};

// Add a project here to include it in the grid, filters, and project detail pages.
// Descriptions reflect public site features, not unverified business results.
export const projects: Project[] = [
  {
    slug: "gym4me",
    name: "Gym4me",
    url: "https://gym4me.ir/",
    image: "/projects/gym4me.png",
    theme: "mint",
    category: "product",
    categoryLabel: { fa: "پلتفرم ورزشی", en: "Fitness platform" },
    title: {
      fa: "از پیدا کردن باشگاه، تا پیگیری تمرین.",
      en: "From finding a gym to tracking every session.",
    },
    description: {
      fa: "کشف باشگاه و مربی، رزرو جلسه و همراه داشتن برنامهٔ تمرین، در یک تجربهٔ یکپارچه.",
      en: "Gym and coach discovery, session booking, and workout plans in one connected experience.",
    },
    details: {
      fa: "Gym4me مسیر انتخاب باشگاه و مربی را به رزرو و ثبت تمرین وصل می‌کند. کاربران می‌توانند اطلاعات باشگاه‌ها را بررسی کنند و برای مدیریت رزروها، برنامهٔ تمرین و روند پیشرفت، وارد نسخهٔ وب اپ شوند.",
      en: "Gym4me connects gym and coach discovery with booking and workout tracking. Visitors can explore clubs and use the web app to manage bookings, follow workout plans, and review their progress.",
    },
    features: {
      fa: ["کشف باشگاه و مربی", "رزرو و مدیریت عضویت", "برنامه و سابقهٔ تمرین"],
      en: [
        "Gym & coach discovery",
        "Bookings & memberships",
        "Workout plans & history",
      ],
    },
  },
  {
    slug: "tmti",
    name: "Take Me to Iran",
    url: "https://takemetoiran.shop/",
    image: "/projects/tmti.png",
    theme: "lilac",
    category: "website",
    categoryLabel: { fa: "تجارت الکترونیک", en: "E-commerce" },
    title: {
      fa: "شروع یک تجربهٔ خرید شخصی‌تر.",
      en: "A more personal way to shop.",
    },
    description: {
      fa: "معرفی TMTI و سفارش اختصاصی کالا؛ از ارسال لینک یا تصویر محصول تا دریافت پیشنهاد قیمت.",
      en: "Introducing TMTI and personal product sourcing, from sharing a product link or image to receiving a quote.",
    },
    details: {
      fa: "TMTI بستری برای انتخاب کالا و درخواست تأمین محصول است. بازدیدکننده با مسیر سفارش اختصاصی آشنا می‌شود و می‌تواند در فهرست انتظار ثبت‌نام کند. سایت در زمان تهیهٔ این معرفی، در مرحلهٔ پیش‌ثبت‌نام قرار دارد.",
      en: "TMTI is a platform for discovering products and requesting personal sourcing. The website introduces the ordering process and lets visitors join the waitlist. At the time of this overview, the service is in its pre-launch registration stage.",
    },
    features: {
      fa: [
        "معرفی سفارش اختصاصی",
        "تجربهٔ فارسی و انگلیسی",
        "پیش‌ثبت‌نام و فهرست انتظار",
      ],
      en: [
        "Personal sourcing introduction",
        "Persian & English experience",
        "Pre-launch registration & waitlist",
      ],
    },
  },
];

export type TeamMember = {
  name: Localized;
  role: Localized;
  bio: Localized;
  image?: string;
  url?: string;
};
// Populate with approved names, roles, and local portraits. No fictional team members.
export const team: TeamMember[] = [];

export const copy = {
  en: {
    nav: ["Work", "Services", "Our approach", "Team"],
    start: "Let’s talk",
    menu: "Menu",
    close: "Close menu",
    skip: "Skip to content",
    eyebrow: "INDEPENDENT DESIGN & DEVELOPMENT STUDIO",
    hero: ["Good ideas deserve", "a great start."],
    intro:
      "We’re Startease. We design and build SaaS products and websites, working with you from the first sketch to launch.",
    cta: "Tell us about your project",
    viewWork: "Explore our work",
    heroNote: "Thoughtfully designed. Carefully built.",
    orbitNote: "Your idea. Our next project.",
    scroll: "A little scroll. A closer look.",
    strip: [
      "Product thinking",
      "Purposeful design",
      "Thoughtful engineering",
      "One connected team",
    ],
    workLabel: "01 / SELECTED WORK",
    workTitle: "Less explaining.\nMore showing.",
    workIntro: "A look at the products and experiences we’re building.",
    filters: ["All work", "Products", "Websites"],
    projectLink: "Explore project",
    live: "Visit website",
    newTab: "opens in a new tab",
    nextTitle: "Your project could be next.",
    nextText:
      "An idea on a napkin or a product ready for its next chapter. Let’s find the right starting point.",
    nextCta: "Make a start",
    servicesLabel: "02 / WHAT WE DO",
    servicesTitle: "From “what if”\nto out in the world.",
    servicesIntro:
      "Bring us in for the whole journey, or the part where you need a hand.",
    services: [
      {
        title: "Product design",
        text: "Turn an idea into a clear, usable product. We map the experience, explore the interface, and make the details work together.",
        tags: ["UX & UI", "Prototyping", "Design systems"],
      },
      {
        title: "SaaS & development",
        text: "Build the first useful version, then give it room to grow. From dashboards and workflows to the systems behind them.",
        tags: ["MVPs", "Web applications", "Integrations"],
      },
      {
        title: "Websites that connect",
        text: "Give your business a home that feels like you. Clear stories, considered interactions, and an experience that works on every screen.",
        tags: ["Websites", "Landing pages", "Bilingual experiences"],
      },
    ],
    processLabel: "03 / HOW WE WORK",
    processTitle: "Good work starts\nwith a conversation.",
    processIntro:
      "You’ll know what we’re working on, why it matters, and what comes next.",
    steps: [
      {
        title: "Find the right starting point",
        text: "We talk through your idea, your users, and what a useful first outcome looks like.",
      },
      {
        title: "Make it tangible",
        text: "A clear scope and a working prototype give us something concrete to discuss and refine.",
      },
      {
        title: "Build it together",
        text: "We develop in stages, share progress, and keep your feedback close to the work.",
      },
      {
        title: "Launch, then keep learning",
        text: "We test the details, hand over the product, and agree on the support you need next.",
      },
    ],
    teamLabel: "04 / THE PEOPLE BEHIND THE PIXELS",
    teamTitle: "A small team.\nA shared sense of craft.",
    teamIntro:
      "Startease brings design and development into the same conversation. We keep the people making your product close to you and close to the work.",
    disciplines: [
      {
        title: "Design with purpose",
        text: "Every screen starts with the person using it.",
      },
      {
        title: "Build with care",
        text: "The details behind the interface matter, too.",
      },
      {
        title: "Work in the open",
        text: "Shared progress, direct feedback, clear next steps.",
      },
    ],
    teamNote:
      "Meet the team working on your project in our first conversation.",
    faqLabel: "A FEW THINGS YOU MIGHT WONDER",
    faqTitle: "Before we say hello.",
    faqs: [
      {
        q: "Can we start with just an idea?",
        a: "Yes. Tell us what you want to make and who it’s for. We can help define the scope and decide what belongs in a useful first version.",
      },
      {
        q: "Can you work on an existing product?",
        a: "Yes. We can look at your current experience and code, then agree on a focused redesign, new feature, or development phase.",
      },
      {
        q: "How do you estimate time and cost?",
        a: "After discussing the scope, we outline deliverables, milestones, and an estimate. The timeline and cost depend on what your project needs.",
      },
      {
        q: "Do you build in Persian and English?",
        a: "Yes. We consider both languages from the start: writing, typography, right-to-left layouts, and the small details that make each version feel natural.",
      },
    ],
    contactLabel: "YOUR NEXT CHAPTER",
    contactTitle: "Let’s make\nsomething matter.",
    contactIntro:
      "Tell us a little about what you have in mind. A rough idea is a perfectly good start.",
    form: {
      name: "Your name",
      namePlaceholder: "What should we call you?",
      email: "Email address",
      emailPlaceholder: "you@company.com",
      service: "What do you need?",
      choices: [
        "Product design",
        "SaaS development",
        "Website",
        "Let’s figure it out",
      ],
      message: "A little about your project",
      messagePlaceholder:
        "What are you building? Who is it for? Anything we should know?",
      budget: "Budget (optional)",
      budgets: ["Let’s discuss", "Under $3,000", "$3,000–$10,000", "$10,000+"],
      submit: "Send project inquiry",
      draft: "Save project brief",
      sending: "Sending…",
      privacy: "We’ll use your details only to discuss your project.",
      fallback:
        "Save a project brief to share with the team. Online inquiries will open soon.",
      success:
        "Your inquiry has been delivered. Thank you for telling us about your project.",
      saved:
        "Your brief is ready to download. It has not been sent to the team.",
      error:
        "We couldn’t send your inquiry. Please try again or save your brief.",
      download: "Download brief",
      mail: "Open in email",
      mailNote:
        "Your email app will open with your brief. Send it there to reach the team.",
      required: "Please check the required fields.",
    },
    footer: "Good things start here.",
    rights: "Startease. Made with intent.",
    top: "Back to top",
    back: "Back to all work",
    overview: "The project",
    highlights: "Inside the experience",
    otherWork: "More to explore",
    projectContact: "Have something similar in mind?",
  },
  fa: {
    nav: ["نمونه‌کارها", "خدمات", "روش همکاری", "تیم ما"],
    start: "شروع گفتگو",
    menu: "منو",
    close: "بستن منو",
    skip: "رفتن به محتوا",
    eyebrow: "استودیوی مستقل طراحی و توسعهٔ محصول",
    hero: ["ایده‌های خوب،", "شروع خوب می‌خواهند."],
    intro:
      "ما استارت‌ایز هستیم. محصول SaaS و وب‌سایت طراحی می‌کنیم و می‌سازیم؛ از اولین طرح تا روزی که به دست کاربر می‌رسد، کنار شما.",
    cta: "دربارهٔ پروژه‌ات بگو",
    viewWork: "دیدن نمونه‌کارها",
    heroNote: "با فکر طراحی می‌کنیم. با دقت می‌سازیم.",
    orbitNote: "ایدهٔ شما؛ پروژهٔ بعدی ما.",
    scroll: "کمی پایین‌تر، بیشتر آشنا می‌شویم.",
    strip: ["نگاه محصولی", "طراحی هدفمند", "توسعهٔ دقیق", "یک تیم همراه"],
    workLabel: "۰۱ / کارهای منتخب",
    workTitle: "به‌جای تعریف،\nکارهایمان را ببینید.",
    workIntro: "نگاهی به محصول‌ها و تجربه‌هایی که می‌سازیم.",
    filters: ["همهٔ کارها", "محصول‌ها", "وب‌سایت‌ها"],
    projectLink: "دربارهٔ پروژه",
    live: "مشاهدهٔ وب‌سایت",
    newTab: "در زبانهٔ جدید باز می‌شود",
    nextTitle: "پروژهٔ بعدی، می‌تواند مال شما باشد.",
    nextText:
      "ایده‌ای روی کاغذ دارید یا محصولی که وقت تغییرش رسیده؟ نقطهٔ شروع را با هم پیدا می‌کنیم.",
    nextCta: "از همین‌جا شروع کنیم",
    servicesLabel: "۰۲ / کاری که انجام می‌دهیم",
    servicesTitle: "از «چه می‌شود اگر…»\nتا یک محصول واقعی.",
    servicesIntro:
      "برای تمام مسیر یا همان بخشی که به کمک نیاز دارید، کنارتان هستیم.",
    services: [
      {
        title: "طراحی محصول",
        text: "ایده را به تجربه‌ای روشن و قابل استفاده تبدیل می‌کنیم؛ از مسیر کاربر و نمونهٔ اولیه تا جزئیاتی که رابط را یکدست می‌کنند.",
        tags: ["تجربه و رابط کاربری", "پروتوتایپ", "دیزاین سیستم"],
      },
      {
        title: "توسعهٔ SaaS و وب‌اپ",
        text: "اولین نسخهٔ کاربردی را می‌سازیم و برای رشدش جا می‌گذاریم؛ از داشبورد و گردش کار تا سیستم‌هایی که پشت آن‌ها هستند.",
        tags: ["نسخهٔ اولیه", "وب‌اپلیکیشن", "یکپارچه‌سازی"],
      },
      {
        title: "وب‌سایت و لندینگ",
        text: "برای کسب‌وکارتان جایی می‌سازیم که شبیه خودتان باشد؛ با محتوای روشن، تعامل‌های حساب‌شده و تجربه‌ای مناسب هر صفحه‌نمایش.",
        tags: ["وب‌سایت", "صفحهٔ فرود", "تجربهٔ دوزبانه"],
      },
    ],
    processLabel: "۰۳ / روش همکاری",
    processTitle: "کار خوب،\nبا یک گفتگو شروع می‌شود.",
    processIntro:
      "در هر مرحله می‌دانید روی چه چیزی کار می‌کنیم، چرا و قدم بعدی چیست.",
    steps: [
      {
        title: "نقطهٔ شروع را پیدا می‌کنیم",
        text: "دربارهٔ ایده، کاربران و چیزی که از نسخهٔ اول انتظار دارید، گفتگو می‌کنیم.",
      },
      {
        title: "ایده را قابل لمس می‌کنیم",
        text: "محدودهٔ کار و نمونهٔ اولیه را آماده می‌کنیم تا دربارهٔ چیزی مشخص نظر بدهیم و بهترش کنیم.",
      },
      {
        title: "با هم می‌سازیم",
        text: "توسعه را مرحله‌به‌مرحله پیش می‌بریم، پیشرفت را نشان می‌دهیم و بازخورد شما را وارد کار می‌کنیم.",
      },
      {
        title: "منتشر می‌کنیم و یاد می‌گیریم",
        text: "جزئیات را تست می‌کنیم، محصول را تحویل می‌دهیم و دربارهٔ پشتیبانی و قدم بعدی توافق می‌کنیم.",
      },
    ],
    teamLabel: "۰۴ / آدم‌های پشت محصول",
    teamTitle: "یک تیم کوچک.\nیک دغدغهٔ مشترک.",
    teamIntro:
      "در استارت‌ایز، طراحی و توسعه در یک گفتگو پیش می‌روند. با همان آدم‌هایی در ارتباطید که محصولتان را می‌سازند؛ نزدیک به شما و نزدیک به کار.",
    disciplines: [
      {
        title: "طراحی با هدف",
        text: "هر صفحه از نیاز آدمی شروع می‌شود که از آن استفاده می‌کند.",
      },
      {
        title: "ساختن با دقت",
        text: "جزئیات پشت رابط هم به‌اندازهٔ ظاهر آن اهمیت دارند.",
      },
      {
        title: "همکاری روشن",
        text: "پیشرفت قابل مشاهده، بازخورد مستقیم و قدم‌های مشخص.",
      },
    ],
    teamNote:
      "در گفتگوی اول، با تیمی که روی پروژه‌تان کار می‌کند آشنا می‌شوید.",
    faqLabel: "چند سؤال قبل از شروع",
    faqTitle: "قبل از اولین سلام.",
    faqs: [
      {
        q: "اگر فقط یک ایده داشته باشم، می‌توانیم شروع کنیم؟",
        a: "بله. بگویید چه می‌خواهید بسازید و برای چه کسی. کمک می‌کنیم محدودهٔ کار روشن شود و تصمیم بگیریم نسخهٔ اول به چه چیزهایی نیاز دارد.",
      },
      {
        q: "روی محصول فعلی هم کار می‌کنید؟",
        a: "بله. تجربه و کد فعلی را بررسی می‌کنیم و برای بازطراحی، اضافه‌کردن قابلیت یا یک مرحلهٔ مشخص از توسعه، با هم توافق می‌کنیم.",
      },
      {
        q: "هزینه و زمان پروژه چطور مشخص می‌شود؟",
        a: "بعد از بررسی محدودهٔ کار، خروجی‌ها، مرحله‌ها و برآورد را مشخص می‌کنیم. زمان و هزینه به نیازهای همان پروژه بستگی دارد.",
      },
      {
        q: "سایت فارسی و انگلیسی هم می‌سازید؟",
        a: "بله. هر دو زبان را از ابتدا در نظر می‌گیریم؛ متن، فونت، چیدمان راست‌به‌چپ و جزئیاتی که باعث می‌شوند هر نسخه طبیعی به نظر برسد.",
      },
    ],
    contactLabel: "فصل بعدی شما",
    contactTitle: "بیایید یک چیز\nباارزش بسازیم.",
    contactIntro:
      "کمی از چیزی که در ذهن دارید بگویید. یک ایدهٔ اولیه هم برای شروع کافی است.",
    form: {
      name: "نام شما",
      namePlaceholder: "چه صدایتان کنیم؟",
      email: "ایمیل",
      emailPlaceholder: "you@company.com",
      service: "برای چه کاری همراهتان باشیم؟",
      choices: ["طراحی محصول", "توسعهٔ SaaS", "وب‌سایت", "با هم مشخص کنیم"],
      message: "کمی دربارهٔ پروژه",
      messagePlaceholder:
        "چه می‌سازید؟ برای چه کسانی؟ چه چیزی را لازم است بدانیم؟",
      budget: "بودجه (اختیاری)",
      budgets: [
        "در گفتگو مشخص کنیم",
        "کمتر از ۳٬۰۰۰ دلار",
        "۳٬۰۰۰ تا ۱۰٬۰۰۰ دلار",
        "بیشتر از ۱۰٬۰۰۰ دلار",
      ],
      submit: "ارسال درخواست همکاری",
      draft: "ذخیرهٔ شرح پروژه",
      sending: "در حال ارسال…",
      privacy: "اطلاعات شما فقط برای گفتگو دربارهٔ پروژه استفاده می‌شود.",
      fallback:
        "شرح پروژه را ذخیره کنید و در گفتگو با تیم به اشتراک بگذارید. دریافت آنلاین درخواست به‌زودی فعال می‌شود.",
      success: "درخواست شما ارسال شد. ممنون که دربارهٔ پروژه‌تان گفتید.",
      saved: "شرح پروژه آمادهٔ دانلود است؛ هنوز برای تیم ارسال نشده.",
      error: "درخواست ارسال نشد. دوباره تلاش کنید یا شرح پروژه را ذخیره کنید.",
      download: "دانلود شرح پروژه",
      mail: "باز کردن ایمیل",
      mailNote:
        "شرح پروژه در برنامهٔ ایمیل باز می‌شود؛ برای ارتباط با تیم، آن را از همان‌جا ارسال کنید.",
      required: "لطفاً فیلدهای ضروری را بررسی کنید.",
    },
    footer: "شروعِ اتفاق‌های خوب.",
    rights: "استارت‌ایز؛ ساخته‌شده با دقت.",
    top: "بازگشت به بالا",
    back: "بازگشت به نمونه‌کارها",
    overview: "دربارهٔ پروژه",
    highlights: "در این تجربه",
    otherWork: "پروژه‌های دیگر",
    projectContact: "ایده‌ای شبیه به این دارید؟",
  },
};
