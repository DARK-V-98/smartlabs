
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { LogOut, Users, BookOpen, BarChart3, MoreHorizontal, ArrowUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const ADMIN_EMAIL = "admin@smartlabs.com";

const sampleUsers = [
    { name: 'Priya Sharma', email: 'priya.sharma@example.com', course: 'IELTS', date: '2024-10-26', avatar: 'https://picsum.photos/100/100?random=1' },
    { name: 'John Adebayo', email: 'john.adebayo@example.com', course: 'OET', date: '2024-10-25', avatar: 'https://picsum.photos/100/100?random=2' },
    { name: 'Chen Wei', email: 'chen.wei@example.com', course: 'PTE', date: '2024-10-25', avatar: 'https://picsum.photos/100/100?random=3' },
    { name: 'Emily White', email: 'emily.white@example.com', course: 'IELTS', date: '2024-10-24', avatar: 'https://picsum.photos/100/100?random=6' },
];


export default function AdminDashboardPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push('/login');
      } else {
        setIsAdmin(true);
      }
    }
  }, [user, loading, router]);
  
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading || !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-amber-400">
        <div className="text-center">
            <p className="text-lg font-semibold">Loading...</p>
            <p className="text-sm text-muted-foreground">Please wait while we verify your credentials.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-sky-200 min-h-screen">
      <section className="py-8 md:py-12">
        <div className="container mx-auto">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold">Admin Dashboard</h1>
                <p className="text-md text-muted-foreground mt-1">Welcome back, Admin!</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
          </header>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,254</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Enrollments</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+235</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Site Traffic</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12,389</div>
                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
                <CardDescription>An overview of the newest members and their chosen courses.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead className="hidden md:table-cell">Registration Date</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sampleUsers.map((user) => (
                            <TableRow key={user.email}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src={user.avatar} alt="Avatar" />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs text-muted-foreground md:hidden">{user.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{user.course}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{user.date}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View User</DropdownMenuItem>
                                            <DropdownMenuItem>Edit Course</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
