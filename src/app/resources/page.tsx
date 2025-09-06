import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { resourceLibrary } from '@/lib/constants';
import { FileText, Video, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

const iconMap = {
  FileText: FileText,
  Video: Video,
};

export default function ResourcesPage() {
  const testsAndLists = resourceLibrary.filter(r => r.type === 'test' || r.type === 'list');
  const videos = resourceLibrary.filter(r => r.type === 'video');

  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Resource Library</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          A curated collection of practice tests, vocabulary lists, and video lessons to boost your preparation.
        </p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-10">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceLibrary.map((item, index) => (
              <ResourceCard key={index} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="documents">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testsAndLists.map((item, index) => (
              <ResourceCard key={index} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((item, index) => (
              <ResourceCard key={index} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

type ResourceItem = typeof resourceLibrary[0];

function ResourceCard({ item }: { item: ResourceItem }) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] || FileText;

  if (item.type === 'video') {
    return (
        <Card className="overflow-hidden group shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative">
                <Image 
                    src={`https://picsum.photos/400/225?random=${item.title}`}
                    alt={item.title}
                    data-ai-hint="lesson video"
                    width={400}
                    height={225}
                    className="w-full object-cover transition-transform group-hover:scale-105"
                />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Video className="h-16 w-16 text-white/80" />
                </div>
            </div>
            <CardHeader>
                <CardTitle className="font-headline">{item.title}</CardTitle>
                <CardDescription>{item.format}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full">Watch Now</Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="flex-grow">
        <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
                <CardTitle className="font-headline">{item.title}</CardTitle>
                <CardDescription>{item.format}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
}
