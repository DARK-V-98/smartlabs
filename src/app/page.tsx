
'use client';
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import React, { useRef } from "react";
import Image from 'next/image';
import { 
  Book,
  Feather,
  TrendingUp,
  Award, 
  Star, 
  ArrowRight,
  Play,
  Sparkles,
  Target,
  Zap,
  Globe,
  Palette,
  User,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { AnimatedNumber } from "@/components/ui/animated-number";
import { AnimatedCheckmark } from "@/components/ui/animated-checkmark";

type Stat = {
  value?: number;
  valueString?: string;
  suffix: string;
  label: string;
  color: string;
  decimals?: number;
};

const stats: Stat[] = [
  { value: 5000, suffix: "+", label: "Students Trained", color: "text-accent-1" },
  { value: 95, suffix: "%", label: "Success Rate", color: "text-accent-2" },
  { valueString: "6–8", suffix: " Weeks", label: "Typical Target Achievement", color: "text-accent-3" },
];

const courses = [
  {
    title: "PTE Academic",
    description: "Master the Pearson Test of English with AI-powered practice and expert strategies.",
    icon: Target,
    href: "/pte",
    color: "from-accent-1/20 to-accent-1/5",
    iconColor: "text-accent-1",
    features: ["AI Scoring Practice", "Live Classes", "Full Materials Access"],
  },
  {
    title: "IELTS Training",
    description: "Achieve your target band score with comprehensive IELTS preparation.",
    icon: Globe,
    href: "/ielts",
    color: "from-accent-2/20 to-accent-2/5",
    iconColor: "text-accent-2",
    features: ["Speaking Practice", "Writing Feedback", "Mock Tests"],
  },
  {
    title: "CELPIP Prep",
    description: "Your pathway to Canadian immigration with focused CELPIP training.",
    icon: Zap,
    href: "/celpip",
    color: "from-accent-4/20 to-accent-4/5",
    iconColor: "text-accent-4",
    features: ["Self-Paced Learning", "Video Guides", "Practice Tests"],
  },
];

const features = [
  {
    icon: Feather,
    title: "Expert-Led Courses",
    description: "Learn from certified instructors with years of exam preparation experience.",
    color: "bg-accent-1/10 text-accent-1"
  },
  {
    icon: Sparkles,
    title: "AI-Powered Practice",
    description: "Get instant feedback on your practice tests with our advanced AI scoring system.",
    color: "bg-accent-2/10 text-accent-2"
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "Join thousands of successful students who achieved their target scores.",
    color: "bg-accent-3/10 text-accent-3"
  },
  {
    icon: Palette,
    title: "Creative Tools",
    description: "Engage with content through interactive and creative learning modules.",
    color: "bg-accent-4/10 text-accent-4"
  },
];

const testimonials = [
    {
        name: 'Priya Sharma',
        role: 'PTE Score: 85 | Sri Lanka',
        content: 'Smart Labs transformed my preparation journey. The AI feedback and personalized study plan helped me achieve my target score in just 3 weeks!',
        avatar: 'PS',
        color: 'from-accent-1/80 to-accent-3/80',
    },
    {
        name: 'Liam Smith',
        role: 'IELTS Band: 8.5 | Australia',
        content: 'The instructors are incredibly knowledgeable. Their strategies for the speaking section were game-changers. Highly recommended for anyone in Australia!',
        avatar: 'LS',
        color: 'from-accent-2/80 to-accent-4/80',
    },
    {
        name: 'Nimali Perera',
        role: 'CELPIP Score: 12 | Sri Lanka',
        content: 'The self-paced CELPIP course was perfect for my schedule. The materials are comprehensive and the practice tests are very close to the real exam.',
        avatar: 'NP',
        color: 'from-primary/80 to-accent-2/80',
    },
    {
        name: 'Olivia Wilson',
        role: 'PTE Score: 90 | Australia',
        content: "The AI scoring for PTE is spot on. It's like having a personal tutor 24/7. I couldn't have achieved a perfect score without it.",
        avatar: 'OW',
        color: 'from-accent-1/80 to-accent-4/80',
    },
    {
        name: 'Chaminda Silva',
        role: 'IELTS Band: 8.0 | Sri Lanka',
        content: 'I was struggling with the writing section, but the detailed feedback from my instructor helped me improve immensely. Thank you, Smart Labs!',
        avatar: 'CS',
        color: 'from-accent-3/80 to-primary/80',
    },
    {
        name: 'Noah Taylor',
        role: 'PTE Score: 88 | Australia',
        content: 'Fantastic course structure and brilliant teachers. The live classes were engaging and very helpful. A big thank you from Melbourne!',
        avatar: 'NT',
        color: 'from-accent-2/80 to-accent-1/80',
    },
    {
        name: 'Fathima Rizwan',
        role: 'IELTS General: 8.0 | Sri Lanka',
        content: 'As a working professional, the weekend classes were perfect for me. The study materials are top-notch and very comprehensive.',
        avatar: 'FR',
        color: 'from-accent-4/80 to-accent-3/80',
    },
    {
        name: 'Charlotte Clark',
        role: 'CELPIP Score: 11 | Australia',
        content: 'I needed a high CELPIP score for my PR application. Smart Labs provided exactly the focused preparation I needed. The instructors are experts.',
        avatar: 'CC',
        color: 'from-primary/80 to-accent-4/80',
    },
    {
        name: 'Dinesh Jayasuriya',
        role: 'PTE Score: 82 | Sri Lanka',
        content: 'The AI-powered practice platform is amazing. It identified my weaknesses in speaking and helped me improve my pronunciation and fluency.',
        avatar: 'DJ',
        color: 'from-accent-1/80 to-accent-2/80',
    },
    {
        name: 'William Brown',
        role: 'IELTS Band: 7.5 | Australia',
        content: 'A great learning experience. The small class sizes meant I got a lot of individual attention. I felt very prepared on exam day.',
        avatar: 'WB',
        color: 'from-accent-3/80 to-accent-4/80',
    },
    {
        name: 'Sanjeewa Pathirana',
        role: 'PTE Score: 79+ | Sri Lanka',
        content: "Achieved my target for Australian PR! The strategies for 'describe image' and 'retell lecture' were pure gold. Highly recommend their Boostify sessions.",
        avatar: 'SP',
        color: 'from-primary/80 to-accent-1/80',
    },
    {
        name: 'Isabelle Tremblay',
        role: 'IELTS Band: 8.0 | Australia',
        content: 'The writing feedback was so detailed and constructive. It helped me understand my mistakes and improve my essay structure. Fantastic support!',
        avatar: 'IT',
        color: 'from-accent-2/80 to-accent-3/80',
    },
    {
        name: 'Ruwan Dias',
        role: 'CELPIP Score: 10 | Sri Lanka',
        content: 'The self-paced CELPIP course is excellent for busy people. I could study whenever I had free time and still get a great score.',
        avatar: 'RD',
        color: 'from-accent-4/80 to-primary/80',
    },
    {
        name: 'Lucas Nguyen',
        role: 'PTE Score: 84 | Australia',
        content: 'The AI scoring is incredibly accurate. It gave me the confidence I needed to face the real exam. The platform is very user-friendly.',
        avatar: 'LN',
        color: 'from-accent-1/80 to-accent-2/80',
    },
    {
        name: 'Niluka Fernando',
        role: 'IELTS General: 7.5 | Sri Lanka',
        content: 'My speaking skills improved dramatically with the one-on-one practice sessions. The instructors are very patient and encouraging.',
        avatar: 'NF',
        color: 'from-accent-3/80 to-accent-4/80',
    },
    {
        name: 'Mia Garcia',
        role: 'PTE Score: 89 | Australia',
        content: 'I was stuck at 75 for months. After joining Smart Labs, I jumped to 89 in my first attempt. Their methods just work!',
        avatar: 'MG',
        color: 'from-primary/80 to-accent-3/80',
    },
    {
        name: 'Tharindu Ekanayake',
        role: 'IELTS Academic: 7.5 | Sri Lanka',
        content: 'The mock tests were very similar to the actual exam. It made me feel so prepared and confident on the test day. Thank you Smart Labs team!',
        avatar: 'TE',
        color: 'from-accent-2/80 to-primary/80',
    },
    {
        name: 'Oliver King',
        role: 'CELPIP Score: 11 | Australia',
        content: 'A fantastic resource for anyone applying for Canadian PR. The course covers all the tricky parts of the CELPIP test perfectly.',
        avatar: 'OK',
        color: 'from-accent-4/80 to-accent-1/80',
    },
    {
        name: 'Ayesha Maduwanthi',
        role: 'PTE Score: 81 | Sri Lanka',
        content: 'The Google Drive access to all materials was super helpful. I could download and study them anytime. Great value for money.',
        avatar: 'AM',
        color: 'from-primary/80 to-accent-4/80',
    },
    {
        name: 'Chloe Lee',
        role: 'IELTS Band: 8.5 | Australia',
        content: "I can't thank my instructor enough for the personalized attention. They really focused on my weak areas in reading and writing.",
        avatar: 'CL',
        color: 'from-accent-1/80 to-accent-3/80',
    },
    {
        name: 'Kasun Rajapakse',
        role: 'PTE Score: 86 | Sri Lanka',
        content: 'The best PTE class in Colombo! The AI platform is a game-changer for practice, especially for the speaking module. I finally got my desired score for migration.',
        avatar: 'KR',
        color: 'from-accent-2/80 to-accent-1/80',
    },
    {
        name: 'Emily White',
        role: 'IELTS Band: 8.0 | Australia',
        content: 'The weekend group class for IELTS was perfect for my busy schedule. The instructors create a very supportive and interactive learning environment.',
        avatar: 'EW',
        color: 'from-accent-3/80 to-accent-4/80',
    },
    {
        name: 'Sachini Gamage',
        role: 'CELPIP Score: 10 | Sri Lanka',
        content: 'I was new to the CELPIP exam, but the self-paced program made it easy to understand. The video guides are clear and very helpful.',
        avatar: 'SG',
        color: 'from-primary/80 to-accent-2/80',
    },
    {
        name: 'Jack Robinson',
        role: 'PTE Score: 90 | Australia',
        content: 'Perfect score! The strategies and continuous practice on the Smart Labs platform were key. The instant AI feedback is incredibly accurate and useful.',
        avatar: 'JR',
        color: 'from-accent-1/80 to-accent-4/80',
    },
    {
        name: 'Isuru Bandara',
        role: 'IELTS General: 8.0 | Sri Lanka',
        content: 'My writing score improved from 6.5 to 8.0 thanks to the detailed feedback and essay correction service. I highly recommend Smart Labs.',
        avatar: 'IB',
        color: 'from-accent-2/80 to-accent-3/80',
    },
    {
        name: 'Grace Wilson',
        role: 'PTE Score: 84 | Australia',
        content: 'The online Boostify session was intense but so effective. Covered all the important topics and strategies in just two weeks. Fantastic!',
        avatar: 'GW',
        color: 'from-accent-4/80 to-primary/80',
    },
    {
        name: 'Hashan Madushka',
        role: 'IELTS Academic: 7.5 | Sri Lanka',
        content: 'The physical classes in Rajagiriya were great. The small group size allowed for a lot of interaction with the teacher. I felt very supported.',
        avatar: 'HM',
        color: 'from-primary/80 to-accent-1/80',
    },
    {
        name: 'Zoe Johnson',
        role: 'CELPIP Score: 12 | Australia',
        content: 'I achieved the highest score in CELPIP! The practice materials were spot on and covered all the scenarios I faced in the actual test.',
        avatar: 'ZJ',
        color: 'from-accent-2/80 to-accent-4/80',
    },
    {
        name: 'Dilini Weerasinghe',
        role: 'PTE Score: 80 | Sri Lanka',
        content: 'The flexibility of the online classes was a huge plus. I could join from home after work. The recordings were also very useful for revision.',
        avatar: 'DW',
        color: 'from-accent-3/80 to-accent-2/80',
    },
    {
        name: 'Max Evans',
        role: 'IELTS Band: 8.0 | Australia',
        content: 'A truly professional and effective program. The course structure is logical, and the instructors are experts in their field. Worth every penny.',
        avatar: 'ME',
        color: 'from-accent-1/80 to-primary/80',
    },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const heroRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 40 });
  const springY = useSpring(y, { stiffness: 300, damping: 40 });

  const parallaxX1 = useTransform(springX, [-100, 100], [-15, 15]);
  const parallaxY1 = useTransform(springY, [-100, 100], [-10, 10]);

  const parallaxX2 = useTransform(springX, [-100, 100], [15, -15]);
  const parallaxY2 = useTransform(springY, [-100, 100], [10, -10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (heroRef.current) {
      const rect = (heroRef.current as HTMLElement).getBoundingClientRect();
      const newX = event.clientX - rect.left - rect.width / 2;
      const newY = event.clientY - rect.top - rect.height / 2;
      x.set(newX);
      y.set(newY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-1/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Achieve Your Target Score with the Right Guidance.</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Master Your{" "}
                <span className="gradient-text">English Exams</span>{" "}
                with a Splash of Fun
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Join thousands of successful students who achieved their dream scores with our AI-powered learning platform, expert instructors, and proven strategies.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-start gap-4 mb-10">
                <Button variant="hero" size="xl" asChild>
                  <Link href="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/dashboard/practice-tests">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explore AI Tests
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <a href="https://register.smartlabs.lk" target="_blank" rel="noopener noreferrer">
                    Book Your Individual Session Now
                  </a>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center sm:text-left"
                  >
                    <div className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>
                      {stat.value ? (
                        <AnimatedNumber value={stat.value} decimals={stat.decimals || 0} />
                      ) : (
                        stat.valueString
                      )}
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Hero Card */}
            <motion.div
              ref={heroRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="glass-card rounded-3xl p-8 shadow-xl">
                  <div className="flex flex-col items-center gap-4 mb-6">
                    <Image src="/logo.png" alt="Smart Labs Logo" width={160} height={160} />
                    <div>
                      <div className="font-display font-semibold text-lg text-center">Your Learning Journey</div>
                      <div className="text-sm text-muted-foreground text-center">Personalized path to success</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {["Complete diagnostic test", "Get personalized study plan", "Practice with AI feedback", "Achieve your target score"].map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                          {i + 1}
                        </div>
                        <span className={i === 0 ? "font-medium" : "text-muted-foreground"}>{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {["PS", "MH", "SC", "+"].map((avatar, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-1 flex items-center justify-center text-white text-xs font-bold ring-2 ring-card"
                          >
                            {avatar}
                          </div>
                        ))}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-accent-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">2,400+ reviews</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  style={{ x: parallaxX1, y: parallaxY1 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-accent-2" />
                    <span className="font-semibold">95% Success</span>
                  </div>
                </motion.div>

                <motion.div
                  style={{ x: parallaxX2, y: parallaxY2 }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent-3" />
                    <span className="font-semibold">AI-Powered</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="relative py-20 lg:py-28 bg-secondary/30 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Book className="h-4 w-4" />
              <span>Our Courses</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Choose Your Path to Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert-crafted courses designed to help you achieve your target scores in PTE, IELTS, and CELPIP exams.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {courses.map((course) => (
              <motion.div key={course.title} variants={itemVariants}>
                <Link
                  href={course.href}
                  className="group block h-full glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md`}>
                    <course.icon className={`h-8 w-8 ${course.iconColor}`} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {course.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <AnimatedCheckmark className={course.iconColor} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all mt-auto">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Why Choose Us</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Everything You Need to{" "}
                <span className="gradient-text">Succeed</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our comprehensive platform combines cutting-edge technology with expert instruction to deliver the most effective exam preparation experience.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <motion.div 
                      className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${feature.color}`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
                    >
                      <feature.icon className="h-6 w-6" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card rounded-3xl p-8 shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-accent-3/20 to-primary/20 rounded-2xl flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-white/90 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">See How It Works</h3>
                <p className="text-muted-foreground">Watch our 2-minute overview to learn how Smart Labs can help you achieve your goals.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet The Founder Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none lg:mx-0 group"
            >
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-accent-3/50 to-accent-1/50 rounded-3xl rotate-[-3deg] transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105"></div>
              <Image
                src="/la.png"
                alt="Lahiruka Weeraratne (Laheer), Founder of Smart Labs"
                fill
                className="rounded-3xl object-cover shadow-2xl z-10 relative transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <User className="h-4 w-4" />
                <span>Meet Our Founder</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Lahiruka Weeraratne (Laheer)
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our Founder and Director, Lahiruka Weeraratne, known in the industry as Laheer, is a distinguished expert trainer officially trained by Pearson UK. She specializes in PTE, IELTS, and CELPIP exams—the essential pathways for students and professionals seeking to study, migrate, or settle abroad. With over 6 years of professional experience, she has successfully trained more than 5,000 students, empowering them to achieve their global aspirations.
              </p>
              
              <h3 className="font-semibold text-xl mb-4">Areas of Expertise</h3>
              <ul className="space-y-2">
                  <li className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-muted/50 hover:shadow-inner cursor-pointer">
                      <div className="p-3 bg-accent-1/10 rounded-xl"><GraduationCap className="h-5 w-5 text-accent-1" /></div>
                      <div>
                          <h4 className="font-semibold">Competency Test Training</h4>
                          <p className="text-sm text-muted-foreground">PTE, IELTS, CELPIP</p>
                      </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-muted/50 hover:shadow-inner cursor-pointer">
                      <div className="p-3 bg-accent-2/10 rounded-xl"><Briefcase className="h-5 w-5 text-accent-2" /></div>
                      <div>
                          <h4 className="font-semibold">Corporate Language & Communication Development</h4>
                      </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-muted/50 hover:shadow-inner cursor-pointer">
                      <div className="p-3 bg-accent-3/10 rounded-xl"><Globe className="h-5 w-5 text-accent-3" /></div>
                      <div>
                          <h4 className="font-semibold">Study Abroad & Migration Guidance</h4>
                      </div>
                  </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 lg:py-28 bg-secondary/30 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-4/10 text-accent-4 text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              <span>Success Stories</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful students who transformed their futures with Smart Labs.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.slice(0, 3).map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                className="glass-card rounded-3xl p-8 h-full flex flex-col"
              >
                <div className="flex items-center gap-1 text-accent-4 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed flex-grow">"{testimonial.content}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent-3 to-accent-1 p-12 lg:p-16 text-center"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Ace Your Exam?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Join thousands of successful students. Start your free trial today and take the first step towards achieving your dream score.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="xl" 
                  className="bg-white text-primary hover:bg-white/90 shadow-xl"
                  asChild
                >
                  <Link href="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="default"
                  size="xl" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl"
                  asChild
                >
                  <Link href="/contact">Book Free Consultation</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
