
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const corporateFeatures = [
    { text: 'Upgrade English for workplace communication' },
    { text: 'Professional etiquette and confidence development' },
    { text: 'Practical use of AI tools for productivity' },
    { text: 'Post-training evaluation and feedback reports' },
];

export default function CorporateTrainingPage() {
  return (
    <div className="w-full">
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-primary/10">
            <Image 
                src="https://picsum.photos/seed/corp-hero/1600/500"
                alt="Professional team in a meeting"
                data-ai-hint="professional meeting"
                fill
                className="object-cover opacity-20"
            />
        </div>
        <div className="container mx-auto relative text-center">
            <h1 className="text-3xl md:text-5xl font-headline font-bold">Corporate Training</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Empowering Teams, Elevating Organizations
            </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
          <div className="container mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">Your Goals, Our Expertise — Custom Workshops for Your Team.</h2>
              <p className="text-muted-foreground mb-6">
                At Smart Labs, we believe that effective communication and professional skills are the backbone of any successful organization. Our corporate training programs are designed to bridge skill gaps, enhance workplace efficiency, and foster a culture of continuous learning.
              </p>
              <p className="text-muted-foreground">
                  No two organizations are the same. That’s why our programs are fully customized based on a Skill Gap Analysis, your Organizational Culture, and your Business Goals. This approach ensures that every session is relevant, practical, and impactful.
              </p>
            </div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Key Training Areas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {corporateFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground">{feature.text}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
          </div>
      </section>
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto">
          <div className="text-center bg-card p-8 md:p-12 rounded-lg shadow-lg border">
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">Partner with Smart Labs</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground mb-6">
                Investing in your team’s communication and professional skills is investing in your company’s future growth and success. Let Smart Labs help you create a high-performing, confident, and collaborative workforce.
            </p>
            <Button asChild size="lg">
                <Link href="/contact">Request Corporate Training Proposal</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
