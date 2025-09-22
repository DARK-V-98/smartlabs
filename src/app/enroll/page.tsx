'use client';

import { useEffect, useActionState } from 'react';
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
import { courseData } from '@/lib/constants';
import { CreditCard, UserPlus } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  course: z.string({ required_error: 'Please select a course.' }),
  freeDemo: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

async function enrollAction(prevState: any, data: FormValues) {
  // Here you would typically process the enrollment and payment
  console.log('Enrolling user:', data);

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (data.email.includes('fail')) {
    return { success: false, message: 'This email address is blocked.' };
  }

  return { success: true, message: 'Enrollment successful! We will contact you shortly.' };
}

export default function EnrollPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(enrollAction, { success: false, message: '' });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      freeDemo: false,
    },
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: state.message,
        });
      }
    }
  }, [state, toast, form]);

  const onSubmit = (data: FormValues) => {
    formAction(data);
  };

  return (
    <div className="w-full">
      <section className="bg-yellow-50/50 py-12 md:py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold">Enroll Now</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Begin your journey to success. Secure your spot in one of our expert-led courses.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none lg:aspect-auto h-full">
                <Image 
                    src="https://picsum.photos/800/800"
                    alt="Student enrolling online"
                    data-ai-hint="student online"
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
                            <Input type="email" placeholder="you@example.com" {...field} />
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
                            <Input type="tel" placeholder="+1 234 567 890" {...field} />
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
                              {courseData.map((course) => (
                                <SelectItem key={course.title} value={course.title}>
                                  {course.title}
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
                                Check this box to schedule a free trial class before you commit.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className="rounded-lg border bg-gray-50 p-4">
                        <h3 className="font-semibold flex items-center gap-2"><CreditCard className="w-5 h-5" /> Secure Payment</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            After submitting, you will be redirected to our secure payment gateway. For free demos, no payment is required.
                        </p>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      {form.formState.isSubmitting ? 'Processing...' : 'Submit & Proceed to Payment'}
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
