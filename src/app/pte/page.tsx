'use client';
import type { Metadata } from 'next';
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Target, 
  CheckCircle, 
  Clock, 
  Calendar, 
  MapPin, 
  Video, 
  FileText, 
  Users,
  ArrowRight,
  Sparkles,
  BookOpen,
  Headphones,
  PenTool,
  MessageSquare,
  ListChecks,
  Mic,
  Book as BookIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'PTE Preparation Course | AI-Scored Mock Tests',
  description: 'Master the PTE Academic exam with Smart Labs. Our comprehensive course offers AI-powered scoring, live online classes, and expert strategies to help you achieve your target score.',
  keywords: 'PTE preparation, PTE course, PTE online, PTE mock test, PTE AI scoring, Smart Labs',
};


const pteAcademicSections = [
    {
      title: "Speaking",
      icon: Mic,
      items: [
        { name: "Read Aloud", new: true, ai: true, href: "#" },
        { name: "Repeat Sentence", new: false, ai: true, href: "#" },
        { name: "Describe Image", new: false, ai: true, href: "#" },
        { name: "Retell Lecture", new: false, ai: true, href: "#" },
        { name: "Answer Short Question", new: false, ai: true, href: "#" },
        { name: "Summarize Group Discussion", new: true, ai: true, href: "#" },
        { name: "Respond to a Situation", new: true, ai: true, href: "#" },
      ],
    },
    {
      title: "Writing",
      icon: PenTool,
      items: [
        { name: "Summarize Written Text", new: false, ai: true, href: "#" },
        { name: "Write Essay", new: false, ai: true, href: "#" },
      ],
    },
    {
      title: "Reading",
      icon: BookIcon,
      items: [
        { name: "Fill in the Blanks (Dropdown)", new: false, ai: false, href: "#" },
        { name: "Multiple Choice (Multiple)", new: false, ai: false, href: "#" },
        { name: "Reorder Paragraph", new: false, ai: false, href: "#" },
        { name: "Fill in the Blanks (Drag and Drop)", new: false, ai: false, href: "#" },
        { name: "Multiple Choice (Single)", new: false, ai: true, href: "/dashboard/practice-tests/pte-reading-test" },
      ],
    },
    {
      title: "Listening",
      icon: Headphones,
      items: [
        { name: "Summarize Spoken Text", new: false, ai: true, href: "#" },
        { name: "Multiple Choice (Multiple)", new: false, ai: false, href: "#" },
        { name: "Fill in the Blanks", new: false, ai: false, href: "#" },
        { name: "Highlight Correct Summary", new: false, ai: false, href: "#" },
        { name: "Multiple Choice (Single)", new: false, ai: false, href: "#" },
        { name: "Select Missing Word", new: false, ai: false, href: "#" },
        { name: "Highlight Incorrect Words", new: false, ai: false, href: "#" },
        { name: "Write from Dictation", new: false, ai: false, href: "#" },
      ],
    },
];

const pteCoreSections = [
    {
      title: "Speaking",
      icon: Mic,
      items: [
        { name: "Respond to a Situation", new: false, ai: false, href: "#" },
        // ... other PTE Core speaking items
      ],
    },
     {
      title: "Writing",
      icon: PenTool,
      items: [
        { name: "Write Email", new: false, ai: false, href: "#" },
        { name: "Summarize Written Text", new: false, ai: false, href: "#" },
        // ... other PTE Core writing items
      ],
    },
     {
      title: "Reading",
      icon: BookIcon,
      items: [
        // ... PTE Core reading items
      ],
    },
     {
      title: "Listening",
      icon: Headphones,
      items: [
        // ... PTE Core listening items
      ],
    },
];


const boostifyFeatures = [
  "AI scoring practice with instant feedback",
  "Full Google Drive access with updated materials",
  "Live class recordings available for 2 months",
  "Individual feedback on difficult question types",
];

