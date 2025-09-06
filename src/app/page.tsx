import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Star,
  Target,
  Clock,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { courseData, blogPosts, testimonials } from '@/lib/constants';

const featureIcons = {
  IELTS: BookOpen,
  OET: Target,
  PTE: Clock,
  TOEFL: Users,
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="bg-primary/10 py-20 md:py-32">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-gray-800">
              Unlock Your Global Future with Smart Labs
            </h1>
            <p className="text-lg text-muted-foreground">
              Expert guidance for IELTS, OET, PTE, and TOEFL. Personalized
              study plans to help you achieve your best score.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Button asChild size="lg">
                <Link href="/courses">
                  Explore Courses <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/enroll">Book a Free Demo</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="https://picsum.photos/800/600"
              alt="Students learning in a modern classroom"
              data-ai-hint="students learning"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-headline font-bold mb-4">
            Why Choose Smart Labs?
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground mb-12">
            We provide a comprehensive learning experience designed for your
            success.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">
                  Personalized Study Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  AI-powered study plans tailored to your skill level and learning
                  pace.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Expert Tutors</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Learn from certified instructors with years of experience.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
                  <BookOpen className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">
                  Rich Resource Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Access a vast collection of sample tests, video lessons, and
                  more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="courses" className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-headline font-bold mb-4">
            Our Courses
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground mb-12">
            Find the perfect course to match your ambition. We cover all major
            English proficiency tests.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courseData.map((course) => {
              const Icon = featureIcons[course.title as keyof typeof featureIcons] || BookOpen;
              return (
                <Card key={course.title} className="text-left overflow-hidden group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                       <Icon className="h-8 w-8 text-primary" />
                      <CardTitle className="font-headline">{course.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm h-20">{course.description}</p>
                    <Button asChild variant="link" className="p-0">
                      <Link href="/courses">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            What Our Students Say
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col">
                <CardContent className="pt-6 flex-grow">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="italic">"{testimonial.quote}"</p>
                </CardContent>
                <CardHeader className="flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.course}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-headline font-bold text-center mb-4">
            From Our Blog
          </h2>
          <p className="max-w-3xl mx-auto text-center text-muted-foreground mb-12">
            Get the latest tips and strategies for your test preparation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <Card key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      data-ai-hint="study books"
                      width={400}
                      height={250}
                      className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">{post.category}</Badge>
                    <CardTitle className="font-headline text-xl pt-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
