
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function IELTSPage() {
  return (
    <div className="w-full">
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-primary/10">
            <Image 
                src="https://picsum.photos/seed/ielts-hero/1600/500"
                alt="Student taking IELTS exam"
                data-ai-hint="student exam"
                fill
                className="object-cover opacity-20"
            />
        </div>
        <div className="container mx-auto relative text-center">
            <h1 className="text-3xl md:text-5xl font-headline font-bold">IELTS Preparation Course</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Achieve your target band score with our comprehensive IELTS training.
            </p>
        </div>
      </section>
      
      <section className="py-12 md:py-20">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div className="prose lg:prose-lg max-w-none">
                <h2 className="font-headline">About IELTS Preparation</h2>
                <p>IELTS preparation focuses on helping students build the skills needed to perform confidently in the four test components: Listening, Reading, Writing, and Speaking. The process includes understanding the exam format, learning time management strategies, improving vocabulary and grammar, and practicing with real test-style questions.</p>
                <p>Students are guided to structure essays effectively, speak clearly and fluently, and approach reading and listening tasks with the right techniques. Regular mock tests and feedback help students track progress and become fully prepared to achieve their target band score.</p>
            </div>
            
             <div className="space-y-8">
                  <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline">IELTS Weekend Group Class</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">Key Features:</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />AI scoring practice</li>
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />Individual feedback</li>
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />Speaking practice included</li>
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />Vocabulary development support</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-2 mt-4">Schedule & Fee:</h4>
                             <div className="border rounded-lg p-3 text-sm">
                                <p className="font-bold">Every Saturday & Sunday</p>
                                <p className="text-muted-foreground">11.30 a.m – 1.30 p.m</p>
                                <p className="font-medium mt-2">Fee: LKR 30,000</p>
                                <p className="text-xs text-muted-foreground">Location: Rajagiriya</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="/contact">Enroll in IELTS Class</Link>
                        </Button>
                    </CardFooter>
                  </Card>
             </div>
          </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-headline font-bold">Ready to Start Your IELTS Journey?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Our focused training is designed to help you succeed. Book a free consultation to learn more.
            </p>
            <Button asChild size="lg" className="mt-6">
                <Link href="/contact">Book a Free Consultation</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
