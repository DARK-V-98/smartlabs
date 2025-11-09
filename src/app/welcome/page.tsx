'use client';

import { useRouter } from 'next/navigation';
import { useUser, useFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Edit } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function WelcomePage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();

  const handleOnboardingComplete = async (path: string) => {
    if (!user || !firestore) return;

    try {
      const userRef = doc(firestore, 'users', user.uid);
      await updateDoc(userRef, { hasCompletedOnboarding: true });
      router.push(path);
    } catch (error) {
      console.error("Failed to update onboarding status:", error);
      // Still navigate, but log the error
      router.push(path);
    }
  };
  
  useEffect(() => {
    if(!isUserLoading && !user){
        router.push('/login');
    }
  },[user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="w-full bg-muted/30">
      <div className="container mx-auto flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-4xl text-center">
          <Image src="/logo.png" alt="Smart Labs Logo" width={500} height={500} className="mx-auto mb-6 h-32 w-32 sm:h-48 sm:w-48" />
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Welcome to Smart Labs, {user.displayName}!</h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey to success starts now. What would you like to do first?
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <Card className="text-left shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Register & Start Your Journey</CardTitle>
                <CardDescription>
                  Enroll in one of our expert-led courses to get personalized feedback and a structured learning path.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => handleOnboardingComplete('/enroll')} className="w-full" size="lg">
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card className="text-left shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Take a Free Diagnostic Test</CardTitle>
                <CardDescription>
                  Assess your current skills with a free mock test to understand your strengths and weaknesses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => handleOnboardingComplete('/dashboard/practice-tests')} className="w-full" size="lg" variant="secondary">
                  Take a Free Test <Edit className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
