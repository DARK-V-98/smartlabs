
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser, useAuth, useFirebase } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

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
import { Calendar, ChevronRight, ListVideo, FileText, LogOut, BookOpen, BarChart3, Settings, MessageSquare, Briefcase, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';


const lmsFeatures = [
    { title: 'Class Recordings', description: 'Access recordings of all your past classes.', href: '/dashboard/recordings', icon: ListVideo },
    { title: 'Templates & Study Materials', description: 'Find course materials, templates, and notes.', href: '/resources', icon: FileText },
    { title: 'Practice Test Area', description: 'Take mock exams to prepare for the real test.', href: '/dashboard/practice-tests', icon: BookOpen },
    { title: 'Progress & Feedback', description: 'View your assignment feedback and track your progress.', href: '/dashboard/progress', icon: BarChart3 },
    { title: 'Class Schedule', description: 'Check your upcoming class timetable.', href: '/dashboard/schedule', icon: Calendar },
    { title: 'Support Chat', description: 'Get help from your teacher or our support team.', href: '/dashboard/support', icon: MessageSquare },
];

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/recordings", label: "Recordings", icon: ListVideo },
    { href: "/resources", label: "Materials", icon: FileText },
    { href: "/dashboard/practice-tests", label: "Practice", icon: BookOpen },
    { href: "/dashboard/progress", label: "Progress", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { firestore } = useFirebase();
  const router = useRouter();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    } else if (user && firestore) {
        const userRef = doc(firestore, 'users', user.uid);
        getDoc(userRef).then(userDoc => {
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserRole(userData.role);
            }
        });
    }
  }, [user, isUserLoading, router, firestore]);
  
  const handleLogout = async () => {
    if (auth) {
        await signOut(auth);
        router.push('/login');
    }
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
    <div className="w-full min-h-screen">
      <section className="py-8 md:py-12">
        <div className="container mx-auto">
            <header className="flex items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-headline font-bold">Student Dashboard</h1>
                    <p className="text-md text-muted-foreground mt-1">Welcome back, {user.displayName}!</p>
                </div>
                 <div className="flex items-center gap-4">
                    {userRole && <Badge variant="outline" className="capitalize">{userRole}</Badge>}
                    <Button onClick={handleLogout} variant="outline" size="sm">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </header>
            
            <Tabs value={pathname} className="w-full">
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6 mb-8 h-auto">
                    {navItems.map((item) => (
                        <TabsTrigger key={item.href} value={item.href} asChild>
                             <Link href={item.href} className="flex flex-col sm:flex-row items-center gap-2 p-2">
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value={pathname}>
                    {userRole === 'admin' || userRole === 'developer' ? (
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
                    ) : null}
                    
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
                </TabsContent>
            </Tabs>
        </div>
      </section>
    </div>
  );
}
