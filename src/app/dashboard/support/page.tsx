
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="container mx-auto py-10">
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
