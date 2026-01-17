'use client';
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import React, { useRef } from "react";
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
  Palette
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { AnimatedNumber } from "@/components/ui/animated-number";
import { AnimatedCheckmark } from "@/components/ui/animated-checkmark";

const stats = [
  { value: 10000, suffix: "+", label: "Students Trained", color: "text-accent-1" },
  { value: 95, suffix: "%", label: "Success Rate", color: "text-accent-2" },
  { value: 50, suffix: "+", label: "Expert Instructors", color: "text-accent-3" },
  { value: 4.9, suffix: "", label: "Average Rating", decimals: 1, color: "text-accent-4" },
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
    name: "Priya Sharma",
    role: "PTE Score: 85",
    content: "Smart Labs transformed my preparation journey. The AI feedback and personalized study plan helped me achieve my target score in just 3 weeks!",
    avatar: "PS",
    color: "from-accent-1/80 to-accent-3/80"
  },
  {
    name: "Mohammed Al-Hassan",
    role: "IELTS Band: 8.0",
    content: "The instructors are incredibly knowledgeable. Their strategies for the speaking section were game-changers. Highly recommended!",
    avatar: "MA",
    color: "from-accent-2/80 to-accent-4/80"
  },
  {
    name: "Sarah Chen",
    role: "CELPIP Score: 12",
    content: "The self-paced CELPIP course was perfect for my schedule. The materials are comprehensive and the practice tests are very close to the real exam.",
    avatar: "SC",
    color: "from-primary/80 to-accent-2/80"
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
                <span>#1 Exam Prep Platform</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Master Your{" "}
                <span className="gradient-text">English Exams</span>{" "}
                with a Splash of Fun
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Join thousands of successful students who achieved their dream scores with our AI-powered learning platform, expert instructors, and proven strategies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
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
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center sm:text-left"
                  >
                    <div className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>
                      <AnimatedNumber value={stat.value} decimals={stat.decimals || 0} />{stat.suffix}
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
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-primary/10">
                      <Book className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-lg">Your Learning Journey</div>
                      <div className="text-sm text-muted-foreground">Personalized path to success</div>
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
      <section className="py-20 lg:py-28 bg-secondary/30">
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
      <section className="py-20 lg:py-28">
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

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-secondary/30">
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
            {testimonials.map((testimonial) => (
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
      <section className="py-20 lg:py-28">
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
                  variant="outline" 
                  size="xl" 
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
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
