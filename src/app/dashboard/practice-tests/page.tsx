
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const practiceTests = [
  {
    title: 'PTE Reading: Multiple-Choice',
    description: 'A sample test to practice your reading comprehension skills for the PTE Academic exam.',
    href: '/dashboard/practice-tests/pte-reading-test',
    status: 'Available',
  },
  {
    title: 'IELTS Writing Task 2: Essay',
    description: 'Practice writing a full essay for the IELTS Academic Writing Task 2. (Coming Soon)',
    href: '#',
    status: 'Coming Soon',
  },
  {
    title: 'CELPIP Listening Practice',
    description: 'Listen to conversations and answer questions to prepare for the CELPIP Listening test. (Coming Soon)',
    href: '#',
    status: 'Coming Soon',
  }
]

export default function PracticeTestsPage() {
  return (
    <div className="container mx-auto py-10">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Practice Tests</CardTitle>
              <CardDescription>Hone your skills with our library of mock tests and practice exercises.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {practiceTests.map(test => (
              <Card key={test.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{test.title}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full" disabled={test.status === 'Coming Soon'}>
                    <Link href={test.href}>
                      {test.status === 'Coming Soon' ? 'Coming Soon' : 'Start Test'}
                      {test.status !== 'Coming Soon' && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
