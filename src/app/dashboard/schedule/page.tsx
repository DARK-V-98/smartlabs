
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function SchedulePage() {
  return (
    <div className="container mx-auto py-10">
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
