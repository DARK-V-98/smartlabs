'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { BookOpen, ArrowLeft, ArrowRight, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const practiceTests = [
  // --- PTE ---
  {
    exam: 'PTE',
    section: 'Speaking',
    title: 'Read Aloud',
    description: 'Practice reading a text aloud.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: true,
  },
  {
    exam: 'PTE',
    section: 'Speaking',
    title: 'Repeat Sentence',
    description: 'Listen and repeat a sentence.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: true,
  },
  {
    exam: 'PTE',
    section: 'Speaking',
    title: 'Describe Image',
    description: 'Describe an image in detail.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: true,
  },
  {
    exam: 'PTE',
    section: 'Speaking',
    title: 'Retell Lecture',
    description: 'Listen to a lecture and retell it.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: true,
  },
  {
    exam: 'PTE',
    section: 'Speaking',
    title: 'Answer Short Question',
    description: 'Answer simple questions.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: true,
  },
  {
    exam: 'PTE',
    section: 'Speaking',
    title: 'Summarize Group Discussion',
    description: 'Listen and summarize a discussion.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: true,
  },
  {
    exam: 'PTE',
    section: 'Speaking',
    title: 'Respond to a Situation',
    description: 'Respond to a daily life situation.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: true,
  },
  {
    exam: 'PTE',
    section: 'Speaking',
    title: 'Respond to a Situation (Core)',
    description: 'Core-specific situation response.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Writing',
    title: 'Summarize Written Text',
    description: 'Write a one-sentence summary of a text.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: true,
  },
  {
    exam: 'PTE',
    section: 'Writing',
    title: 'Write Essay',
    description: 'Write a 200-300 word argumentative essay.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: true,
  },
  {
    exam: 'PTE',
    section: 'Writing',
    title: 'Summarize Written Text (Core)',
    description: 'Core-specific summary writing.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Writing',
    title: 'Write Email (Core)',
    description: 'Core-specific email writing task.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Reading',
    title: 'Reading: Multiple-Choice, Single Answer',
    description: 'Practice your reading comprehension skills for the PTE Academic exam.',
    href: '/dashboard/practice-tests/pte-reading-test',
    status: 'Available',
    hasAiScore: true,
  },
  {
    exam: 'PTE',
    section: 'Reading',
    title: 'Fill in the Blanks (Dropdown)',
    description: 'Select the most appropriate word from a dropdown.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Reading',
    title: 'Multiple-Choice, Multiple Answer',
    description: 'Select all correct responses from a list.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Reading',
    title: 'Reorder Paragraphs',
    description: 'Arrange text boxes in the correct order.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Reading',
    title: 'Fill in the Blanks (Drag & Drop)',
    description: 'Drag words to fill the blanks in a text.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Listening',
    title: 'Summarize Spoken Text',
    description: 'Summarize a lecture you hear.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: true,
  },
  {
    exam: 'PTE',
    section: 'Listening',
    title: 'Multiple-Choice, Multiple Answer',
    description: 'Select all correct responses from a list.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Listening',
    title: 'Fill in the Blanks',
    description: 'Type the missing word in a transcript.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Listening',
    title: 'Highlight Correct Summary',
    description: 'Choose the best summary of a recording.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Listening',
    title: 'Multiple-Choice, Single Answer',
    description: 'Select one correct response.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Listening',
    title: 'Select Missing Word',
    description: 'Choose the last word of a recording.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Listening',
    title: 'Highlight Incorrect Words',
    description: 'Find words that differ from a recording.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
  {
    exam: 'PTE',
    section: 'Listening',
    title: 'Write from Dictation',
    description: 'Type a sentence you hear.',
    href: '#',
    status: 'Coming Soon',
    hasAiScore: false,
  },
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
const sectionsByExam = exams.reduce(
  (acc, exam) => {
    acc[exam] = [...new Set(practiceTests.filter((t) => t.exam === exam).map((t) => t.section))];
    return acc;
  },
  {} as Record<string, string[]>
);

export default function PracticeTestsPage() {
  const featuredTests = [
    ...practiceTests.filter((t) => t.status === 'Available'),
    ...practiceTests.filter((t) => t.status === 'Coming Soon'),
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
                <CardTitle>AI Scoring Tests</CardTitle>
                <CardDescription>
                  Hone your skills with our library of mock tests and practice exercises.
                </CardDescription>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Browse All Tests
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Browse by Exam</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {exams.map((exam) => (
                  <DropdownMenuSub key={exam}>
                    <DropdownMenuSubTrigger>{exam}</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuLabel>{exam} Sections</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {sectionsByExam[exam].map((section) => (
                          <DropdownMenuSub key={`${exam}-${section}`}>
                            <DropdownMenuSubTrigger>{section}</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuLabel>{section} Tests</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {practiceTests
                                  .filter((t) => t.exam === exam && t.section === section)
                                  .map((test) => (
                                    <DropdownMenuItem
                                      key={test.title}
                                      disabled={test.status === 'Coming Soon'}
                                    >
                                      <Link
                                        href={test.status !== 'Coming Soon' ? test.href : '#'}
                                        className="flex w-full items-center justify-between"
                                      >
                                        <span>{test.title}</span>
                                        <div className="flex items-center gap-1">
                                          {test.status === 'Coming Soon' && (
                                            <Badge variant="outline">Soon</Badge>
                                          )}
                                          {test.hasAiScore && (
                                            <Badge
                                              variant="secondary"
                                              className="bg-primary/10 text-primary"
                                            >
                                              <Sparkles className="mr-1 h-3 w-3" />
                                              AI
                                            </Badge>
                                          )}
                                        </div>
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTests.map((test) => (
            <Card key={test.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{test.title}</CardTitle>
                  {test.hasAiScore && (
                    <Badge
                      variant="secondary"
                      className="flex-shrink-0 bg-primary/10 text-primary"
                    >
                      <Sparkles className="mr-1 h-3 w-3" />
                      AI Score
                    </Badge>
                  )}
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
