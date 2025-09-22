
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
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
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, Video, FileText, LogOut, BookOpen, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const courseProgress = {
  overall: 65,
  skills: [
    { name: 'Listening', value: 80 },
    { name: 'Reading', value: 70 },
    { name: 'Writing', value: 55 },
    { name: 'Speaking', value: 60 },
  ],
};

const upcomingClasses = [
    { time: '10:00 AM', title: 'Speaking Practice Session', date: 'Tomorrow' },
    { time: '02:00 PM', title: 'Writing Task 2 Workshop', date: 'Oct 28' },
    { time: '10:00 AM', title: 'Full Mock Test', date: 'Oct 30' },
];

const recentMaterials = [
    { title: 'IELTS Speaking Cues (Part 2)', type: 'PDF', icon: FileText },
    { title: 'Essay Structure Breakdown', type: 'Video', icon: Video },
    { title: 'Vocabulary for Academic Writing', type: 'PDF', icon: FileText },
];

export default function DashboardPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-sky-200">
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
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/dashboard" isActive>
                            <BookOpen />
                            My Courses
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/resources">
                            <FileText />
                            Materials Library
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="#">
                            <BarChart3 />
                            Performance
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
            <div className="w-full bg-sky-200 min-h-screen">
              <section className="py-8 md:py-12">
                <div className="container mx-auto">
                    <header className="flex items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-4">
                             <SidebarTrigger className="md:hidden" />
                            <div>
                                <h1 className="text-2xl md:text-3xl font-headline font-bold">My Courses</h1>
                                <p className="text-md text-muted-foreground mt-1">Here is your learning dashboard.</p>
                            </div>
                        </div>
                         <Button asChild variant="outline">
                            <Link href="/courses">Explore New Courses</Link>
                        </Button>
                    </header>
                    
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-8">
                        {/* Current Course */}
                        <Card className="shadow-lg">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                              
                              Your Course: IELTS
                            </CardTitle>
                            <CardDescription>Your learning journey and progress.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-6">
                              <div className="flex justify-between items-center mb-1">
                                  <h4 className="font-semibold">Overall Progress</h4>
                                  <span className="text-lg font-bold text-primary">{courseProgress.overall}%</span>
                              </div>
                              <Progress value={courseProgress.overall} />
                            </div>
                            <Separator />
                            <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                              {courseProgress.skills.map(skill => (
                                <div key={skill.name}>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-muted-foreground">{skill.name}</span>
                                    <span className="font-semibold">{skill.value}%</span>
                                  </div>
                                  <Progress value={skill.value} className="h-2"/>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter>
                              <Button asChild variant="outline">
                                  <Link href="/resources">Go to Course Materials <ChevronRight className="w-4 h-4 ml-2" /></Link>
                              </Button>
                          </CardFooter>
                        </Card>

                        {/* Recent Materials */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Recently Added Materials</CardTitle>
                                <CardDescription>Catch up with the latest resources for your course.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {recentMaterials.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                        <li key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <Icon className="h-6 w-6 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">{item.title}</p>
                                                    <Badge variant="secondary">{item.type}</Badge>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="ghost">View</Button>
                                        </li>
                                        );
                                    })}
                                </ul>
                            </CardContent>
                        </Card>
                      </div>

                      {/* Schedule */}
                      <div className="lg:col-span-1">
                        <Card className="shadow-lg">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                                <Calendar className="text-primary" />
                                Upcoming Schedule
                            </CardTitle>
                            <CardDescription>Your classes and tests for this week.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                                {upcomingClasses.map((item, index) => (
                                      <li key={index} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-sm">{item.date}</span>
                                            <span className="text-xs text-muted-foreground">{item.time}</span>
                                        </div>
                                        <div className="border-l pl-4 flex-1">
                                            <p className="font-semibold">{item.title}</p>
                                        </div>
                                      </li>
                                ))}
                            </ul>
                          </CardContent>
                            <CardFooter>
                              <Button className="w-full">View Full Schedule</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                </div>
              </section>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
