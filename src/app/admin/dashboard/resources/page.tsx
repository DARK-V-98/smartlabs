
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
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MoreHorizontal, PlusCircle, Trash, Edit, ArrowLeft, Video, FileText } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const resourceSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  url: z.string().url('Must be a valid URL'),
  resourceType: z.enum(['video', 'test', 'list', 'document'], { required_error: 'Resource type is required' }),
  courseId: z.string({ required_error: 'Course is required' }),
});

type ResourceFormValues = z.infer<typeof resourceSchema>;

export default function ResourceManagementPage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const resourcesQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'resources') : null),
    [firestore]
  );
  const { data: resources, isLoading: resourcesLoading } = useCollection(resourcesQuery);
  
  const coursesQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'courses') : null),
    [firestore]
  );
  const { data: courses } = useCollection(coursesQuery);

  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceSchema),
  });

  const handleDialogOpen = (resource: any = null) => {
    setSelectedResource(resource);
    if (resource) {
      form.reset(resource);
    } else {
      form.reset({ title: '', description: '', url: '', resourceType: undefined, courseId: undefined });
    }
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: ResourceFormValues) => {
    if (!firestore) return;

    try {
      if (selectedResource) {
        const resourceRef = doc(firestore, 'resources', selectedResource.id);
        await updateDoc(resourceRef, data);
        toast({ title: 'Success', description: 'Resource updated successfully.' });
      } else {
        await addDoc(collection(firestore, 'resources'), data);
        toast({ title: 'Success', description: 'Resource added successfully.' });
      }
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error saving resource:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save the resource.' });
    }
  };

  const handleDelete = async (resourceId: string) => {
    if (!firestore) return;
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        await deleteDoc(doc(firestore, 'resources', resourceId));
        toast({ title: 'Success', description: 'Resource deleted successfully.' });
      } catch (error) {
        console.error('Error deleting resource:', error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the resource.' });
      }
    }
  };

  const getCourseName = (courseId: string) => {
    return courses?.find(c => c.id === courseId)?.name || 'N/A';
  }

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
                  <CardTitle>Resource Management</CardTitle>
                  <CardDescription>Add, edit, or delete course materials.</CardDescription>
                </div>
                <Button onClick={() => handleDialogOpen()}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Resource
                </Button>
              </CardHeader>
              <CardContent>
                {resourcesLoading ? (
                  <p>Loading resources...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resources?.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell className="font-medium">{resource.title}</TableCell>
                          <TableCell className="capitalize flex items-center gap-2">
                            {resource.resourceType === 'video' ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                            {resource.resourceType}
                          </TableCell>
                          <TableCell>{getCourseName(resource.courseId)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleDialogOpen(resource)}>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(resource.id)} className="text-red-600">
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

            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedResource ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <FormField control={form.control} name="title" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl><Input placeholder="e.g., IELTS Writing Task 1 Guide" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                  )} />
                   <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl><Textarea placeholder="A short description of the resource." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="url" render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl><Input placeholder="https://example.com/resource.pdf" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                  )} />
                 <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="resourceType" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resource Type</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="video">Video</SelectItem>
                                    <SelectItem value="document">Document</SelectItem>
                                    <SelectItem value="test">Test</SelectItem>
                                    <SelectItem value="list">List</SelectItem>
                                </SelectContent>
                             </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="courseId" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    {courses?.map(course => (
                                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                                    ))}
                                </SelectContent>
                             </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                 </div>
                  
                  <DialogFooter className="pt-4">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Saving...' : 'Save Resource'}
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

    