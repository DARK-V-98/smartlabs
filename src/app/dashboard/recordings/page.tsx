
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ListVideo, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RecordingsPage() {
  return (
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
  );
}
