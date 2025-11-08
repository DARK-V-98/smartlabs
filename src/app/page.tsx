
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    title: 'Expert Trainers',
    description: 'Trainers officially trained by Pearson UK.',
    icon: Users,
  },
  {
    title: 'Proven Track Record',
    description: '5,000+ students guided across PTE / IELTS / CELPIP.',
    icon: CheckCircle,
  },
  {
    title: 'Personalized Guidance',
    description: 'Consistent personal feedback and guidance.',
    icon: Star,
  },
  {
    title: 'Flexible Learning',
    description: 'Online and physical class options available.',
    icon: Globe,
  },
   {
    title: 'Continuous Support',
    description: 'Updated learning materials and continuous support.',
    icon: BookCheck,
  },
];

const results = [
    { number: '5,000+', label: 'Students Trained' },
    { number: 'Online & Physical', label: 'Class Options' },
    { number: 'Available', label: 'Live Class Recordings' },
];

const testimonials = [
    { image: 'https://picsum.photos/300/150?random=10' },
    { image: 'https://picsum.photos/300/150?random=11' },
    { image: 'https://picsum.photos/300/150?random=12' },
     { image: 'https://picsum.photos/300/150?random=13' },
    { image: 'https://picsum.photos/300/150?random=14' },
    { image: 'https://picsum.photos/300/150?random=15' },
];


const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = (from: 'left' | 'right' | 'top' | 'bottom') => ({
  hidden: {
    opacity: 0,
    x: from === 'left' ? -50 : from === 'right' ? 50 : 0,
    y: from === 'top' ? -50 : from === 'bottom' ? 50 : 0,
  },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5 } },
});

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <section className="relative h-[70vh] md:h-[80vh] w-full">
         <Carousel
            className="w-full h-full"
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
            opts={{ loop: true }}
        >
            <CarouselContent className="-ml-0 h-full">
            {heroImages.map((image, index) => (
                <CarouselItem key={image.src} className="pl-0 h-full">
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
                viewport={{ once: true, amount: 0.5 }}
                variants={sectionVariants}
            >
                <motion.h1 variants={itemVariants('right')} className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-white">
                    Achieve Your Target Score with the Right Guidance.
                </motion.h1>
                <motion.p variants={itemVariants('left')} className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200">
                    PTE, IELTS & CELPIP Training | Corporate English & Workplace Communication Workshops
                </motion.p>
                <motion.div variants={itemVariants('right')} className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link href="/contact">
                            Book a Free Consultation <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
      </section>

      <motion.section 
        id="founder" 
        className="py-12 md:py-20 bg-sky-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto grid lg:grid-cols-5 gap-8 md:gap-12 items-center">
            <motion.div className="lg:col-span-2" variants={itemVariants('left')}>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mx-auto max-w-sm lg:max-w-none">
                    <Image
                      src="/la.png"
                      alt="Lahiruka Weeraratne (Laheer) - Founder of Smart Labs"
                      fill
                      className="object-cover"
                    />
                </div>
            </motion.div>
            <motion.div className="lg:col-span-3" variants={itemVariants('right')}>
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
      
       <motion.section 
        id="results" 
        className="py-12 bg-amber-400"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {results.map((result, index) => {
                return (
                     <motion.div key={result.label} variants={itemVariants('bottom')}>
                        <div>
                            <p className="text-3xl md:text-4xl font-headline font-bold">{result.number}</p>
                            <p className="text-muted-foreground mt-2">{result.label}</p>
                        </div>
                    </motion.div>
                )
            })}
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="services" 
        className="py-12 md:py-20 bg-sky-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
          <motion.h2 variants={itemVariants('bottom')} className="text-3xl font-headline font-bold mb-12">
            Our Services
          </motion.h2>
           <div className="grid md:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => {
                const Icon = service.icon;
                return (
                    <motion.div key={service.title} variants={itemVariants(index === 0 ? 'left' : index === 1 ? 'bottom' : 'right')}>
                        <Card className="text-center hover:shadow-lg transition-shadow p-6 h-full flex flex-col items-center">
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

      <motion.section 
        id="why-choose-us" 
        className="py-12 md:py-20 bg-amber-400"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <motion.h2 variants={itemVariants('bottom')} className="text-3xl font-headline font-bold text-center mb-12">
            Why Choose Smart Labs?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {whyChooseUs.map((feature, index) => {
              const Icon = feature.icon;
              return (
                 <motion.div key={feature.title} variants={itemVariants('bottom')}>
                     <Card className="text-center p-6 flex flex-col items-center h-full">
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

       <motion.section 
        id="corporate-training" 
        className="py-12 md:py-20 bg-sky-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div variants={itemVariants('left')}>
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
            <motion.div variants={itemVariants('right')}>
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
      
       <section className="py-12 md:py-20 bg-amber-400">
        <div className="container mx-auto">
          <div className="text-center bg-sky-100 p-8 md:p-10 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">Ready to Start Your Score Journey?</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground mb-6">
                Talk to one of our certified trainers to find the perfect program for you. Your initial consultation is free.
            </p>
            <Button asChild size="lg">
                <Link href="/contact">Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <motion.section 
        id="testimonials" 
        className="py-12 md:py-20 bg-sky-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <motion.h2 variants={itemVariants('bottom')} className="text-3xl font-headline font-bold text-center mb-12">
            What Our Students Say
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants('bottom')}>
                <Card className="overflow-hidden">
                    <div className="relative aspect-video">
                        <Image src={testimonial.image} alt={`Testimonial screenshot ${index + 1}`} data-ai-hint="student testimonial" fill className="object-cover" />
                    </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
