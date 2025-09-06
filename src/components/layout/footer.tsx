import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/icons/logo';
import { NAV_LINKS, courseData } from '@/lib/constants';
import { Github, Twitter, Linkedin, Send, MessageCircle, Phone, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: '#', 'aria-label': 'Twitter profile' },
  { icon: Github, href: '#', 'aria-label': 'GitHub profile' },
  { icon: Linkedin, href: '#', 'aria-label': 'LinkedIn profile' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100/50 border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-7 w-7 text-primary" />
              <span className="font-headline text-2xl font-bold">Smart Labs</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering students to achieve their global academic and professional goals.
            </p>
            <div className="flex space-x-4 mt-6">
                <Button variant="outline" size="icon" asChild>
                    <a href="https://wa.me/94766914650" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                        <MessageCircle className="h-5 w-5" />
                    </a>
                </Button>
              {socialLinks.map((social) => (
                <Button key={social['aria-label']} variant="outline" size="icon" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social['aria-label']}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-foreground tracking-wider uppercase">Navigate</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline font-semibold text-foreground tracking-wider uppercase">Courses</h3>
            <ul className="mt-4 space-y-2">
              {courseData.map((course) => (
                <li key={course.title}>
                  <Link href="/courses" className="text-sm text-muted-foreground hover:text-foreground">
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2">
             <h3 className="font-headline font-semibold text-foreground tracking-wider uppercase">Contact Us</h3>
                <div className="space-y-3 mt-4 text-sm">
                    <p className="text-muted-foreground">
                        3rd Floor, No. 326, Jana Jaya Building, Rajagiriya, Colombo 05
                    </p>
                    <a href="tel:0766914650" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <Phone className="h-4 w-4" /> 076 691 4650
                    </a>
                     <a href="tel:0774533233" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <Phone className="h-4 w-4" /> 077 453 3233
                    </a>
                </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Smart Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
