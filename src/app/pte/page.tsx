
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function PTEPage() {
  return (
    <div className="w-full">
      <section className="relative bg-sky-200 py-20 md:py-32">
        <div className="absolute inset-0">
            <Image 
                src="https://picsum.photos/seed/pte-hero/1600/500"
                alt="Student studying for PTE exam"
                data-ai-hint="student studying exam"
                fill
                className="object-cover opacity-20"
            />
        </div>
        <div className="container mx-auto relative text-center">
            <h1 className="text-3xl md:text-5xl font-headline font-bold">PTE Preparation Course</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Master the Pearson Test of English with expert strategies and personalized feedback.
            </p>
        </div>
      </section>
      
      <section className="py-12 md:py-20">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div className="prose lg:prose-lg max-w-none">
                <h2 className="font-headline">About the PTE Exam</h2>
                <p>PTE (Pearson Test of English) Academic is an English language test used for study, work, and migration purposes. Preparing for PTE focuses on building strong communication skills and understanding the exam format. The test covers four main areas: Speaking, Writing, Reading, and Listening.</p>
                <p>PTE preparation helps students improve:</p>
                <ul>
                    <li>Fluency and pronunciation for speaking clearly and confidently</li>
                    <li>Grammar and structure for writing well-organized responses</li>
                    <li>Reading skills to understand texts quickly and accurately</li>
                    <li>Listening skills to follow different accents and speech patterns</li>
                </ul>
                <p>Training includes practice with real exam-style questions, time management techniques, and regular feedback to help students improve where needed. With proper guidance and consistent practice, students can achieve their target scores effectively.</p>
            </div>
            
             <div className="space-y-8">
                  <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline">PTE Online – Boostify Session</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">Key Features:</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />AI scoring practice</li>
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />Full Google Drive access with updated materials</li>
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />Live class recordings available for 2 months</li>
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />Individual feedback on difficult question types</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-2 mt-4">Batch Options:</h4>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="border rounded-lg p-3 text-sm">
                                    <p className="font-bold">Batch 01</p>
                                    <p className="text-muted-foreground">8.00 p.m – 10.00/11.00 p.m (LK)</p>
                                    <p className="text-muted-foreground">Monday – Friday</p>
                                    <p className="font-medium">2 Weeks | 25 Hours</p>
                                </div>
                                <div className="border rounded-lg p-3 text-sm">
                                    <p className="font-bold">Batch 02</p>
                                    <p className="text-muted-foreground">2.30 p.m – 4.30 p.m (LK)</p>
                                    <p className="text-muted-foreground">7.00 p.m – 9.00/9.30 p.m (AU)</p>
                                    <p className="text-muted-foreground">Wednesday – Sunday</p>
                                    <p className="font-medium">2 Weeks | 25 Hours</p>
                                </div>
                             </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="/contact">Enroll in Boostify Session</Link>
                        </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline">PTE Physical Session (Rajagiriya)</CardTitle>
                        <CardDescription>A comprehensive hybrid learning experience.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p className="font-semibold">Includes:</p>
                        <ul className="list-disc pl-5 text-muted-foreground">
                            <li>16 hours physical class sessions</li>
                            <li>25 hours online Boostify session</li>
                            <li className="font-bold">Total: 41 hours combined</li>
                        </ul>
                         <p className="font-semibold mt-4">Schedule:</p>
                        <ul className="list-disc pl-5 text-muted-foreground">
                            <li><span className="font-medium text-foreground">Online:</span> Mon–Fri | 8.00 p.m – 10.00 p.m (20 Hrs)</li>
                            <li><span className="font-medium text-foreground">Boostify:</span> Reading Boostify Session (5 Hrs)</li>
                            <li><span className="font-medium text-foreground">Physical:</span> Sat & Sun | 8.30 a.m – 10.30 a.m (16 Hrs/month)</li>
                        </ul>
                        <p className="text-xs text-muted-foreground mt-2">Location: Janajaya Building, Rajagiriya</p>
                    </CardContent>
                    <CardFooter>
                         <Button asChild className="w-full">
                            <Link href="/contact">Enroll in Physical Session</Link>
                        </Button>
                    </CardFooter>
                  </Card>
             </div>
          </div>
      </section>

      <section className="bg-amber-400 py-12 md:py-20">
        <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-headline font-bold">Ready to Ace Your PTE Exam?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Join our expert-led classes and get the score you need. Book a free consultation to discuss your goals with a trainer.
            </p>
            <Button asChild size="lg" className="mt-6">
                <Link href="/contact">Book a Free Consultation</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}

    