
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MoreHorizontal, PlusCircle, Trash, Edit, ArrowLeft, Video, FileText, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

// Schema for the form validation, URL is handled separately.
const resourceFormSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  resourceType: z.enum(['video', 'document', 'image', 'test', 'list'], { required_error: 'Resource type is required' }),
  courseId: z.string({ required_error: 'Course is required' }),
});

type ResourceFormValues = z.infer<typeof resourceFormSchema>;

export default function ResourceManagementPage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
    resolver: zodResolver(resourceFormSchema),
  });

  const handleDialogOpen = (resource: any = null) => {
    setSelectedResource(resource);
    setFileToUpload(null);
    if (resource) {
      form.reset(resource);
    } else {
      form.reset({ title: '', description: '', resourceType: undefined, courseId: undefined });
    }
    setIsDialogOpen(true);
  };
  
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // result is "data:mime/type;base64,the_base64_string"
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });


  const onSubmit = async (data: ResourceFormValues) => {
    if (!firestore) return;

    if (!selectedResource && !fileToUpload) {
        toast({
            variant: 'destructive',
            title: 'File Required',
            description: 'Please upload a file for the new resource.',
        });
        return;
    }

    setIsUploading(true);

    let fileUrl = selectedResource?.url;

    try {
      if (fileToUpload) {
        let folder = 'documents'; // default folder
        if (data.resourceType === 'video') {
          folder = 'videos';
        } else if (data.resourceType === 'image') {
          folder = 'images';
        }
        
        const fileDataUrl = await fileToBase64(fileToUpload);
        const fileBase64 = fileDataUrl.split(',')[1];

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileBase64: fileBase64,
            fileName: fileToUpload.name,
            folder: folder,
          }),
        });

        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'File upload failed');
        }
        fileUrl = result.url;
      }
      
      const resourceData = { ...data, url: fileUrl };

      if (selectedResource) {
        const resourceRef = doc(firestore, 'resources', selectedResource.id);
        await updateDoc(resourceRef, resourceData);
        toast({ title: 'Success', description: 'Resource updated successfully.' });
      } else {
        await addDoc(collection(firestore, 'resources'), resourceData);
        toast({ title: 'Success', description: 'Resource added successfully.' });
      }

      setIsDialogOpen(false);
      form.reset();
      setFileToUpload(null);
    } catch (error) {
      console.error('Error saving resource:', error);
      const errorMessage = error instanceof Error ? error.message : 'Could not save the resource.';
      toast({ variant: 'destructive', title: 'Error', description: errorMessage });
    } finally {
        setIsUploading(false);
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

  const getIconForType = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
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
                            {getIconForType(resource.resourceType)}
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
                   <FormItem>
                     <FormLabel>File Upload</FormLabel>
                     <FormControl>
                        <Input 
                            type="file" 
                            onChange={(e) => setFileToUpload(e.target.files?.[0] || null)}
                        />
                     </FormControl>
                     <FormDescription>
                        {(() => {
                          if (fileToUpload) return `New file: ${fileToUpload.name}`;
                          if (selectedResource?.url) return `Current file: ${selectedResource.url.split('/').pop()?.split('?')[0]}`;
                          return "Upload a file for this resource.";
                        })()}
                     </FormDescription>
                     <FormMessage />
                   </FormItem>

                 <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="resourceType" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resource Type</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="video">Video</SelectItem>
                                    <SelectItem value="document">Document</SelectItem>
                                    <SelectItem value="image">Image</SelectItem>
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
                    <Button type="submit" disabled={isUploading}>
                      {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                      {isUploading ? 'Saving...' : 'Save Resource'}
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
