'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle,
  Clock,
  Globe,
  Star,
  Target,
  Users,
  Building,
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
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const heroImages = ['/1.png', '/2.png', '/3.png', '/4.png', '/5.png'];

const services = [
  {
    title: 'PTE, IELTS & CELPIP Training',
    description: 'Tailored courses to help you achieve your required scores and unlock study or migration opportunities abroad.',
    icon: Award,
  },
  {
    title: 'Corporate Training',
    description: 'Upskilling teams with language, communication, and motivation programs that drive efficiency and workplace standards.',
    icon: Briefcase,
  },
  {
    title: 'Student Visa & Migration Guidance',
    description: 'Comprehensive support for students planning to study abroad, including documentation, process guidance, and personalized advice.',
    icon: Globe,
  }
];

const whyChooseUs = [
  {
    title: 'Expert-Led Training',
    description: 'Our founder and lecturer panel are officially trained by Pearson UK and bring years of proven expertise in PTE, IELTS, and CELPIP.',
    icon: Users,
  },
  {
    title: 'Proven Success',
    description: 'With over 5,000 students trained, we have a track record of helping learners achieve their desired scores and career goals.',
    icon: CheckCircle,
  },
  {
    title: 'Smarter Exam Approach',
    description: 'We teach you smarter strategies to maximize your performance, manage time effectively, and approach tasks with confidence.',
    icon: Target,
  },
  {
    title: 'Always Up to Date',
    description: 'Our programs are constantly updated with the latest exam structures, formats, and industry changes, ensuring you are always ahead.',
    icon: Clock,
  },
  {
    title: 'Reviews that Speak for Themselves',
    description: 'Our students and clients consistently share their success stories—proof of the impact and dedication of our lecturer panel.',
    icon: Star,
  },
  {
    title: 'Well-Experienced Panel',
    description: 'Our lecturer team is highly qualified and experienced, combining global exposure with local insight to deliver the best training experience.',
    icon: Award,
  },
];

