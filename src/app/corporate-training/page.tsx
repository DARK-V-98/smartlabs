import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const corporateFeatures = [
    { text: 'Boosts Productivity: Clear and confident communication reduces misunderstandings and increases efficiency.' },
    { text: 'Enhances Professionalism: Employees communicate better internally and externally, creating a positive company image.' },
    { text: 'Supports Global Expansion: Teams equipped with strong language and communication skills are ready for international business opportunities.' },
    { text: 'Improves Employee Engagement: Personalized and practical training keeps staff motivated and invested in their growth.' },
];

const approachPoints = [
    { title: 'Expert-Led Sessions', description: 'Delivered by qualified trainers with extensive corporate and language training experience.' },
    { title: 'Interactive & Practical', description: 'Real-world exercises, case studies, and simulations to ensure learning sticks.' },
    { title: 'Flexible Delivery', description: 'Available online or on-site to suit your team’s schedule and location.' },
    { title: 'Follow-Up & Feedback', description: 'Continuous evaluation to measure impact and plan further development.' },
];


export default function CorporateTrainingPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Corporate Training at Smart Labs</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Empowering Teams, Elevating Organizations
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold mb-4">Customized Training for Your Organization</h2>
          <p className="text-muted-foreground mb-6">
            At Smart Labs, we believe that effective communication and professional skills are the backbone of any successful organization. Our corporate training programs are designed to bridge skill gaps, enhance workplace efficiency, and foster a culture of continuous learning.
          </p>
          <p className="text-muted-foreground">
              No two organizations are the same. That’s why our programs are fully customized based on a Skill Gap Analysis, your Organizational Culture, and your Business Goals. This approach ensures that every session is relevant, practical, and impactful, helping your employees improve communication, collaboration, and overall performance.
          </p>
        </div>
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Why Corporate Language Training Matters</CardTitle>
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

      <div className="py-20">
        <h2 className="text-3xl font-headline font-bold text-center mb-12">Our Approach</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {approachPoints.map((point) => (
                 <Card key={point.title}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{point.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{point.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>

      <div className="text-center bg-primary/10 p-10 rounded-lg">
        <h2 className="text-3xl font-headline font-bold mb-4">Partner with Smart Labs</h2>
        <p className="max-w-3xl mx-auto text-muted-foreground mb-6">
            Investing in your team’s communication and professional skills is investing in your company’s future growth and success. Let Smart Labs help you create a high-performing, confident, and collaborative workforce.
        </p>
        <Button asChild size="lg">
            <Link href="/contact">Contact Us for a Corporate Training Consultation</Link>
        </Button>
      </div>
    </div>
  );
}