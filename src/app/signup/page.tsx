
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const signupSchema = z.object({
  displayName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const ADMIN_EMAIL = "admin@smartlabs.com";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { displayName: '', email: '', password: '' },
  });

  const handleAuthSuccess = async (user: User, displayName?: string | null) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
         await updateDoc(userRef, {
            lastLogin: new Date(),
         });
      } else {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: displayName || user.displayName,
          role: user.email === ADMIN_EMAIL ? 'admin' : 'user',
          createdAt: new Date(),
          lastLogin: new Date(),
        });
      }

      setIsLoading(false);
      toast({
        title: 'Account Created!',
        description: 'Welcome to Smart Labs!',
      });
      router.push('/dashboard');
    } catch (error) {
        handleAuthError(error);
    }
  };

  const handleAuthError = (error: any) => {
    setIsLoading(false);
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: error.code === 'auth/email-already-in-use' 
        ? 'This email is already registered. Please login instead.'
        : error.message || 'There was a problem with your request.',
    });
  };

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, {
        displayName: data.displayName,
      });
      await handleAuthSuccess(userCredential.user, data.displayName);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await handleAuthSuccess(result.user);
    } catch (error) {
      handleAuthError(error);
    }
  };

  return (
    <div className="w-full bg-sky-200">
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl">Create Account</CardTitle>
              <CardDescription>Join Smart Labs to start learning.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </form>
              </Form>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" size="lg" onClick={handleGoogleSignIn} disabled={isLoading}>
                <Image src="/google-logo.svg" alt="Google" width={20} height={20} className="mr-2" />
                Sign up with Google
              </Button>

               <div className="mt-6 text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
