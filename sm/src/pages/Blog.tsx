import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Calendar,
  Clock,
  ArrowRight,
  User
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "10 Essential Tips to Ace Your PTE Speaking Section",
    excerpt: "Master the PTE speaking section with these proven strategies from our expert instructors. Learn how to manage your time, improve fluency, and maximize your score.",
    category: "PTE",
    author: "Vishwa Kumara",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    image: "from-primary to-purple-500",
  },
  {
    title: "IELTS Writing Task 2: Complete Guide to Band 7+",
    excerpt: "Learn the structure, vocabulary, and strategies you need to achieve Band 7 or higher in IELTS Writing Task 2. Includes sample essays and common mistakes to avoid.",
    category: "IELTS",
    author: "Priya Fernando",
    date: "Jan 12, 2026",
    readTime: "8 min read",
    image: "from-accent to-teal-400",
  },
  {
    title: "CELPIP vs IELTS: Which Test Should You Take?",
    excerpt: "A comprehensive comparison of CELPIP and IELTS for Canadian immigration. Understand the key differences, advantages, and which test might be better for you.",
    category: "CELPIP",
    author: "Ahmed Rasheed",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    image: "from-brand-amber to-orange-400",
  },
  {
    title: "How AI is Revolutionizing Language Learning",
    excerpt: "Discover how artificial intelligence is transforming the way students prepare for English proficiency exams. From instant feedback to personalized study plans.",
    category: "Technology",
    author: "Sarah Wong",
    date: "Jan 8, 2026",
    readTime: "4 min read",
    image: "from-pink-500 to-rose-400",
  },
  {
    title: "Building Confidence for the Speaking Test",
    excerpt: "Nervous about speaking tests? Learn psychological techniques and practical exercises to boost your confidence and perform your best on exam day.",
    category: "Tips",
    author: "Vishwa Kumara",
    date: "Jan 5, 2026",
    readTime: "5 min read",
    image: "from-indigo-500 to-blue-400",
  },
  {
    title: "Corporate English Training: A Necessity in Today's Market",
    excerpt: "Why organizations are investing in English training for their employees and how it impacts business outcomes, communication, and global competitiveness.",
    category: "Corporate",
    author: "Priya Fernando",
    date: "Jan 2, 2026",
    readTime: "7 min read",
    image: "from-emerald-500 to-green-400",
  },
];

export default function Blog() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              <span>Smart Labs Blog</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Insights & <span className="gradient-text">Resources</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Expert tips, study strategies, and the latest news in English proficiency testing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`h-48 bg-gradient-to-br ${post.image} relative`}>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    
                    <Link 
                      to="#" 
                      className="flex items-center text-primary font-medium text-sm group-hover:gap-2 gap-1 transition-all"
                    >
                      Read <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="heroOutline" size="lg">
              Load More Articles
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest study tips, exam updates, and exclusive resources delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" size="lg">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
