
'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { BookOpen, ArrowLeft, Sparkles, Target, Globe, Zap, ChevronDown } from 'lucide-react';
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
    title: 'Reading: Multiple-Choice',
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

const examDetails: { [key: string]: { icon: any; color: string; iconColor: string; description: string } } = {
  PTE: {
    icon: Target,
    color: 'from-accent-1/20 to-accent-1/5',
    iconColor: 'text-accent-1',
    description: "Practice all PTE question types with AI feedback."
  },
  IELTS: {
    icon: Globe,
    color: 'from-accent-2/20 to-accent-2/5',
    iconColor: 'text-accent-2',
    description: "Prepare for your IELTS exam with targeted exercises."
  },
  CELPIP: {
    icon: Zap,
    color: 'from-accent-4/20 to-accent-4/5',
    iconColor: 'text-accent-4',
    description: "Hone your skills for Canadian English proficiency."
  }
}


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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl md:text-3xl">AI Scoring Tests</CardTitle>
                <CardDescription>
                  Select an exam below to browse available practice tests.
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => {
            const details = examDetails[exam];
            const Icon = details.icon;
            return (
              <DropdownMenu key={exam}>
                <DropdownMenuTrigger asChild>
                  <Card className="group cursor-pointer overflow-hidden text-left shadow-lg hover:shadow-2xl transition-all duration-300">
                    <CardHeader className={`bg-gradient-to-br ${details.color} p-6`}>
                      <div className="flex items-start justify-between">
                         <div className={`p-3 rounded-xl bg-white shadow-md`}>
                            <Icon className={`h-7 w-7 ${details.iconColor}`} />
                         </div>
                         <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <CardTitle className="pt-4 text-xl">{exam} Practice Tests</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                       <CardDescription>{details.description}</CardDescription>
                    </CardContent>
                  </Card>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
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
                                  asChild
                                >
                                  <Link
                                    href={test.status !== 'Coming Soon' ? test.href : '#'}
                                    className="flex w-full items-center justify-between gap-2"
                                  >
                                    <span className="flex-1 truncate">{test.title}</span>
                                    <div className="flex items-center gap-1 flex-shrink-0">
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
                </DropdownMenuContent>
              </DropdownMenu>
            )
          })}
        </CardContent>
      </Card>
    </div>
  );
}
