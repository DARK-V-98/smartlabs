
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle, Video } from 'lucide-react';
import Link from 'next/link';

export default function CELPIPPage() {
  return (
    <div className="w-full">
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-primary/10">
            <Image 
                src="https://picsum.photos/seed/celpip-hero/1600/500"
                alt="Canadian flag and cityscape"
                data-ai-hint="Canada cityscape"
                fill
                className="object-cover opacity-20"
            />
        </div>
        <div className="container mx-auto relative text-center">
            <h1 className="text-3xl md:text-5xl font-headline font-bold">CELPIP Preparation Course</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Your key to Canadian immigration, PR, and citizenship applications.
            </p>
        </div>
      </section>
      
      <section className="py-12 md:py-20">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div className="prose lg:prose-lg max-w-none">
                <h2 className="font-headline">About the CELPIP Test</h2>
                <p>CELPIP (Canadian English Language Proficiency Index Program) is an English language test used for immigration, PR, and citizenship applications in Canada. Preparing for the CELPIP test involves improving everyday English communication skills — not just grammar or theory. The test focuses on how well you can understand and respond naturally in real-life situations.</p>
                <h3 className="font-headline">Key Focus Areas:</h3>
                <ul>
                    <li><strong>Listening:</strong> Understanding conversations, announcements, and everyday discussions.</li>
                    <li><strong>Reading:</strong> Interpreting emails, notices, articles, and similar written materials.</li>
                    <li><strong>Writing:</strong> Structuring clear responses for emails and opinion-based questions.</li>
                    <li><strong>Speaking:</strong> Responding confidently to recorded prompts, expressing ideas clearly and naturally.</li>
                </ul>
            </div>
            
             <div className="space-y-8">
                  <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline">CELPIP Self-Paced Program</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">Key Features:</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start"><Video className="h-4 w-4 mr-2 mt-0.5 text-primary" />Introductory guidance video</li>
                                <li className="flex items-start"><Video className="h-4 w-4 mr-2 mt-0.5 text-primary" />Writing component training video</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-2 mt-4">Preparation Tips:</h4>
                             <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />Practice speaking in English every day — focus on clarity and natural flow.</li>
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />Learn to manage your time during each section.</li>
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />Use official CELPIP practice materials for familiarity with the format.</li>
                                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />Practice real-life scenarios like workplace conversations, emails, and discussions.</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="/contact">Get CELPIP Resources</Link>
                        </Button>
                    </CardFooter>
                  </Card>
             </div>
          </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-headline font-bold">Your Pathway to Canada Starts Here</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Our CELPIP resources are designed to improve your confidence and fluency. Contact us to get started.
            </p>
            <Button asChild size="lg" className="mt-6">
                <Link href="/contact">Book a Free Consultation</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
