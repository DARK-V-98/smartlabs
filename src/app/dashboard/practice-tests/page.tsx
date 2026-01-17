
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const practiceTests = [
  {
    exam: 'PTE',
    title: 'PTE Reading: Multiple-Choice',
    description: 'A sample test to practice your reading comprehension skills for the PTE Academic exam.',
    href: '/dashboard/practice-tests/pte-reading-test',
    status: 'Available',
  },
  {
    exam: 'IELTS',
    title: 'IELTS Writing Task 2: Essay',
    description: 'Practice writing a full essay for the IELTS Academic Writing Task 2. (Coming Soon)',
    href: '#',
    status: 'Coming Soon',
  },
  {
    exam: 'CELPIP',
    title: 'CELPIP Listening Practice',
    description: 'Listen to conversations and answer questions to prepare for the CELPIP Listening test. (Coming Soon)',
    href: '#',
    status: 'Coming Soon',
  },
];

const exams = ['PTE', 'IELTS', 'CELPIP'];

export default function PracticeTestsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Practice Tests</CardTitle>
                <CardDescription>AI Scoring Tests</CardDescription>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setSelectedExam(null); // Reset state when dialog closes
              }
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Browse All Tests
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {selectedExam ? `Available ${selectedExam} Tests` : 'Browse by Exam'}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedExam ? `Select a test to start practicing.` : 'Select an exam category to see available tests.'}
                  </DialogDescription>
                </DialogHeader>

                {selectedExam ? (
                  <div className="py-4">
                    <Button variant="ghost" onClick={() => setSelectedExam(null)} className="mb-4 px-0">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exams
                    </Button>
                    <div className="space-y-3">
                      {practiceTests.filter(t => t.exam === selectedExam).length > 0 ? (
                        practiceTests.filter(t => t.exam === selectedExam).map(test => (
                          <Link
                            key={test.title}
                            href={test.status !== 'Coming Soon' ? test.href : '#'}
                            passHref
                            legacyBehavior>
                            <a
                              onClick={(e) => {
                                if (test.status === 'Coming Soon') {
                                  e.preventDefault();
                                } else {
                                  setIsDialogOpen(false);
                                  setSelectedExam(null);
                                }
                              }}
                              className={cn(
                                "block p-4 rounded-lg border hover:bg-muted transition-colors",
                                test.status === 'Coming Soon' && 'cursor-not-allowed opacity-60'
                              )}>
                              <h4 className="font-semibold">{test.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{test.description}</p>
                              {test.status === 'Coming Soon' && <p className="text-xs font-bold text-amber-600 mt-2">Coming Soon</p>}
                            </a>
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-8">No tests available for {selectedExam} yet.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 py-4">
                    {exams.map(exam => (
                      <Button
                        key={exam}
                        variant="outline"
                        className="h-auto p-4 justify-between items-center text-left flex"
                        onClick={() => setSelectedExam(exam)}
                      >
                        <div>
                          <p className="font-bold text-lg">{exam}</p>
                          <p className="text-sm text-muted-foreground">
                            {practiceTests.filter(t => t.exam === exam).length} tests available
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    ))}
                  </div>
                )}
              </DialogContent>
            </Dialog>
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
