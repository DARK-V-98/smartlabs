
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth, useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { doc, getDoc, collection, updateDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { LogOut, Users, BookOpen, BarChart3, MoreHorizontal, Shield, UserCheck, UserX, UserCog, MessageSquare } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { errorEmitter, FirestorePermissionError } from '@/firebase';


export default function AdminDashboardPage() {
  const { user: currentUser, isUserLoading } = useUser();
  const auth = useAuth();
  const { firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState('');

  // Fetch all users from the 'users' collection
  const usersQuery = useMemoFirebase(() => 
    firestore ? collection(firestore, 'users') : null, 
    [firestore]
  );
  const { data: users, isLoading: usersLoading } = useCollection(usersQuery);

  useEffect(() => {
    if (!isUserLoading && currentUser && firestore) {
      const userRef = doc(firestore, 'users', currentUser.uid);
      getDoc(userRef).then(userDoc => {
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role;
          setCurrentUserRole(role);
          if (role === 'admin' || role === 'developer' || role === 'teacher') {
            setIsAdmin(true);
          } else {
            router.push('/dashboard'); // Redirect non-admins/teachers to student dashboard
          }
        } else {
          router.push('/login'); // If user doc doesn't exist, they shouldn't be here
        }
      });
    } else if (!isUserLoading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, isUserLoading, router, firestore]);

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/login');
  };

  const handleRoleChange = (userId: string, newRole: 'user' | 'teacher' | 'admin') => {
    if (!firestore) return;
    const userRef = doc(firestore, 'users', userId);
    const updatedData = { role: newRole };

    updateDoc(userRef, updatedData)
      .then(() => {
        toast({
          title: 'Success!',
          description: `User role has been updated to ${newRole}.`,
        });
      })
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
            path: userRef.path,
            operation: 'update',
            requestResourceData: updatedData
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  if (isUserLoading || !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
            <p className="text-lg font-semibold">Verifying Access...</p>
            <p className="text-sm text-muted-foreground">Please wait while we check your credentials.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <section className="py-8 md:py-12">
        <div className="container mx-auto">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold">Admin Dashboard</h1>
                    <p className="text-md text-muted-foreground mt-1">Welcome back, {currentUser?.displayName || 'Admin'}!</p>
                </div>
                {currentUserRole && <Badge variant="destructive" className="capitalize">{currentUserRole}</Badge>}
            </div>
            <Button onClick={handleLogout} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
          </header>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{users?.length ?? 0}</div>
                    <p className="text-xs text-muted-foreground">Live count of registered users.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Enrollments</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+235</div>
                    <p className="text-xs text-muted-foreground">(Sample Data)</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Site Traffic</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12,389</div>
                    <p className="text-xs text-muted-foreground">(Sample Data)</p>
                </CardContent>
            </Card>
             <Card className="hover:bg-muted/50 transition-colors">
                <Link href="/admin/dashboard/support">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Support Center</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Open</div>
                        <p className="text-xs text-muted-foreground">Manage student queries.</p>
                    </CardContent>
                </Link>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View, manage roles, and monitor all users on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                {usersLoading ? <p>Loading users...</p> : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users && users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.id}/100/100`} alt="Avatar" />
                                            <AvatarFallback>{user.displayName?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">{user.displayName || 'No Name'}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant={user.role === 'admin' || user.role === 'developer' ? 'destructive' : user.role === 'teacher' ? 'secondary' : 'outline'} className="capitalize">{user.role || 'user'}</Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost" disabled={user.id === currentUser?.uid}>
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Manage User</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'teacher')}><UserCog className="mr-2 h-4 w-4" /> Make Teacher</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'admin')}><Shield className="mr-2 h-4 w-4" /> Make Admin</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'user')}><UserCheck className="mr-2 h-4 w-4" /> Make Student</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600 focus:text-red-500"><UserX className="mr-2 h-4 w-4" /> Suspend User</DropdownMenuItem>
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
        </div>
      </section>
    </div>
  );
}
    