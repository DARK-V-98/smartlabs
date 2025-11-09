
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { FileText, Video, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap = {
  FileText: FileText,
  Video: Video,
};

export default function ResourcesPage() {
  const { firestore } = useFirebase();
  
  const resourcesQuery = useMemoFirebase(() => 
    firestore ? collection(firestore, 'resources') : null,
    [firestore]
  );
  
  const { data: resourceLibrary, isLoading } = useCollection(resourcesQuery);

  const testsAndLists = resourceLibrary?.filter(r => r.type === 'test' || r.type === 'list');
  const videos = resourceLibrary?.filter(r => r.type === 'video');

  const renderSkeleton = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-6 w-3/4 mt-2" />
            <Skeleton className="h-4 w-1/4 mt-1" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      <section className="py-12 md:py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-headline font-bold">Resource Library</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              A curated collection of practice tests, vocabulary lists, and video lessons to boost your preparation.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-xs sm:max-w-md mx-auto mb-10">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            
            {isLoading ? renderSkeleton() : (
              <>
                <TabsContent value="all">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resourceLibrary?.map((item) => (
                      <ResourceCard key={item.id} item={item} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="documents">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testsAndLists?.map((item) => (
                      <ResourceCard key={item.id} item={item} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="videos">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos?.map((item) => (
                      <ResourceCard key={item.id} item={item} />
                    ))}
                  </div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function ResourceCard({ item }: { item: any }) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] || FileText;

  if (item.type === 'video') {
    return (
        <Card className="overflow-hidden group shadow-lg hover:shadow-xl transition-shadow">
            <a href={item.url || '#'} target="_blank" rel="noopener noreferrer">
              <div className="relative aspect-video">
                  <Image 
                      src={`https://picsum.photos/seed/${item.id}/400/225`}
                      alt={item.title}
                      data-ai-hint="lesson video"
                      fill
                      className="w-full object-cover transition-transform group-hover:scale-105"
                  />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Video className="h-12 w-12 sm:h-16 sm:w-16 text-white/80" />
                  </div>
              </div>
              <CardHeader>
                  <CardTitle className="font-headline">{item.title}</CardTitle>
                  <CardDescription>{item.format}</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button className="w-full">Watch Now</Button>
              </CardContent>
            </a>
        </Card>
    );
  }

  return (
    <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="flex-grow">
        <div className="flex items-start gap-4">
            <div className="p-3 bg-secondary rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
                <CardTitle className="font-headline">{item.title}</CardTitle>
                <CardDescription>{item.format}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <a href={item.url || '#'} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Download
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
