
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProgressPage() {
  return (
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
  );
}
