
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Globe, Users, Briefcase, BookCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="w-full">
       <section className="relative bg-amber-400 py-20 md:py-32">
        <div className="absolute inset-0">
            <Image 
                src="https://picsum.photos/seed/about-hero/1600/500"
                alt="Smart Labs office interior"
                data-ai-hint="modern office"
                fill
                className="object-cover opacity-20"
            />
        </div>
        <div className="container mx-auto relative text-center">
            <h1 className="text-3xl md:text-5xl font-headline font-bold">About Smart Labs</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Your trusted partner in language proficiency and professional development.
            </p>
        </div>
      </section>
      
      <section 
        id="founder" 
        className="py-12 md:py-20 bg-sky-200"
      >
        <div className="container mx-auto grid lg:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-2">
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mx-auto max-w-sm lg:max-w-none">
                    <Image
                      src="/la.png"
                      alt="Lahiruka Weeraratne (Laheer) - Founder of Smart Labs"
                      fill
                      className="object-cover"
                    />
                </div>
            </div>
            <div className="lg:col-span-3">
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
            </div>
        </div>
      </section>
      
       <section className="bg-amber-400 py-12 md:py-20">
        <div className="container mx-auto">
          <div className="text-center bg-sky-100 p-8 md:p-12 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">Join Our Community</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground mb-6">
                Ready to take the next step in your journey? Talk to one of our certified trainers to find the perfect program for you.
            </p>
            <Button asChild size="lg">
                <Link href="/contact">Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

    