'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { doc, getDoc, collection } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, ListVideo, FileText, BookOpen, BarChart3, Calendar, MessageSquare, Briefcase, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';


const lmsFeatures = [
    { title: 'Enroll in New Course', description: 'Explore our courses and register for another one.', href: '/enroll', icon: GraduationCap },
    { title: 'Class Recordings', description: 'Access recordings of all your past classes.', href: '/dashboard/recordings', icon: ListVideo },
    { title: 'Templates & Study Materials', description: 'Find course materials, templates, and notes.', href: '/resources', icon: FileText },
    { title: 'Practice Test Area', description: 'Take mock exams to prepare for the real test.', href: '/dashboard/practice-tests', icon: BookOpen },
    { title: 'Progress & Feedback', description: 'View your assignment feedback and track your progress.', href: '/dashboard/progress', icon: BarChart3 },
    { title: 'Class Schedule', description: 'Check your upcoming class timetable.', href: '/dashboard/schedule', icon: Calendar },
    { title: 'Support Chat', description: 'Get help from your teacher or our support team.', href: '/dashboard/support', icon: MessageSquare },
];


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();
  const [userRole, setUserRole] = useState('');
  
  const enrollmentsQuery = useMemoFirebase(
    () => (firestore && user ? collection(firestore, `users/${user.uid}/enrollments`) : null),
    [firestore, user]
  );
  const { data: enrollments, isLoading: enrollmentsLoading } = useCollection(enrollmentsQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    } else if (user && firestore) {
        const userRef = doc(firestore, 'users', user.uid);
        getDoc(userRef).then(userDoc => {
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserRole(userData.role);
                if(userData.role === 'user' && !userData.hasCompletedOnboarding) {
                    router.push('/welcome');
                }
            } else {
                 router.push('/login');
            }
        });
    }
  }, [user, isUserLoading, router, firestore]);
  
  const isLoading = isUserLoading || enrollmentsLoading || !userRole;

  if (isLoading) {
    return (
        <div className="space-y-8">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
    );
  }

  const isAdminOrDev = userRole === 'admin' || userRole === 'developer' || userRole === 'teacher';

  return (
    <>
        <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-headline font-bold">Dashboard</h1>
            <p className="text-md text-muted-foreground mt-1">Welcome back, {user?.displayName}!</p>
        </header>
        
        {isAdminOrDev && (
            <Card className="mb-8 border-amber-500 bg-amber-500/10">
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Admin Access</CardTitle>
                        <CardDescription>Manage users and content from the admin panel.</CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/admin/dashboard" className="flex items-center gap-2">
                            <Briefcase /> Go to Admin
                        </Link>
                    </Button>
                </CardHeader>
            </Card>
        )}

         <div className="mb-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><GraduationCap />My Enrolled Courses</CardTitle>
                    <CardDescription>Here are the courses you are currently enrolled in.</CardDescription>
                </CardHeader>
                <CardContent>
                    {enrollments && enrollments.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {enrollments.map(e => <Badge key={e.id} variant="secondary">{e.courseId}</Badge>)}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">You are not enrolled in any courses yet. <Link href="/courses" className="font-semibold text-primary hover:underline">Explore courses</Link></p>
                    )}
                </CardContent>
            </Card>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lmsFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="group shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                            <Link href={feature.href}>
                                Go to {feature.title} <ChevronRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
              );
          })}
        </div>
    </>
  );
}
