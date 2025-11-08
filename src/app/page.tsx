
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle,
  Globe,
  Star,
  Target,
  Users,
  BookCheck,
  TrendingUp,
  Goal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from '@/lib/constants';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const heroImages = ['/1.png', '/2.png', '/3.png', '/4.png', '/5.png'];

const services = [
  {
    title: 'Test Preparation',
    description: 'Expert-led classes for PTE, IELTS, and CELPIP with personalized feedback and proven strategies to help you succeed.',
    icon: Award,
    href: '/courses',
  },
  {
    title: 'Corporate Training',
    description: 'Customized communication and language training programs designed to enhance team performance and professionalism.',
    icon: Briefcase,
    href: '/corporate-training',
  },
  {
    title: 'Study & Migration Support',
    description: 'Comprehensive guidance through your study visa or migration process, including documentation and consultation.',
    icon: Globe,
    href: '/contact',
  },
];

const whyChooseUs = [
  {
    title: 'Certified Trainers',
    description: 'Our instructors are officially trained and certified by Pearson UK, ensuring the highest quality of education.',
    icon: Users,
  },
  {
    title: '5,000+ Students Guided',
    description: 'We have a proven track record of successfully guiding thousands of students to achieve their academic and professional goals.',
    icon: CheckCircle,
  },
  {
    title: 'Strategic Focus',
    description: 'We emphasize strategy, time management, and confidence-building to maximize your performance on exam day.',
    icon: Target,
  },
  {
    title: 'Personal Feedback',
    description: 'Benefit from individual speaking practice sessions and personalized feedback to target your specific areas for improvement.',
    icon: Star,
  },
];

const results = [
    { number: '5,000+', label: 'Students Trained', icon: Users },
    { number: '15+', label: 'Average Score Improvement', icon: TrendingUp },
    { number: '95%', label: 'Success Rate in 6-8 Weeks', icon: Goal },
];

const successStories = [
    { text: "Achieved PTE 79 in 6 weeks → Now studying in Australia." },
    { text: "IELTS Band 8 achieved → Migration visa approved." },
    { text: "CELPIP score secured → Canadian PR application successful." },
    { text: "Scored 90 on PTE after 2 weeks of intensive coaching." },
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

const itemVariants = (from: 'left' | 'right') => ({
  hidden: { opacity: 0, x: from === 'left' ? -50 : 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
});

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <section className="relative h-[80vh] md:h-[90vh] w-full">
        <Carousel
          className="w-full h-full"
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {heroImages.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[80vh] md:h-[90vh]">
                  <Image
                    src={src}
                    alt={`Hero image ${index + 1}`}
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
                <motion.div variants={itemVariants('left')} className="flex justify-center mb-4">
                    <Image src="/logo.png" alt="Smart Labs Logo" width={500} height={500} className="w-48 h-48 sm:w-64 sm:h-64" />
                </motion.div>
                <motion.h1 variants={itemVariants('right')} className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-white">
                    Achieve your target score with proven strategies, personal coaching, and guided practice.
                </motion.h1>
                <motion.p variants={itemVariants('left')} className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200">
                    PTE | IELTS | CELPIP Training by Certified Trainers.
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
        id="results" 
        className="py-12 md:py-20 bg-sky-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result, index) => {
                const Icon = result.icon;
                return (
                     <motion.div key={result.label} variants={itemVariants(index % 2 === 0 ? 'left' : 'right')}>
                        <Card className="text-center p-6">
                             <div className="mx-auto bg-primary/20 text-primary p-4 rounded-full w-fit mb-4">
                                <Icon className="h-8 w-8" />
                            </div>
                            <p className="text-4xl font-headline font-bold">{result.number}</p>
                            <p className="text-muted-foreground mt-2">{result.label}</p>
                        </Card>
                    </motion.div>
                )
            })}
          </div>
        </div>
      </motion.section>

       <motion.section 
        id="success-stories" 
        className="py-12 bg-amber-400"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
             <Carousel 
                className="w-full max-w-4xl mx-auto"
                plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
             >
                <CarouselContent>
                    {successStories.map((story, index) => (
                        <CarouselItem key={index}>
                            <div className="text-center">
                                <p className="text-lg md:text-xl font-semibold italic">"{story.text}"</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
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
          <h2 className="text-3xl font-headline font-bold mb-12">
            Our Services
          </h2>
           <div className="grid md:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => {
                const Icon = service.icon;
                return (
                    <motion.div key={service.title} variants={itemVariants(index % 2 === 0 ? 'left' : 'right')}>
                        <Card className="text-center hover:shadow-lg transition-shadow p-6 h-full flex flex-col items-center">
                          <div className="mx-auto bg-primary/20 text-primary p-4 rounded-full w-fit mb-4">
                            <Icon className="h-8 w-8" />
                          </div>
                          <CardTitle className="font-headline pt-2 text-xl">{service.title}</CardTitle>
                          <CardContent className="pt-4 flex-grow">
                            <p className="text-muted-foreground">{service.description}</p>
                          </CardContent>
                           <Button asChild variant="outline" className="mt-auto">
                              <Link href={service.href}>Learn More</Link>
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
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            Why Choose Smart Labs?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => {
              const Icon = feature.icon;
              return (
                 <motion.div key={feature.title} variants={itemVariants(index % 2 === 0 ? 'right' : 'left')}>
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
      
       <section className="py-12 md:py-20 bg-sky-200">
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
        className="py-12 md:py-20 bg-amber-400"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            What Our Students Say
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} variants={itemVariants(index === 1 ? 'left' : 'right')}>
                <Card className="flex flex-col h-full">
                  <CardContent className="pt-6 flex-grow">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="italic">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardHeader className="flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.course} - {testimonial.achievement}
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="founder" 
        className="py-12 md:py-20 bg-sky-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto grid lg:grid-cols-5 gap-8 md:gap-12 items-center">
            <motion.div variants={itemVariants('left')} className="lg:col-span-2">
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mx-auto max-w-sm lg:max-w-none">
                    <Image
                      src="/la.png"
                      alt="Lahiruka Weeraratne (Laheer) - Founder of Smart Labs"
                      width={600}
                      height={600}
                      className="object-cover"
                    />
                </div>
            </motion.div>
            <motion.div variants={itemVariants('right')} className="lg:col-span-3">
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

    </div>
  );
}
