
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, Video, FileText, LogOut, BookOpen, BarChart3, Settings, MessageSquare, ListVideo } from 'lucide-react';
import Link from 'next/link';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useFirebase } from '@/firebase';

const lmsFeatures = [
    { title: 'Class Recordings', description: 'Access recordings of all your past classes.', href: '/dashboard/recordings', icon: ListVideo },
    { title: 'Templates & Study Materials', description: 'Find course materials, templates, and notes.', href: '/resources', icon: FileText },
    { title: 'Practice Test Area', description: 'Take mock exams to prepare for the real test.', href: '/dashboard/practice-tests', icon: BookOpen },
    { title: 'Progress & Feedback', description: 'View your assignment feedback and track your progress.', href: '/dashboard/progress', icon: BarChart3 },
    { title: 'Class Schedule', description: 'Check your upcoming class timetable.', href: '/dashboard/schedule', icon: Calendar },
    { title: 'Support Chat', description: 'Get help from your teacher or our support team.', href: '/dashboard/support', icon: MessageSquare },
];


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { firestore } = useFirebase();
  const router = useRouter();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    } else if (user && firestore) {
        const userRef = doc(firestore, 'users', user.uid);
        getDoc(userRef).then(userDoc => {
            if (userDoc.exists()) {
                setUserRole(userDoc.data().role);
            }
        });
    }
  }, [user, isUserLoading, router, firestore]);
  
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
            <p className="text-lg font-semibold">Loading...</p>
            <p className="text-sm text-muted-foreground">Please wait while we load your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || ''} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">{user.displayName || 'Student'}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                         {userRole && <Badge variant="outline" className="capitalize mt-1 w-fit">{userRole}</Badge>}
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/dashboard" isActive>
                            <BookOpen />
                            Dashboard
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/dashboard/recordings">
                            <ListVideo />
                            Recordings
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/resources">
                            <FileText />
                            Materials
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/dashboard/practice-tests">
                            <BookOpen />
                            Practice Tests
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/dashboard/progress">
                            <BarChart3 />
                            Progress
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="#">
                            <Settings />
                            Settings
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
             <div className="p-2 mt-auto">
                <Button onClick={handleLogout} variant="ghost" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </Sidebar>
        <SidebarInset>
            <div className="w-full min-h-screen">
              <section className="py-8 md:py-12">
                <div className="container mx-auto">
                    <header className="flex items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-4">
                             <SidebarTrigger className="md:hidden" />
                            <div>
                                <h1 className="text-2xl md:text-3xl font-headline font-bold">Student Dashboard</h1>
                                <p className="text-md text-muted-foreground mt-1">Welcome back, {user.displayName}!</p>
                            </div>
                        </div>
                         <Button asChild variant="outline">
                            <Link href="/courses">Explore New Courses</Link>
                        </Button>
                    </header>
                    
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
                </div>
              </section>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
