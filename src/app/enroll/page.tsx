
'use client';

import { useEffect, useActionState, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { useFirebase, useUser } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { payhereConfig, coursePrices } from '@/lib/payhere';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  course: z.string({ required_error: 'Please select a course.' }),
  freeDemo: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

type ServerActionState = {
    success: boolean;
    message: string;
    payment?: any; // To hold payment details for Payhere
}

const detailedCourseData = [
    { title: 'PTE - Online Boostify Session' },
    { title: 'PTE - Physical + Online Hybrid' },
    { title: 'IELTS - Weekend Group Class' },
    { title: 'CELPIP - Self-Paced Program' },
];

// This is a client-side function that will be called inside the server action
const updateUserRole = async (firestore: any, userId: string) => {
    if (!firestore || !userId) return;
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, { role: 'student' });
};

async function enrollAction(prevState: ServerActionState, data: {formValues: FormValues, userId: string | undefined}): Promise<ServerActionState> {
  const { formValues, userId } = data;
  console.log('Preparing enrollment for user:', formValues);
  
  if (formValues.email.includes('fail')) {
    return { success: false, message: 'This email address is blocked.' };
  }
  
  if (formValues.freeDemo) {
      return { success: true, message: 'Free demo requested! We will contact you shortly.' };
  }

  const amount = coursePrices[formValues.course] || 0;
  if (amount === 0) {
      return { success: false, message: 'Invalid course selected for payment.' };
  }

  const paymentDetails = {
    ...payhereConfig,
    order_id: `SL-${userId?.slice(0, 5)}-${Date.now()}`,
    items: formValues.course,
    amount: amount.toFixed(2),
    currency: 'LKR',
    first_name: formValues.fullName.split(' ')[0],
    last_name: formValues.fullName.split(' ').slice(1).join(' ') || formValues.fullName.split(' ')[0],
    email: formValues.email,
    phone: formValues.phone,
    address: 'N/A',
    city: 'N/A',
    country: 'Sri Lanka',
  };

  return { success: true, message: 'Proceeding to payment...', payment: paymentDetails };
}


export default function EnrollPage() {
  const { toast } = useToast();
  const { firestore } = useFirebase();
  const { user } = useUser();
  const [state, formAction] = useActionState(enrollAction, { success: false, message: '' });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      freeDemo: false,
    },
  });

  useEffect(() => {
    if (state.message) {
        if (state.success) {
            if (state.payment) {
                // Payment details are available, trigger Payhere
                if(window.payhere) {
                    window.payhere.onCompleted = async (orderId: string) => {
                        console.log("Payment completed. OrderID:" + orderId);
                        toast({ title: 'Payment Successful!', description: 'Your enrollment is complete.' });
                        if (firestore && user) {
                            await updateUserRole(firestore, user.uid);
                            // Redirect or update UI
                        }
                    };
                    window.payhere.onDismissed = () => {
                        console.log("Payment dismissed");
                        toast({ variant: 'destructive', title: 'Payment Canceled', description: 'Your payment process was canceled.' });
                    };
                    window.payhere.onError = (error: string) => {
                        console.log("Payhere Error:" + error);
                        toast({ variant: 'destructive', title: 'Payment Error', description: error });
                    };
                    window.payhere.startPayment(state.payment);
                } else {
                     toast({ variant: 'destructive', title: 'Error', description: 'Payment gateway could not be loaded.' });
                }

            } else {
                // This handles the free demo success case
                 toast({
                    title: 'Success!',
                    description: state.message,
                });
                form.reset();
            }
        } else {
            toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: state.message,
            });
        }
    }
  }, [state, toast, form, firestore, user]);

  useEffect(() => {
    if(user) {
        form.reset({
            fullName: user.displayName || '',
            email: user.email || '',
        })
    }
  }, [user, form]);

  const onSubmit = (data: FormValues) => {
    formAction({ formValues: data, userId: user?.uid });
  };

  return (
    <div className="w-full">
      <section className="py-12 md:py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-headline font-bold">Enroll Now</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Begin your journey to success. Secure your spot in one of our expert-led courses.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="relative aspect-[4/3] lg:aspect-auto h-64 lg:h-full w-full max-w-lg mx-auto lg:max-w-none">
                <Image 
                    src="/enr.png"
                    alt="Students enrolling in Smart Labs courses"
                    fill
                    className="rounded-xl object-cover"
                />
            </div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Application Form</CardTitle>
                <CardDescription>Complete the form to enroll.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} disabled={!!user?.email}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+94 123 456 789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Course</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose your desired course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {detailedCourseData.map((course) => (
                                <SelectItem key={course.title} value={course.title}>
                                  {course.title} - LKR {coursePrices[course.title]?.toLocaleString() || 'N/A'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="freeDemo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Request a Free Demo Class</FormLabel>
                            <p className="text-sm text-muted-foreground">
                                Check this box to schedule a free trial class before you commit. No payment required.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className="rounded-lg border bg-muted/50 p-4">
                        <h3 className="font-semibold flex items-center gap-2"><CreditCard className="w-5 h-5" /> Secure Payment</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            After submitting, you will be redirected to our secure payment gateway. For free demos, no payment is required.
                        </p>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      {form.getValues("freeDemo") ? 'Request Free Demo' : form.formState.isSubmitting ? 'Processing...' : 'Submit & Proceed to Payment'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

    