
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ListVideo } from 'lucide-react';

export default function RecordingsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <ListVideo className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Class Recordings</CardTitle>
              <CardDescription>This page will contain recordings of your classes.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
