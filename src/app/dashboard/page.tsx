import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, ChevronRight, Video, FileText } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const student = {
  name: 'Alex Johnson',
  course: 'IELTS',
  avatar: 'https://picsum.photos/100/100?random=10',
};

const courseProgress = {
  overall: 65,
  skills: [
    { name: 'Listening', value: 80 },
    { name: 'Reading', value: 70 },
    { name: 'Writing', value: 55 },
    { name: 'Speaking', value: 60 },
  ],
};

const upcomingClasses = [
    { time: '10:00 AM', title: 'Speaking Practice Session', date: 'Tomorrow' },
    { time: '02:00 PM', title: 'Writing Task 2 Workshop', date: 'Oct 28' },
    { time: '10:00 AM', title: 'Full Mock Test', date: 'Oct 30' },
];

const recentMaterials = [
    { title: 'IELTS Speaking Cues (Part 2)', type: 'PDF', icon: FileText },
    { title: 'Essay Structure Breakdown', type: 'Video', icon: Video },
    { title: 'Vocabulary for Academic Writing', type: 'PDF', icon: FileText },
];

export default function DashboardPage() {
  return (
    <div className="bg-gray-50/50 min-h-full">
        <div className="container mx-auto py-12 md:py-16">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-headline font-bold">Welcome, {student.name}!</h1>
                    <p className="text-lg text-muted-foreground mt-1">Here is your learning dashboard.</p>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                     <Badge variant="outline" className="text-sm py-1 px-3">
                      {student.course} Student
                    </Badge>
                </div>
            </header>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Current Course */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                      <BookOpen className="text-primary"/> 
                      Your Course: {student.course}
                    </CardTitle>
                    <CardDescription>Your learning journey and progress.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold">Overall Progress</h4>
                          <span className="text-lg font-bold text-primary">{courseProgress.overall}%</span>
                      </div>
                      <Progress value={courseProgress.overall} />
                    </div>
                    <Separator />
                    <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                      {courseProgress.skills.map(skill => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-muted-foreground">{skill.name}</span>
                            <span className="font-semibold">{skill.value}%</span>
                          </div>
                          <Progress value={skill.value} className="h-2"/>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                      <Button asChild variant="outline">
                          <Link href="/resources">Go to Course Materials <ChevronRight className="w-4 h-4 ml-2" /></Link>
                      </Button>
                  </CardFooter>
                </Card>

                {/* Recent Materials */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Recently Added Materials</CardTitle>
                        <CardDescription>Catch up with the latest resources for your course.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {recentMaterials.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                <li key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <Icon className="h-6 w-6 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">{item.title}</p>
                                            <Badge variant="secondary">{item.type}</Badge>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="ghost">View</Button>
                                </li>
                                );
                            })}
                        </ul>
                    </CardContent>
                </Card>
              </div>

              {/* Schedule */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                        <Calendar className="text-primary" />
                        Upcoming Schedule
                    </CardTitle>
                    <CardDescription>Your classes and tests for this week.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                        {upcomingClasses.map((item, index) => (
                             <li key={index} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-sm">{item.date}</span>
                                    <span className="text-xs text-muted-foreground">{item.time}</span>
                                </div>
                                <div className="border-l pl-4 flex-1">
                                    <p className="font-semibold">{item.title}</p>
                                </div>
                             </li>
                        ))}
                    </ul>
                  </CardContent>
                   <CardFooter>
                      <Button className="w-full">View Full Schedule</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
        </div>
    </div>
  );
}
