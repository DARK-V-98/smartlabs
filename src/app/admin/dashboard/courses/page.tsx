
'use client';

import { useState } from 'react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, MoreHorizontal, PlusCircle, Trash, Edit, ArrowLeft } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const courseSchema = z.object({
  name: z.string().min(3, 'Course name is required'),
  description: z.string().min(10, 'Description is required'),
  duration: z.string().min(1, 'Duration is required'),
  syllabus: z.string().optional(),
  targetAudience: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

export default function CourseManagementPage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const coursesQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'courses') : null),
    [firestore]
  );
  const { data: courses, isLoading } = useCollection(coursesQuery);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: '',
      description: '',
      duration: '',
      syllabus: '',
      targetAudience: '',
    },
  });

  const handleDialogOpen = (course: any = null) => {
    setSelectedCourse(course);
    if (course) {
      form.reset(course);
    } else {
      form.reset({ name: '', description: '', duration: '', syllabus: '', targetAudience: '' });
    }
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: CourseFormValues) => {
    if (!firestore) return;

    try {
      if (selectedCourse) {
        // Update existing course
        const courseRef = doc(firestore, 'courses', selectedCourse.id);
        await updateDoc(courseRef, data);
        toast({ title: 'Success', description: 'Course updated successfully.' });
      } else {
        // Add new course
        await addDoc(collection(firestore, 'courses'), data);
        toast({ title: 'Success', description: 'Course added successfully.' });
      }
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error saving course:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save the course.' });
    }
  };

  const handleDelete = async (courseId: string) => {
    if (!firestore) return;
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteDoc(doc(firestore, 'courses', courseId));
        toast({ title: 'Success', description: 'Course deleted successfully.' });
      } catch (error) {
        console.error('Error deleting course:', error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the course.' });
      }
    }
  };

  return (
    <div className="w-full min-h-screen">
      <section className="py-8 md:py-12">
        <div className="container mx-auto">
          <Button asChild variant="ghost" className="mb-4">
             <Link href="/admin/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Course Management</CardTitle>
                  <CardDescription>Add, edit, or remove courses from the platform.</CardDescription>
                </div>
                <Button onClick={() => handleDialogOpen()}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Course
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading courses...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses?.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.name}</TableCell>
                          <TableCell className="max-w-xs truncate">{course.description}</TableCell>
                          <TableCell>{course.duration}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleDialogOpen(course)}>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(course.id)} className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{selectedCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
                <DialogDescription>
                  {selectedCourse ? 'Update the details of the course.' : 'Fill in the details for the new course.'}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., IELTS Academic" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="A brief summary of the course." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 6 Weeks" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="syllabus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Syllabus</FormLabel>
                        <FormControl>
                          <Textarea placeholder="List syllabus topics, separated by commas." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Students and professionals" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Saving...' : 'Save Course'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}

    