
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle,
  Globe,
  Star,
  BookCheck,
  Users,
  Target,
  Heart,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const heroImages = [
    { src: '/1.png', alt: 'Students learning in a classroom', 'data-ai-hint': 'students classroom' },
    { src: '/2.png', alt: 'Student focused on learning material', 'data-ai-hint': 'student learning' },
    { src: '/3.png', alt: 'Collaborative learning session', 'data-ai-hint': 'students collaborating' },
    { src: '/4.png', alt: 'Teacher assisting a student', 'data-ai-hint': 'teacher student' },
    { src: '/5.png', alt: 'Modern classroom environment', 'data-ai-hint': 'modern classroom' },
];

const services = [
  {
    title: 'PTE Training Programs',
    description: 'Online Boostify classes + Physical weekend sessions.',
    icon: Award,
    href: '/pte',
  },
  {
    title: 'IELTS Training',
    description: 'Weekend group classes with speaking and feedback support.',
    icon: Award,
    href: '/ielts',
  },
  {
    title: 'CELPIP Preparation',
    description: 'Self-paced practice with guided videos.',
    icon: Award,
    href: '/celpip',
  },
];

const whyChooseUs = [
  {
    title: 'Certified Trainers',
    description: 'Trainers directly trained under Pearson UK.',
    icon: Award,
  },
  {
    title: '5,000+ Students Guided',
    description: 'A proven track record of success across all courses.',
    icon: Users,
  },
  {
    title: 'Strategic Focus',
    description: 'Emphasis on strategy, time management, and confidence.',
    icon: Target,
  },
  {
    title: 'Personal Feedback',
    description: 'Individual speaking practice and personal feedback.',
    icon: Heart,
  },
   {
    title: 'Flexible & Updated',
    description: 'Online/physical classes with current materials.',
    icon: BookOpen,
  },
];

const results = [
    { number: '5,000+', label: 'Students Trained' },
    { number: '95%', label: 'Success Rate' },
    { number: '6-8 Weeks', label: 'Typical Target Achievement' },
];

const successStories = [
    { text: "Achieved PTE 79 in 6 weeks -> Now studying in Australia." },
    { text: "IELTS Band 8 achieved -> Migration visa approved for Canada." },
    { text: "CELPIP Level 10 -> Permanent Residency secured." },
    { text: "From Band 6.5 to 7.5 in IELTS Writing in one month." },
];