const physicalFeatures = [
  "16 hours physical class sessions",
  "25 hours online Boostify session included",
  "Total 41 hours of comprehensive training",
  "Direct interaction with instructors",
];

export default function PTE() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-1/5 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Target className="h-4 w-4" />
              <span>PTE Academic Preparation</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              PTE Preparation{" "}
              <span className="gradient-text">Course</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master the Pearson Test of English with expert strategies and personalized feedback.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link href="/signup">
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Exam Structure Section */}
      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-2/10 text-accent-2 text-sm font-medium mb-4">
                <ListChecks className="h-4 w-4" />
                <span>Exam Structure</span>
              </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              PTE Exam Question Types
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understand the question types for each section of the PTE exam.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto">
            <Tabs defaultValue="pte-academic" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                    <TabsTrigger value="pte-academic">PTE Academic / UKVI</TabsTrigger>
                    <TabsTrigger value="pte-core">PTE Core</TabsTrigger>
                </TabsList>
                <TabsContent value="pte-academic" className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pteAcademicSections.map((section) => (
                        <div key={section.title}>
                        <h3 className="flex items-center gap-3 text-lg font-semibold mb-4">
                            <section.icon className="h-6 w-6 text-primary" />
                            {section.title}
                        </h3>
                        <ul className="space-y-2">
                            {section.items.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="flex items-center justify-between p-2 rounded-md hover:bg-muted-foreground/5 transition-colors group">
                                <span className="text-muted-foreground group-hover:text-foreground">{item.name}</span>
                                <div className="flex items-center gap-1">
                                    {item.new && <Badge variant="secondary" className="bg-green-100 text-green-800">New</Badge>}
                                    {item.ai && <Badge variant="secondary" className="bg-primary/10 text-primary">AI Score</Badge>}
                                </div>
                                </Link>
                            </li>
                            ))}
                        </ul>
                        </div>
                    ))}
                    </div>
                </TabsContent>
                <TabsContent value="pte-core" className="mt-8">
                     <div className="text-center py-16 bg-card rounded-2xl">
                        <p className="text-muted-foreground">PTE Core question types coming soon!</p>
                    </div>
                </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Course Offerings */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Course Options</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Choose Your Learning Path
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Boostify Session Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 border-2 border-primary/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">PTE Online – Boostify Session</h3>
                  <p className="text-muted-foreground">Comprehensive online preparation</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {boostifyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-4 p-4 rounded-xl bg-secondary/50 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span><strong>Batch 01:</strong> 8:00 PM – 10:00/11:00 PM (LK), Mon – Fri</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span><strong>Batch 02:</strong> 2:30 PM – 4:30 PM (LK) / 7:00 PM – 9:00 PM (AU), Wed – Sun</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span><strong>Duration:</strong> 2 Weeks (25 Hours)</span>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full" asChild>
                <Link href="/signup">Enroll in Boostify Session</Link>
              </Button>
            </motion.div>

            {/* Physical Session Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 border-2 border-accent-2/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-accent-2/10">
                  <Users className="h-8 w-8 text-accent-2" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">PTE Physical Session</h3>
                  <p className="text-muted-foreground">Hybrid learning experience in Rajagiriya</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {physicalFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-4 p-4 rounded-xl bg-secondary/50 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-accent-2" />
                  <span><strong>Location:</strong> Janajaya Building, Rajagiriya</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-accent-2" />
                  <span><strong>Total Duration:</strong> 41 Hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FileText className="h-4 w-4 text-accent-2" />
                  <span>Includes online Boostify + physical classes</span>
                </div>
              </div>

              <Button variant="accent" size="lg" className="w-full bg-accent-2 hover:bg-accent-2/90" asChild>
                <Link href="/signup">Enroll in Physical Session</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center glass-card rounded-3xl p-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Ace Your PTE Exam?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Book a free consultation to discuss your goals and find the perfect course for you.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link href="/contact">
                Book a Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
