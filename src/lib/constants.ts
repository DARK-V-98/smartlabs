
type NavLink = {
  href: string;
  label: string;
  authRequired?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/corporate-training', label: 'Corporate Training' },
  { href: '/contact', label: 'Contact' },
  { href: '/dashboard', label: 'Dashboard', authRequired: true },
];

export const courseData = [
  {
    title: 'PTE',
    description: 'Achieve your desired score in the Pearson Test of English Academic.',
    duration: '4 Weeks',
    features: ['AI Scoring Practice', 'Test-taking Strategies', 'Integrated Skills Practice'],
  },
  {
    title: 'IELTS',
    description: 'Prepare for the International English Language Testing System with our comprehensive course.',
    duration: '8 Weeks',
    features: ['Mock Tests', 'Personalized Feedback', 'Vocabulary Building'],
  },
  {
    title: 'CELPIP',
    description: 'Excel in the Canadian English Language Proficiency Index Program for immigration to Canada.',
    duration: '6 Weeks',
    features: ['Computer-Based Practice', 'Real-Life Scenarios', 'Accent Training'],
  },
];

export const testimonials = [
    {
        name: 'Priya Sharma',
        course: 'IELTS Student',
        quote: 'The personalized study plan was a game-changer! I improved my score by 1.5 bands in just 6 weeks. The instructors at Smart Labs are fantastic.',
        avatar: 'https://picsum.photos/100/100?random=1',
    },
    {
        name: 'John Adebayo',
        course: 'OET Student',
        quote: 'As a doctor, the OET course was perfectly tailored to my needs. The role-playing sessions gave me the confidence I needed for the speaking test.',
        avatar: 'https://picsum.photos/100/100?random=2',
    },
    {
        name: 'Chen Wei',
        course: 'PTE Student',
        quote: 'I needed a good PTE score quickly for my university application, and Smart Labs delivered. The strategies and AI-scored tests were incredibly helpful.',
        avatar: 'https://picsum.photos/100/100?random=3',
    },
];

export const blogPosts = [
    {
        slug: 'mastering-ielts-writing-task-2',
        title: 'Mastering IELTS Writing Task 2: A Step-by-Step Guide',
        date: '2024-05-15',
        author: 'Jane Doe',
        category: 'IELTS',
        image: 'https://picsum.photos/400/250?random=4',
        excerpt: 'Unlock the secrets to scoring high in the IELTS Writing Task 2. Our guide breaks down the structure, common topics, and provides sample answers.',
        content: '<p>The IELTS Writing Task 2 is often the most challenging part of the test for many students. It requires you to write an essay of at least 250 words in response to a prompt. This guide will walk you through the process, from understanding the question to structuring your essay and writing a compelling conclusion.</p><h3>Understanding the Question Types</h3><p>There are several common types of questions in Task 2, including opinion essays, discussion essays, and problem-solution essays. Identifying the type is the first step to crafting a relevant response.</p><h3>Structuring Your Essay</h3><p>A clear structure is key. We recommend a four-paragraph structure: Introduction, Body Paragraph 1, Body Paragraph 2, and Conclusion. Each part has a specific role to play in presenting your argument effectively.</p>'
    },
    {
        slug: 'common-mistakes-in-the-pte-speaking-section',
        title: '5 Common Mistakes to Avoid in the PTE Speaking Section',
        date: '2024-05-10',
        author: 'John Smith',
        category: 'PTE',
        image: 'https://picsum.photos/400/250?random=5',
        excerpt: 'The PTE speaking section is scored by an AI. Learn about the common pitfalls that can lower your score and how to avoid them for a better result.',
        content: '<p>The PTE Speaking section tests your ability to speak English in an academic environment. Because it is computer-scored, understanding how the AI evaluates your response is crucial. Here are five common mistakes to avoid...</p>'
    },
    {
        slug: 'a-guide-to-oet-for-nurses',
        title: 'A Comprehensive Guide to OET for Nurses',
        date: '2024-05-05',
        author: 'Emily White',
        category: 'OET',
        image: 'https://picsum.photos/400/250?random=6',
        excerpt: 'Are you a nurse preparing for the OET? This guide covers everything you need to know about the test format, key skills, and preparation strategies specific to nursing.',
        content: '<p>The Occupational English Test (OET) is the preferred English test for healthcare professionals. For nurses, it assesses language skills in a relevant medical context. This guide will delve into the specifics of the OET for nurses...</p>'
    },
];

export const resourceLibrary = [
    { type: 'test', title: 'IELTS Academic - Sample Test', format: 'PDF', icon: 'FileText' },
    { type: 'test', title: 'PTE Academic - Full-length Mock Test', format: 'PDF', icon: 'FileText' },
    { type: 'video', title: 'OET Speaking Role-play Example', format: 'Video', icon: 'Video' },
    { type: 'list', title: 'TOEFL Vocabulary List', format: 'PDF', icon: 'FileText' },
    { type: 'video', title: 'IELTS Writing Task 1 Strategy', format: 'Video', icon: 'Video' },
    { type: 'test', title: 'OET Nursing - Sample Case Notes', format: 'PDF', icon: 'FileText' },
];