const testimonials = [
    {
        image: 'https://picsum.photos/300/150?random=10',
        name: 'Rochelle T.',
        course: 'PTE Academic',
        achievement: 'Achieved 79+ Overall',
        quote: 'The strategies were spot on. I finally got the score I needed for my visa!'
    },
    {
        image: 'https://picsum.photos/300/150?random=11',
        name: 'Sahan P.',
        course: 'IELTS General',
        achievement: 'Scored Band 8.0',
        quote: 'The individual feedback on my speaking made all the difference.'
    },
    {
        image: 'https://picsum.photos/300/150?random=12',
        name: 'Fathima S.',
        course: 'PTE Academic',
        achievement: 'From 58 to 75 in 4 Weeks',
        quote: 'Smart Labs helped me understand my mistakes and improve quickly.'
    },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden bg-background text-foreground">
      <section className="relative h-[80vh] md:h-[90vh] w-full">
         <Carousel
            className="w-full h-full"
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
            opts={{ loop: true }}
        >
            <CarouselContent className="-ml-0 h-full">
            {heroImages.map((image, index) => (
                <CarouselItem key={index} className="pl-0 h-full">
                <div className="relative w-full h-full">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        data-ai-hint={image['data-ai-hint']}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 z-10 flex h-full items-center justify-center">
            <motion.div
                className="max-w-4xl mx-auto text-center p-4 sm:p-8 flex flex-col items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                variants={sectionVariants}
            >
                <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-white">
                    Achieve Your Target Score with the Right Guidance.
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200">
                    PTE, IELTS & CELPIP Training | Corporate English & Workplace Communication Workshops
                </motion.p>
                <motion.div variants={itemVariants} className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                    <Button asChild size="lg">
                        <Link href="/contact">
                            Book a Free Consultation <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <motion.section 
        id="founder" 
        className="py-16 md:py-24 bg-sky-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto grid lg:grid-cols-5 gap-8 md:gap-12 items-center">
            <motion.div className="lg:col-span-2" variants={itemVariants}>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl mx-auto max-w-sm lg:max-w-none">
                    <Image
                      src="/la.png"
                      alt="Lahiruka Weeraratne (Laheer) - Founder of Smart Labs"
                      fill
                      className="object-cover"
                    />
                </div>
            </motion.div>
            <motion.div className="lg:col-span-3" variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Founder – Lahiruka Weeraratne (Laheer)</h2>
                <p className="mt-4 text-muted-foreground">
                    Our Founder and Director, Lahiruka Weeraratne, known in the industry as Laheer, is a distinguished expert trainer officially trained by Pearson UK. She specializes in PTE, IELTS, and CELPIP exams—the essential pathways for students and professionals seeking to study, migrate, or settle abroad. With over 6 years of professional experience, she has successfully trained more than 5,000 students, empowering them to achieve their global aspirations.
                </p>
                <div className="mt-8">
                  <h3 className="font-headline font-semibold text-xl mb-4">Areas of Expertise</h3>
                   <ul className="space-y-3">
                      <li className="flex items-start">
                        <BookCheck className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">Competency Test Training: PTE, IELTS, CELPIP</span>
                      </li>
                       <li className="flex items-start">
                        <Briefcase className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">Corporate Language & Communication Development</span>
                      </li>
                       <li className="flex items-start">
                        <Globe className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">Study Abroad & Migration Guidance</span>
                      </li>
                  </ul>
                </div>
            </motion.div>
        </div>
      </motion.section>
      
      {/* Results Snapshot Section */}
      <motion.section 
        id="results" 
        className="py-12 bg-amber-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {results.map((result) => (
              <motion.div key={result.label} variants={itemVariants}>
                <div>
                  <p className="text-4xl md:text-5xl font-headline font-bold text-amber-800">{result.number}</p>
                  <p className="text-amber-700 mt-2 uppercase tracking-widest text-sm">{result.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        id="services" 
        className="py-16 md:py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
          <motion.h2 variants={itemVariants} className="text-3xl font-headline font-bold mb-12">
            Our Services
          </motion.h2>
           <div className="grid md:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => {
                const Icon = service.icon;
                return (
                    <motion.div key={service.title} variants={itemVariants}>
                        <Card className="text-center hover:shadow-xl transition-shadow h-full flex flex-col items-center p-6">
                          <div className="p-4 bg-secondary rounded-full mb-4">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          <CardTitle className="font-headline pt-2 text-xl">{service.title}</CardTitle>
                          <CardContent className="pt-4 flex-grow">
                            <p className="text-muted-foreground">{service.description}</p>
                          </CardContent>
                           <Button asChild variant="outline" className="mt-auto">
                              <Link href={service.href}>View Course Details</Link>
                           </Button>
                        </Card>
                    </motion.div>
                );
            })}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section 
        id="why-choose-us" 
        className="py-16 md:py-24 bg-sky-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <motion.h2 variants={itemVariants} className="text-3xl font-headline font-bold text-center mb-12">
            Why Choose Smart Labs?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {whyChooseUs.map((feature) => {
              const Icon = feature.icon;
              return (
                 <motion.div key={feature.title} variants={itemVariants}>
                     <Card className="text-center p-6 flex flex-col items-center h-full hover:shadow-xl transition-shadow">
                        <div className="text-primary mb-4">
                            <Icon className="h-10 w-10" />
                        </div>
                        <div>
                            <h3 className="font-headline text-lg font-semibold">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm mt-2">{feature.description}</p>
                        </div>
                     </Card>
                 </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Success Stories Carousel */}
      <motion.section
        id="success-stories"
        className="py-16 md:py-24 bg-amber-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
            <motion.h2 variants={itemVariants} className="text-3xl font-headline font-bold text-center mb-12 text-amber-800">
                Student Success Stories
            </motion.h2>
            <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
                className="w-full"
            >
                <CarouselContent>
                    {successStories.map((story, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="bg-white/80 backdrop-blur-sm">
                                    <CardContent className="flex items-center justify-center p-6 h-24">
                                        <p className="text-center font-medium text-amber-900">{story.text}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    </motion.section>

      {/* Corporate Training Section */}
       <motion.section 
        id="corporate-training" 
        className="py-16 md:py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div variants={itemVariants}>
                 <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mx-auto max-w-lg lg:max-w-none">
                    <Image
                      src="https://picsum.photos/seed/corporate/800/450"
                      alt="Corporate training session"
                      data-ai-hint="corporate training"
                      fill
                      className="object-cover"
                    />
                </div>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Your Goals, Our Expertise — Custom Workshops for Your Team.</h2>
                <ul className="space-y-3 mt-6">
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">Upgrade English for workplace communication</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">Professional etiquette and confidence development</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">Practical use of AI tools for productivity</span>
                    </li>
                     <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">Post-training evaluation and feedback reports</span>
                    </li>
                </ul>
                <Button asChild size="lg" className="mt-8">
                    <Link href="/corporate-training">Request Corporate Training Proposal</Link>
                </Button>
            </motion.div>
        </div>
      </motion.section>
      
      {/* CTA Section */}
       <section className="py-16 md:py-24 bg-sky-200">
        <div className="container mx-auto">
          <motion.div 
            className="text-center bg-card p-8 md:p-12 rounded-lg border"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">Ready to Start Your Score Journey?</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground mb-6">
                Talk to one of our certified trainers to find the perfect program for you. Your initial consultation is free.
            </p>
            <Button asChild size="lg">
                <Link href="/contact">Book a Free Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <motion.section 
        id="testimonials" 
        className="py-16 md:py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <motion.h2 variants={itemVariants} className="text-3xl font-headline font-bold text-center mb-12">
            What Our Students Say
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-video">
                        <Image src={testimonial.image} alt={`Testimonial for ${testimonial.name}`} data-ai-hint="student testimonial" fill className="object-cover" />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                        <p className="text-muted-foreground text-sm mb-4 flex-grow italic">"{testimonial.quote}"</p>
                        <div>
                            <p className="font-bold font-headline">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.course}</p>
                            <Badge className="mt-2">{testimonial.achievement}</Badge>
                        </div>
                    </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
