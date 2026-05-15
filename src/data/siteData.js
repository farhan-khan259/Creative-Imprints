// src/data/siteData.js

export const defaultContent = {
  en: {
    seo: {
      title: 'Creative Imprints — Cinematic Digital Products',
      description: 'We craft cinematic digital products. A studio that works closely with mobile, web, and AI experiences for ambitious brands across the globe.',
      keywords: 'digital studio, web development, mobile apps, AI solutions, branding',
      url: 'https://www.creativeimprints.com',
    },
    navbar: {
      brandName: 'Creative Imprints',
      brandTag: 'Software & AI Studio',
      links: ['Home', 'About', 'Services', 'Portfolio', 'Pricing', 'Contact'],
      langButton: 'AR',
    },
    hero: {
      title: 'We craft cinematic digital products.',
      subtitle: 'Creative Imprints builds world-class web, mobile, and AI experiences for ambitious brands across the globe.',
      button: 'Start your project →',
    },
    stats: [
      { value: '120+', label: 'Projects delivered' },
      { value: '80+', label: 'Native clients' },
      { value: '15+', label: 'Countries' },
      { value: '7+', label: 'Years of work' },
    ],
    studio: {
      title: 'A studio engineered for the future.',
      subtitle: 'We are a multidisciplinary team of engineers, designers, and AI specialists. We partner with founders and enterprises to build products that feel inevitable — fast, beautiful, and built to scale.',
      vision: 'To be the creative engine behind the next generation of digital products in the real world and beyond.',
      mission: 'Empower every ambitious brand with software that performs at a world‑class standard.',
    },
    expertise: {
      title: 'End-to-end product expertise.',
      subtitle: 'From a sketch on a napkin to a million users — we cover every layer of the modern product stack.',
      items: [
        { title: 'Mobile Apps', description: 'Native and cross-platform apps with cinematic motion and rock-solid performance.', icon: '📱' },
        { title: 'Web Platforms', description: 'Lightning-fast, SEO-perfect web experiences built on a modern stack.', icon: '🌐' },
        { title: 'E-commerce', description: 'High-converting storefronts and marketplaces tailored to your brand.', icon: '🛒' },
        { title: 'Learning Platforms', description: 'Scalable LMS and educational products with delightful learner UX.', icon: '🎓' },
        { title: 'UI / UX Design', description: 'Research-driven design systems and interfaces that feel inevitable.', icon: '🎨' },
        { title: 'AI Solutions', description: 'Custom LLM agents, RAG pipelines, and AI features embedded into your product.', icon: '🤖' },
        { title: 'Branding', description: 'Identity systems that translate strategy into visual gravity.', icon: '✨' },
        { title: 'Cloud Systems', description: 'Resilient, secure infrastructure designed to scale to millions.', icon: '☁️' },
        { title: 'Digital Transformation', description: 'Modernize legacy operations into measurable digital leverage.', icon: '🚀' },
      ],
    },
    builtDifferent: {
      title: 'Built different. Built to last.',
      items: [
        { title: 'Modern stack', description: 'Always on the latest frameworks, runtimes, and AI models.', icon: '🧠' },
        { title: 'Speed obsessed', description: 'We ship in weeks, not quarters — without cutting quality.', icon: '⚡' },
        { title: 'Security first', description: 'Enterprise-grade security and compliance baked in from day one.', icon: '🛡️' },
        { title: 'Scales infinitely', description: 'Architectures battle-tested from MVP to millions of users.', icon: '📈' },
        { title: 'Senior team', description: 'No juniors learning on your dime — only proven specialists.', icon: '👥' },
        { title: 'Crafted UX', description: 'Pixel-level care. Motion that delights. Details that convert.', icon: '🎯' },
      ],
    },
    pricing: {
      title: 'Simple, transparent pricing.',
      items: [
        { name: 'Essential', price: '$2,500', description: 'Limited time offer', buttonText: 'Get started', buttonLink: '#contact' },
        { name: 'Pro', price: '$9,800', description: 'Full product suite', buttonText: 'Get started', buttonLink: '#contact' },
        { name: 'Custom', price: 'Custom', description: 'Tailored solutions', buttonText: 'Contact us', buttonLink: '#contact' },
        { name: "Let's talk", price: 'Schedule', description: 'Book a call with us today', buttonText: 'Book a call', buttonLink: 'https://cal.com/creativeimprints' },
      ],
    },
    finalCta: {
      title: 'Have a project in mind?',
      subtitle: 'Tell us about your idea. We typically respond within 24 hours.',
      label: 'LET\'S TALK',
      email: 'hello@creativeimprints.com',
      phone: '+966 50 000 0000',
      location: 'Riyadh • Dubai • Remote',
      whatsapp: 'Chat on WhatsApp',
      formLabels: {
        name: 'YOUR NAME',
        email: 'EMAIL ADDRESS',
        project: 'TELL US ABOUT YOUR PROJECT',
        submit: 'Send message',
      }
    },
    testimonials: {
      label: 'LOVED BY FOUNDERS',
      title: 'Trusted by the bold.',
      items: [
        {
          quote: '"Creative Imprints delivered our platform in 6 weeks. The quality rivals anything I\'ve seen out of San Francisco."',
          name: 'Sara Al-Mutairi',
          role: 'CEO, Nayabank',
          avatar: 'S',
        },
        {
          quote: '"They didn\'t just build software — they shaped our entire product thinking. A true partner."',
          name: 'Omar Khalid',
          role: 'Founder, Luman Health',
          avatar: 'O',
        },
        {
          quote: '"World-class team. Every detail is intentional. Our conversion doubled within a month."',
          name: 'Hala Ibrahim',
          role: 'CMO, Atlas Commerce',
          avatar: 'H',
        },
      ],
    },
    portfolio: {
      label: 'SELECTED WORK',
      title: 'Products we\'re proud of.',
      categories: ['All', 'Web', 'Mobile', 'AI', 'Branding'],
      items: [
        { title: 'NovaBank', subtitle: 'Fintech platform', category: 'Web', gradient: 'from-blue-500 to-purple-600', image: 'portfolio1.jpeg' },
        { title: 'Lumen Health', subtitle: 'Telemedicine app', category: 'Mobile', gradient: 'from-purple-500 to-pink-600', image: 'portfolio2.jpeg' },
        { title: 'Orbital AI', subtitle: 'LLM agent suite', category: 'AI', gradient: 'from-cyan-500 to-teal-600', image: 'portfolio3.jpeg' },
        { title: 'Atlas Commerce', subtitle: 'Headless storefront', category: 'Web', gradient: 'from-orange-500 to-red-600', image: 'portfolio4.jpeg' },
        { title: 'Voyage', subtitle: 'Identity system', category: 'Branding', gradient: 'from-teal-500 to-cyan-600', image: 'portfolio5.jpeg' },
        { title: 'Pulse Learn', subtitle: 'Education platform', category: 'Mobile', gradient: 'from-blue-600 to-indigo-700', image: 'portfolio6.jpeg' },
      ],
    },
    footer: {
      brandName: 'Creative Imprints',
      tagline: 'Crafting the future of digital products.',
      links: {
        navigate: ['About', 'Services', 'Portfolio', 'Pricing'],
        social: ['twitter', 'linkedin', 'instagram', 'github'],
      },
      copyright: '© 2024 Creative Imprints. All rights reserved.',
      credits: 'Made with care • Riyadh',
    },
  },
  ar: {
    seo: {
      title: 'كرياتيف إمبرينتس — منتجات رقمية سينمائية',
      description: 'نصنع منتجات رقمية سينمائية. استوديو يعمل عن كثب مع تجارب الهاتف المحمول والويب والذكاء الاصطناعي للعلامات التجارية الطموحة حول العالم.',
      keywords: 'استوديو رقمي, تطوير ويب, تطبيقات جوال, حلول ذكاء اصطناعي, علامات تجارية',
      url: 'https://www.creativeimprints.com',
    },
    navbar: {
      brandName: 'كرياتيف إمبرينتس',
      brandTag: 'استوديو رقمي سينمائي',
      links: ['الرئيسية', 'حول', 'الخدمات', 'الأعمال', 'الأسعار', 'اتصل'],
      langButton: 'EN',
    },
    hero: {
      title: 'نصنع منتجات رقمية سينمائية.',
      subtitle: 'كرياتيف إمبرينتس يبني تجارب ويب وهاتف محمول وذكاء اصطناعي عالمية المستوى للعلامات التجارية الطموحة حول العالم.',
      button: 'ابدأ مشروعك →',
    },
    stats: [
      { value: '١٢٠+', label: 'مشروع تم تسليمه' },
      { value: '٨٠+', label: 'عميل محلي' },
      { value: '١٥+', label: 'دولة' },
      { value: '٧+', label: 'سنوات عمل' },
    ],
    studio: {
      title: 'استوديو مهندس للمستقبل.',
      subtitle: 'نحن فريق متعدد التخصصات من المهندسين والمصممين وأخصائيي الذكاء الاصطناعي. نتعاون مع المؤسسين والشركات لبناء منتجات تبدو حتمية — سريعة وجميلة وقابلة للتوسع.',
      vision: 'أن نكون المحرك الإبداعي وراء الجيل القادم من المنتجات الرقمية في العالم الحقيقي وما بعده.',
      mission: 'تمكين كل علامة تجارية طموحة من خلال برامج تعمل بمعايير عالمية.',
    },
    expertise: {
      title: 'خبرة شاملة في المنتجات.',
      subtitle: 'من رسمة على منديل إلى مليون مستخدم — نغطي كل طبقة من طبقات المنتج الحديث.',
      items: [
        { title: 'تطبيقات الجوال', description: 'تطبيقات أصلية ومتعددة المنصات بأداء ثابت وحديث وقابل للتوسع.', icon: '📱' },
        { title: 'منصات الويب', description: 'تجربة ويب فائقة السرعة ومحسّنة لمحركات البحث مبنية على تقنيات حديثة.', icon: '🌐' },
        { title: 'التجارة الإلكترونية', description: 'متاجر وأسواق عالية التحويل مصممة خصيصاً لعلامتك التجارية.', icon: '🛒' },
        { title: 'منصات التعلم', description: 'تصميم واجهات وتجارب مستخدم مخصصة لمنتجات تعليمية ممتعة.', icon: '📚' },
        { title: 'تصميم UI/UX', description: 'عناصر ضرورية لتصميم أنظمة وتدفقات مستخدم سلسة.', icon: '🎨' },
        { title: 'حلول الذكاء الاصطناعي', description: 'وكلاء ذكاء اصطناعي مخصصون، أنظمة RAG، وميزات ذكاء اصطناعي مدمجة في منتجك.', icon: '🤖' },
        { title: 'العلامة التجارية', description: 'تحقيق الدخل من علامتك التجارية من خلال تصميم تطبيقات الجوال الأصلية.', icon: '✨' },
        { title: 'الأنظمة السحابية', description: 'بنية تحتية موثوقة وآمنة مصممة للتوسع إلى الملايين.', icon: '☁️' },
        { title: 'التحول الرقمي', description: 'تحديث العمليات القديمة إلى إيرادات رقمية قابلة للقياس.', icon: '⚡' },
      ],
    },
    builtDifferent: {
      title: 'مصنوع بشكل مختلف. مصنوع ليدوم.',
      items: [
        { title: 'تقنيات حديثة', description: 'تسعير بسيط وشفاف.', icon: '⚙️' },
        { title: 'مهووس بالسرعة', description: '"لم يبنوا البرمجيات فقط — لقد شحنوا كامل فكر منتجنا." شريك حقيقي.', icon: '🚀' },
        { title: 'فريق خبير', description: 'لا اختصارات — فقط قدرات مثبتة.', icon: '👥' },
        { title: 'منصة فائقة', description: 'Pulsar Learn.', icon: '💎' },
      ],
    },
    pricing: {
      title: 'تسعير بسيط وشفاف.',
      items: [
        { name: 'أساسي', price: '٢٬٥٠٠ دولار', description: 'عرض لفترة محدودة', buttonText: 'ابدأ الآن', buttonLink: '#contact' },
        { name: 'احترافي', price: '٩٬٨٠٠ دولار', description: 'حزمة منتج كاملة', buttonText: 'ابدأ الآن', buttonLink: '#contact' },
        { name: 'مخصص', price: 'مخصص', description: 'حلول مصممة خصيصاً', buttonText: 'اتصل بنا', buttonLink: '#contact' },
        { name: 'لنتحدث', price: 'جدول', description: 'احجز مكالمة معنا اليوم', buttonText: 'احجز مكالمة', buttonLink: 'https://cal.com/creativeimprints' },
      ],
    },
    finalCta: {
      title: 'هل لديك مشروع في ذهنك؟',
      subtitle: 'أخبرنا عن فكرتك. عادة ما نرد في غضون ٢٤ ساعة.',
      label: 'لنتحدث',
      email: 'hello@creativeimprints.com',
      phone: '+966 50 000 0000',
      location: 'الرياض • دبي • عن بعد',
      whatsapp: 'دردشة عبر WhatsApp',
      formLabels: {
        name: 'اسمك',
        email: 'عنوان البريد الإلكتروني',
        project: 'أخبرنا عن مشروعك',
        submit: 'إرسال الرسالة',
      }
    },
    testimonials: {
      label: 'يحبنا المؤسسون',
      title: 'موثوق به من قبل الشجعان.',
      items: [
        {
          quote: 'قدمت Creative Imprints منصتنا في 6 أسابيع. الجودة تضاهي أي شيء رأيته خارج سان فرانسيسكو.',
          name: 'سارة المتيري',
          role: 'الرئيس التنفيذي، نايابنك',
          avatar: 'S',
        },
        {
          quote: 'لم يقوموا ببناء البرمجيات فقط - فقد شكلوا تفكيرنا المنتج بالكامل. شريك حقيقي.',
          name: 'عمر خالد',
          role: 'المؤسس، لومان هيلث',
          avatar: 'O',
        },
        {
          quote: 'فريق عالمي المستوى. كل التفاصيل مقصودة. تضاعفت التحويلات في غضون شهر.',
          name: 'هالة إبراهيم',
          role: 'مدير التسويق، أطلس كومرس',
          avatar: 'H',
        },
      ],
    },
    portfolio: {
      label: 'أعمالنا المختارة',
      title: 'المنتجات التي نفخر بها.',
      categories: ['الكل', 'ويب', 'جوال', 'ذكاء اصطناعي', 'العلامات'],
      items: [
        { title: 'نوفابنك', subtitle: 'منصة مالية', category: 'ويب', gradient: 'from-blue-500 to-purple-600', image: 'portfolio1.jpeg' },
        { title: 'لومان هيلث', subtitle: 'تطبيق طب عن بعد', category: 'جوال', gradient: 'from-purple-500 to-pink-600', image: 'portfolio2.jpeg' },
        { title: 'أوربيتال إيه آي', subtitle: 'مجموعة وكلاء LLM', category: 'ذكاء اصطناعي', gradient: 'from-cyan-500 to-teal-600', image: 'portfolio3.jpeg' },
        { title: 'أطلس كومرس', subtitle: 'متجر بدون رأس', category: 'ويب', gradient: 'from-orange-500 to-red-600', image: 'portfolio4.jpeg' },
        { title: 'فويج', subtitle: 'نظام الهوية', category: 'العلامات', gradient: 'from-teal-500 to-cyan-600', image: 'portfolio5.jpeg' },
        { title: 'بالس لرن', subtitle: 'منصة تعليمية', category: 'جوال', gradient: 'from-blue-600 to-indigo-700', image: 'portfolio6.jpeg' },
      ],
    },
    footer: {
      brandName: 'كرياتيف إمبرينتس',
      tagline: 'صنع مستقبل المنتجات الرقمية.',
      links: {
        navigate: ['حول', 'الخدمات', 'الأعمال', 'الأسعار'],
        social: ['تويتر', 'لينكدإن', 'انستغرام', 'جيتهاب'],
      },
      copyright: '© ٢٠٢٤ كرياتيف إمبرينتس. جميع الحقوق محفوظة.',
      credits: 'صُنع بعناية • الرياض',
    },
  },
};

export default defaultContent;