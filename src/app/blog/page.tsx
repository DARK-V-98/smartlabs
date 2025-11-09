
'use client';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPage() {
  const { firestore } = useFirebase();
  const postsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'blog_posts') : null),
    [firestore]
  );
  const { data: blogPosts, isLoading } = useCollection(postsQuery);

  return (
    <div className="w-full">
      <section className="py-12 md:py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-headline font-bold">Smart Labs Blog</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Insights, tips, and success stories to guide you on your test preparation journey.
            </p>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden shadow-lg">
                  <Skeleton className="h-56 w-full" />
                  <CardHeader>
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-3/4 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts && blogPosts.map((post) => (
                <Card key={post.slug} className="group overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        data-ai-hint="study blog"
                        width={400}
                        height={250}
                        className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span>{new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <CardTitle className="font-headline text-xl pt-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
