import { blogPosts } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full">
        <section className="bg-amber-400 py-12 md:py-20">
            <div className="container mx-auto">
                <div className="max-w-3xl mx-auto">
                    <Button variant="ghost" asChild className="mb-8">
                        <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
                    </Button>
                    
                    <article>
                        <header className="space-y-4">
                            <Badge variant="secondary" className="w-fit">{post.category}</Badge>
                            <h1 className="text-4xl md:text-5xl font-headline font-bold">{post.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={`https://picsum.photos/100/100?random=${post.author}`} alt={post.author} />
                                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{post.author}</span>
                                </div>
                                <span>&bull;</span>
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </time>
                            </div>
                        </header>

                        <div className="relative w-full aspect-video my-8 rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={post.image}
                                alt={post.title}
                                data-ai-hint="blog post image"
                                fill
                                className="object-cover"
                            />
                        </div>
                        
                        <div
                            className="prose prose-lg max-w-none text-foreground prose-h3:font-headline prose-h3:text-foreground/90"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </article>
                </div>
            </div>
        </section>
    </div>
  );
}
