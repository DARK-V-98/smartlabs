

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SchedulePage() {
  return (
    <div className="space-y-4">
        <Button asChild variant="ghost">
            <Link href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
        </Button>
        <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
                <CardTitle>Class Schedule</CardTitle>
                <CardDescription>This page will display your class schedule.</CardDescription>
            </div>
            </div>
        </CardHeader>
        </Card>
    </div>
  );
}
