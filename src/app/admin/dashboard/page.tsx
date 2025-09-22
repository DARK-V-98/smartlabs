
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';

const ADMIN_EMAIL = "admin@smartlabs.com";

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
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full">
      <section className="bg-amber-400 py-12 md:py-20">
        <div className="container mx-auto">
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-headline font-bold">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
          </header>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, Admin!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This is the protected admin dashboard. Here you can manage users, courses, and site content.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
