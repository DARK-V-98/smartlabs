
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function ProgressPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Progress & Feedback</CardTitle>
              <CardDescription>This page will show your progress and feedback on assignments.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
