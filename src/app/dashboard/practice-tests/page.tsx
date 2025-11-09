
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function PracticeTestsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Practice Tests</CardTitle>
              <CardDescription>This page will contain practice tests and mock exams.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
