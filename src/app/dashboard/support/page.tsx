
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="container mx-auto py-10">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Support Chat</CardTitle>
              <CardDescription>This page will contain a support chat feature.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
