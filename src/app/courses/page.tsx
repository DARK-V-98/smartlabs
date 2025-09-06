import { courseData } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function CoursesPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Our Courses</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Compare our expert-led courses and find the perfect fit for your goals. We offer specialized training for PTE, IELTS & CELPIP.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {courseData.map((course) => (
          <Card key={course.title} className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-primary/10">
              <CardTitle className="font-headline text-2xl text-center">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex-grow">
              <p className="text-sm text-muted-foreground pb-4">{course.description}</p>
              
              <div className="my-4">
                <p className="font-semibold text-sm">
                  <span className="font-bold text-foreground">Duration:</span> {course.duration}
                </p>
              </div>

              <h4 className="font-semibold text-md mb-2 mt-4">Key Features:</h4>
              <ul className="space-y-2 text-sm">
                {course.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/contact">Enroll Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
