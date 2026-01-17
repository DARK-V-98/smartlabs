
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, ArrowLeft, ArrowRight, Search, Sparkles } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

const practiceTests = [
  // --- PTE ---
  {
    exam: 'PTE',
    section: 'Reading',
    title: 'Reading: Multiple-Choice, Single Answer',
    description: 'Practice your reading comprehension skills for the PTE Academic exam.',
    href: '/dashboard/practice-tests/pte-reading-test',
    status: 'Available',
    hasAiScore: true,
  },
  { exam: 'PTE', section: 'Speaking', title: 'Speaking: Read Aloud', description: 'Practice reading a text aloud.', href: '#', status: 'Coming Soon', hasAiScore: true },
  { exam: 'PTE', section: 'Speaking', title: 'Speaking: Repeat Sentence', description: 'Listen and repeat a sentence.', href: '#', status: 'Coming Soon', hasAiScore: true },
  { exam: 'PTE', section: 'Speaking', title: 'Speaking: Describe Image', description: 'Describe an image in detail.', href: '#', status: 'Coming Soon', hasAiScore: true },
  { exam: 'PTE', section: 'Speaking', title: 'Speaking: Retell Lecture', description: 'Listen to a lecture and retell it.', href: '#', status: 'Coming Soon', hasAiScore: true },
  { exam: 'PTE', section: 'Speaking', title: 'Speaking: Answer Short Question', description: 'Answer simple questions.', href: '#', status: 'Coming Soon', hasAiScore: true },
  { exam: 'PTE', section: 'Speaking', title: 'Speaking: Summarize Group Discussion', description: 'Listen and summarize a discussion.', href: '#', status: 'Coming Soon', hasAiScore: true },
  { exam: 'PTE', section: 'Speaking', title: 'Speaking: Respond to a Situation', description: 'Respond to a daily life situation.', href: '#', status: 'Coming Soon', hasAiScore: true },
  { exam: 'PTE', section: 'Speaking', title: 'Speaking: Respond to a Situation (Core)', description: 'Core-specific situation response.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Writing', title: 'Writing: Summarize Written Text', description: 'Write a one-sentence summary of a text.', href: '#', status: 'Coming Soon', hasAiScore: true },
  { exam: 'PTE', section: 'Writing', title: 'Writing: Write Essay', description: 'Write a 200-300 word argumentative essay.', href: '#', status: 'Coming Soon', hasAiScore: true },
  { exam: 'PTE', section: 'Writing', title: 'Writing: Summarize Written Text (Core)', description: 'Core-specific summary writing.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Writing', title: 'Writing: Write Email (Core)', description: 'Core-specific email writing task.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Reading', title: 'Reading: Fill in the Blanks (Dropdown)', description: 'Select the most appropriate word from a dropdown.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Reading', title: 'Reading: Multiple-Choice, Multiple Answer', description: 'Select all correct responses from a list.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Reading', title: 'Reading: Reorder Paragraphs', description: 'Arrange text boxes in the correct order.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Reading', title: 'Reading: Fill in the Blanks (Drag & Drop)', description: 'Drag words to fill the blanks in a text.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Listening', title: 'Listening: Summarize Spoken Text', description: 'Summarize a lecture you hear.', href: '#', status: 'Coming Soon', hasAiScore: true },
  { exam: 'PTE', section: 'Listening', title: 'Listening: Multiple-Choice, Multiple Answer', description: 'Select all correct responses from a list.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Listening', title: 'Listening: Fill in the Blanks', description: 'Type the missing word in a transcript.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Listening', title: 'Listening: Highlight Correct Summary', description: 'Choose the best summary of a recording.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Listening', title: 'Listening: Multiple-Choice, Single Answer', description: 'Select one correct response.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Listening', title: 'Listening: Select Missing Word', description: 'Choose the last word of a recording.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Listening', title: 'Listening: Highlight Incorrect Words', description: 'Find words that differ from a recording.', href: '#', status: 'Coming Soon', hasAiScore: false },
  { exam: 'PTE', section: 'Listening', title: 'Listening: Write from Dictation', description: 'Type a sentence you hear.', href: '#', status: 'Coming Soon', hasAiScore: false },
  
  // --- IELTS and CELPIP ---
  {
    exam: 'IELTS',
    section: 'Writing',
    title: 'IELTS Writing Task 2: Essay',
    description: 'Practice writing a full essay for the IELTS Academic Writing Task 2.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'CELPIP',
    section: 'Listening',
    title: 'CELPIP Listening Practice',
    description: 'Listen to conversations and answer questions to prepare for the CELPIP Listening test.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
];


const exams = ['PTE', 'IELTS', 'CELPIP'];

export default function PracticeTestsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const featuredTests = [
      ...practiceTests.filter(t => t.status === 'Available'),
      ...practiceTests.filter(t => t.status === 'Coming Soon')
  ].slice(0, 3);

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
                              <div className="flex justify-between items-center">
                                <h4 className="font-semibold">{test.title}</h4>
                                {test.hasAiScore && <Badge variant="secondary" className="bg-primary/10 text-primary"><Sparkles className="h-3 w-3 mr-1" />AI</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{test.description}</p>
                              {test.status === 'Coming Soon' && <p className="text-xs font-bold text-amber-600 mt-2">Coming Soon</p>}
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
          {featuredTests.map(test => (
            <Card key={test.title} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <CardTitle>{test.title}</CardTitle>
                    {test.hasAiScore && <Badge variant="secondary" className="bg-primary/10 text-primary flex-shrink-0"><Sparkles className="h-3 w-3 mr-1" />AI Score</Badge>}
                </div>
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
