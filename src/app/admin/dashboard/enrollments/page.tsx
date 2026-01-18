
'use client';

import { useState, useEffect } from 'react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, writeBatch, collectionGroup, query } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, UserCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface Enrollment {
  id: string; // This will be the unique enrollmentId
  userId: string;
  courseId: string;
  batchName?: string;
  enrollmentStatus: 'pending' | 'active';
  enrollmentDate: any;
  user: any; // To store fetched user data
}

export default function EnrollmentManagementPage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  
  // Use a collection group query to get all enrollments across all users
  const enrollmentsQuery = useMemoFirebase(() => 
      firestore ? query(collectionGroup(firestore, 'enrollments')) : null, 
      [firestore]
  );
  const { data: allEnrollments, isLoading: enrollmentsLoading } = useCollection(enrollmentsQuery);

  const usersQuery = useMemoFirebase(() => (firestore ? collection(firestore, 'users') : null), [firestore]);
  const { data: users, isLoading: usersLoading } = useCollection(usersQuery);

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  
  const isLoading = enrollmentsLoading || usersLoading;

  useEffect(() => {
    if (isLoading || !allEnrollments || !users) return;

    const userMap = new Map(users.map(u => [u.id, u]));
    
    const populatedEnrollments = allEnrollments.map(e => ({
        ...e,
        user: userMap.get(e.userId)
    })).filter(e => e.user); // Filter out enrollments where user might not be found

    // Sort by date, pending first
    populatedEnrollments.sort((a, b) => {
        if (a.enrollmentStatus === 'pending' && b.enrollmentStatus !== 'pending') return -1;
        if (a.enrollmentStatus !== 'pending' && b.enrollmentStatus === 'pending') return 1;
        if (!a.enrollmentDate) return 1;
        if (!b.enrollmentDate) return -1;
        return b.enrollmentDate.toMillis() - a.enrollmentDate.toMillis();
    });

    setEnrollments(populatedEnrollments as Enrollment[]);

  }, [allEnrollments, users, isLoading]);

  const handleApprove = async (enrollment: Enrollment) => {
    if (!firestore || !enrollment.user) return;
    
    try {
      const batch = writeBatch(firestore);

      // 1. Update the enrollment status
      const enrollmentRef = doc(firestore, 'users', enrollment.userId, 'enrollments', enrollment.id);
      batch.update(enrollmentRef, { enrollmentStatus: 'active' });

      // 2. Denormalize active course for security rules
      const activeCourseRef = doc(firestore, 'users', enrollment.userId, 'active_courses', enrollment.courseId);
      batch.set(activeCourseRef, { enrolledAt: new Date() });

      // 3. Update the user role to 'student' if they are just a 'user'
      if (enrollment.user.role === 'user') {
          const userRef = doc(firestore, 'users', enrollment.userId);
          batch.update(userRef, { role: 'student' });
      }
      
      await batch.commit();

      toast({
        title: 'Enrollment Approved!',
        description: `${enrollment.user.displayName} now has access to ${enrollment.courseId}.`,
      });
      // Refresh local state to update UI
      setEnrollments(enrollments.map(e => 
        e.id === enrollment.id
          ? { ...e, enrollmentStatus: 'active' }
          : e
      ));

    } catch (error) {
      console.error('Error approving enrollment:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not approve the enrollment.',
      });
    }
  };
  
  const renderSkeleton = () => (
    Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i}>
        <TableCell><Skeleton className="h-10 w-40" /></TableCell>
        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
        <TableCell><Skeleton className="h-6 w-20" /></TableCell>
        <TableCell><Skeleton className="h-6 w-28" /></TableCell>
        <TableCell><Skeleton className="h-10 w-24" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <div className="w-full min-h-screen">
      <section className="py-8 md:py-12">
        <div className="container mx-auto">
          <Button asChild variant="ghost" className="mb-4">
             <Link href="/admin/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <UserCheck className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Enrollment Management</CardTitle>
                    <CardDescription>View and approve new student course enrollments.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? renderSkeleton() : (
                        enrollments.map((enrollment) => (
                            <TableRow key={enrollment.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src={enrollment.user?.photoURL} alt="Avatar" />
                                            <AvatarFallback>{enrollment.user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">{enrollment.user?.displayName || 'Unknown User'}</p>
                                            <p className="text-xs text-muted-foreground">{enrollment.user?.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell><Badge variant="outline">{enrollment.courseId}</Badge></TableCell>
                                <TableCell><Badge variant="secondary">{enrollment.batchName || 'N/A'}</Badge></TableCell>
                                <TableCell>
                                    <Badge variant={enrollment.enrollmentStatus === 'active' ? 'default' : 'destructive'} className="capitalize">
                                        {enrollment.enrollmentStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>{enrollment.enrollmentDate?.toDate().toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    {enrollment.enrollmentStatus === 'pending' ? (
                                        <Button onClick={() => handleApprove(enrollment)} size="sm">
                                            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                                        </Button>
                                    ) : (
                                        <span className="text-sm text-muted-foreground">Approved</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
                { !isLoading && enrollments.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                        No pending or active enrollments found.
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
