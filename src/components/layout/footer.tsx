
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import { Phone } from 'lucide-react';

const socialLinks = [
  { icon: '/facebook.png', href: 'https://www.facebook.com/lahirukaweeraratne', 'aria-label': 'Facebook profile' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100/50 border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Smart Labs logo" width={128} height={128} className="h-24 w-24 sm:h-32 sm:w-32" />
            </Link>
            <p className="text-sm text-muted-foreground">
             Your partner in achieving global academic and professional goals.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <Button key={social['aria-label']} variant="outline" size="icon" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social['aria-label']}>
                    <Image src={social.icon} alt={social['aria-label']} width={20} height={20} className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="col-span-1">
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
          
          <div className="col-span-1">
            <h3 className="font-headline font-semibold text-foreground tracking-wider uppercase">Courses</h3>
            <ul className="mt-4 space-y-2">
                <li><Link href="/pte" className="text-sm text-muted-foreground hover:text-foreground">PTE</Link></li>
                <li><Link href="/ielts" className="text-sm text-muted-foreground hover:text-foreground">IELTS</Link></li>
                <li><Link href="/celpip" className="text-sm text-muted-foreground hover:text-foreground">CELPIP</Link></li>
                 <li><Link href="/policies" className="text-sm text-muted-foreground hover:text-foreground">Policies</Link></li>
            </ul>
          </div>

          <div className="col-span-full md:col-span-2">
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
                 <Button asChild className="mt-6">
                    <Link href="/contact">Book a Free Consultation</Link>
                </Button>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Smart Labs. All rights reserved.</p>
           <p className="mt-2">
            Developed by <a href="https://www.esystemlk.xyz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">esystemlk</a>
          </p>
        </div>
      </div>
      <a
        href="https://wa.me/94766914650"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
       >
        <Image src="/whatsapp.png" alt="WhatsApp" width={28} height={28} />
      </a>
    </footer>
  );
}