const founderExpertise = [
    'Competency Test Training: PTE, IELTS, CELPIP',
    'Corporate Language Development: Enhancing communication and professional skills in the workplace',
    'Skill-Building Workshops: Motivating staff to improve efficiency, standards, and performance',
    'Flexible Training Solutions: Offering both online and in-person programs tailored to learners’ needs'
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
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        <Carousel
          className="w-full h-full"
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {heroImages.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[60vh] md:h-[80vh]">
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex h-full items-center justify-center">
            <motion.div
                className="max-w-4xl mx-auto text-center p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={sectionVariants}
            >
                <motion.div variants={itemVariants('left')} className="flex justify-center mb-4">
                    <Image src="/logo.png" alt="Smart Labs Logo" width={256} height={256} className="h-64 w-64" />
                </motion.div>
                <motion.h1 variants={itemVariants('right')} className="text-4xl md:text-6xl font-headline font-bold text-white">
                    Smart Learning, Smarter Futures.
                </motion.h1>
                <motion.p variants={itemVariants('left')} className="mt-6 text-lg md:text-xl text-gray-200">
                    Expert training for PTE, IELTS & CELPIP | Corporate Language Training | Legal & Migration Support.
                </motion.p>
                <motion.div variants={itemVariants('right')} className="mt-8 flex gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link href="/courses">
                        Explore Our Programs <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
      </section>

      <motion.section 
        id="founder" 
        className="py-20 bg-amber-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto grid lg:grid-cols-5 gap-12 items-center">
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
                    Our Founder and Director, Lahiruka Weeraratne, known in the industry as Laheer, is a distinguished expert trainer officially trained by Pearson UK. She specializes in PTE, IELTS, and CELPIP exams—the essential pathways for students and professionals seeking to study, migrate, or settle abroad. With over 6 years of professional experience, she has successfully trained more than 5,000 students, empowering them to achieve their global aspirations. Her passion for education and innovation led to the creation of Smart Labs, a hub designed to provide a smarter and more effective approach to language learning.
                </p>
                <div className="mt-8">
                  <h3 className="font-headline font-semibold text-xl mb-4">Her Role at Smart Labs</h3>
                   <ul className="space-y-3">
                    {founderExpertise.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
            </motion.div>
        </div>
      </motion.section>

      <motion.section 
        id="about" 
        className="py-20 md:py-28 bg-sky-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants('right')} className="relative h-80 md:h-full rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/ab.png"
              alt="Smart Labs training center"
              fill
              className="object-cover"
            />
          </motion.div>
           <motion.div variants={itemVariants('left')} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">About Smart Labs</h2>
            <p className="text-muted-foreground">
              Smart Labs is a premier training institute founded with the vision of creating a smarter, more effective way of learning languages and competency tests. With over 6 years of experience and more than 5,000 successful students, Smart Labs has become a trusted name for PTE, IELTS, CELPIP training, and corporate language development.
            </p>
             <Card className="bg-background/50">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="italic text-muted-foreground">"To create a smarter world of learning by becoming the leading hub for language mastery and corporate training, empowering individuals and organizations to achieve growth, confidence, and global success."</p>
                </CardContent>
             </Card>
             <Card className="bg-background/50">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="italic text-muted-foreground">"At Smart Labs, our mission is to provide innovative and practical learning solutions that enhance communication, build professional skills, and inspire continuous improvement. Through expert guidance, modern strategies, and a learner-centered approach, we help students and professionals unlock their potential and thrive in a competitive world."</p>
                </CardContent>
             </Card>
          </motion.div>
        </div>
      </motion.section>
      
      <motion.section 
        id="services" 
        className="py-20 bg-amber-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-headline font-bold mb-4">
            Our Services
          </h2>
           <div className="grid md:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => {
                const Icon = service.icon;
                return (
                    <motion.div key={service.title} variants={itemVariants(index % 2 === 0 ? 'left' : 'right')}>
                        <Card className="text-center hover:shadow-lg transition-shadow p-6 h-full">
                          <div className="mx-auto bg-primary/20 text-primary p-4 rounded-full w-fit mb-4">
                            <Icon className="h-8 w-8" />
                          </div>
                          <CardTitle className="font-headline pt-2 text-xl">{service.title}</CardTitle>
                          <CardContent className="pt-4">
                            <p className="text-muted-foreground">{service.description}</p>
                          </CardContent>
                        </Card>
                    </motion.div>
                );
            })}
          </div>
           <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/courses">Explore Our Programs</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="why-choose-us" 
        className="py-20 bg-sky-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            Why Choose Smart Labs?
          </h2>
          <p className="max-w-3xl mx-auto text-center text-muted-foreground mb-12">
            At Smart Labs, we don’t just teach – we transform the way you learn. Here’s why thousands of students and professionals trust us:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => {
              const Icon = feature.icon;
              return (
                 <motion.div key={feature.title} variants={itemVariants(index % 2 === 0 ? 'right' : 'left')}>
                     <Card className="text-left p-6 flex gap-4 items-start h-full">
                        <div className="text-primary pt-1">
                            <Icon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-headline text-lg font-semibold">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{feature.description}</p>
                        </div>
                     </Card>
                 </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>
      
      <motion.section 
        id="testimonials" 
        className="py-20 bg-amber-200"
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
                        {testimonial.course}
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
        id="location" 
        className="py-20 bg-sky-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
            <motion.div variants={itemVariants('left')} className="mx-auto bg-primary/20 text-primary p-4 rounded-full w-fit mb-4">
                <Building className="h-10 w-10" />
            </motion.div>
            <motion.h2 variants={itemVariants('right')} className="text-3xl font-headline font-bold mb-4">Visit Us</motion.h2>
            <motion.p variants={itemVariants('left')} className="max-w-2xl mx-auto text-muted-foreground">
                Our permanent office and training center, located at 3rd Floor, No. 326, Jana Jaya Building, Rajagiriya, Colombo 05, is a professional space where students can access consultations, personalized guidance, and classes in a focused environment.
            </motion.p>
            <motion.div variants={itemVariants('right')} className="mt-8">
                <Button asChild>
                    <Link href="/contact">Get Directions</Link>
                </Button>
            </motion.div>
        </div>
      </motion.section>

    </div>
  );
}
