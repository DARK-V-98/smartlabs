
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const TOTAL_STEPS = 4;

export default function WelcomePage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [targetExam, setTargetExam] = useState<string>('');
  const [targetScore, setTargetScore] = useState<string>('');
  const [examDate, setExamDate] = useState<Date>();

  const handleNextStep = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleFinish = async () => {
    if (!user || !firestore || !targetExam || !targetScore || !examDate) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Information',
        description: 'Please complete all steps before finishing.',
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const userRef = doc(firestore, 'users', user.uid);
      await updateDoc(userRef, {
        hasCompletedOnboarding: true,
        targetExam,
        targetScore,
        examDate: format(examDate, 'yyyy-MM-dd'),
      });
      
      toast({
        title: 'Setup Complete!',
        description: 'Your dashboard is now personalized for you.',
      });

      router.push('/dashboard');
    } catch (error) {
      console.error("Failed to update onboarding status:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save your preferences. Please try again.',
      });
      setIsLoading(false);
    }
  };
  
  if (isUserLoading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center flex flex-col items-center gap-4">
                <Image src="/logo.png" alt="Smart Labs Logo" width={80} height={80} className="animate-pulse-glow" />
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        </div>
    );
  }
  
  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="w-full bg-muted/30">
      <div className="container mx-auto flex min-h-screen items-center justify-center py-12">
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader>
            <div className="text-center">
              <Image src="/logo.png" alt="Smart Labs Logo" width={64} height={64} className="mx-auto mb-4" />
              <CardTitle className="font-headline text-3xl">Welcome, {user.displayName}!</CardTitle>
              <CardDescription className="mt-2 text-lg">Let's set up your learning journey.</CardDescription>
            </div>
            <Progress value={progress} className="mt-6" />
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {step === 1 && (
              <div className="text-center animate-fade-in">
                <h3 className="font-semibold text-2xl mb-4">Your Path to Success Starts Here</h3>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">In the next few steps, we'll ask about your goals to create a personalized study experience just for you.</p>
                <Button onClick={handleNextStep} size="lg">
                  Let's Go <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
            
            {step === 2 && (
              <div className="animate-fade-in space-y-4">
                 <Label className="text-xl font-semibold">Which exam are you preparing for?</Label>
                 <Select onValueChange={setTargetExam} value={targetExam}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select your exam..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PTE">PTE (Pearson Test of English)</SelectItem>
                      <SelectItem value="IELTS">IELTS (International English Language Testing System)</SelectItem>
                      <SelectItem value="CELPIP">CELPIP (Canadian English Language Proficiency Index Program)</SelectItem>
                    </SelectContent>
                 </Select>
                 {targetExam && <Button onClick={handleNextStep} className="mt-4 w-full" size="lg">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>}
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in space-y-4">
                <Label htmlFor="target-score" className="text-xl font-semibold">What's your target score?</Label>
                <p className="text-sm text-muted-foreground">e.g., "79+" for PTE, "Band 8.0" for IELTS, or "Level 10" for CELPIP.</p>
                <Input id="target-score" value={targetScore} onChange={(e) => setTargetScore(e.target.value)} placeholder="Enter your target score" className="h-12 text-lg" />
                {targetScore && <Button onClick={handleNextStep} className="mt-4 w-full" size="lg">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>}
              </div>
            )}
            
            {step === 4 && (
              <div className="animate-fade-in space-y-4">
                 <Label className="text-xl font-semibold">When is your exam date? (Optional)</Label>
                 <p className="text-sm text-muted-foreground">This helps us create a timeline for your study plan. You can change this later.</p>
                 <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal h-12 text-lg", !examDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {examDate ? format(examDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={examDate} onSelect={setExamDate} initialFocus />
                    </PopoverContent>
                 </Popover>
                 <Button onClick={handleFinish} className="mt-4 w-full" size="lg" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                    Finish Setup
                 </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
