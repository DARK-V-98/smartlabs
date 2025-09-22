import { blogPosts } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="w-full">
      <section className="bg-yellow-50/50 py-12 md:py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold">Smart Labs Blog</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Insights, tips, and success stories to guide you on your test preparation journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
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
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
        </div>
      </section>
    </div>
  );
}
