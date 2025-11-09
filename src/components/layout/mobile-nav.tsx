
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import { useUser } from '@/firebase';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle asChild>
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <Image src="/logo.png" alt="Smart Labs logo" width={96} height={96} className="h-24 w-24" />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-foreground/80 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
           {user && (
             <Link
              href={'/dashboard'}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-foreground/80 hover:text-foreground"
            >
              Dashboard
            </Link>
           )}
        </div>
        {!user && (
            <div className="flex flex-col gap-2">
                <Button asChild size="lg" className="w-full" variant="outline">
                    <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
                </Button>
                <Button asChild size="lg" className="w-full">
                    <Link href="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
                </Button>
            </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
