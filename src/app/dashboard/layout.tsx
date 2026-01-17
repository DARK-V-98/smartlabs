'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ListVideo,
  FileText,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/recordings", label: "Recordings", icon: ListVideo },
    { href: "/resources", label: "Materials", icon: FileText },
    { href: "/dashboard/practice-tests", label: "Practice", icon: BookOpen },
    { href: "/dashboard/progress", label: "Progress", icon: BarChart3 },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  };

  return (
    <div className="bg-muted/30 min-h-screen">
        <SidebarProvider>
          <Sidebar collapsible="icon" className="bg-card">
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2" title="Back to Home">
                <Image src="/logo.png" alt="Smart Labs Logo" width={32} height={32} />
                <span className="font-display font-bold text-lg group-data-[collapsible=icon]:hidden">SmartLabs</span>
              </Link>
            </SidebarHeader>
            <SidebarMenu className="flex-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <item.icon />
                      <span className="truncate">{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarFooter>
               <SidebarMenuItem>
                  <Link href="/dashboard/settings">
                    <SidebarMenuButton
                      isActive={pathname === "/dashboard/settings"}
                      tooltip="Settings"
                    >
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-lg lg:justify-end">
                <div className="lg:hidden">
                    <SidebarTrigger />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
                          <AvatarFallback>{user?.displayName?.charAt(0) || user?.email?.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
            </header>
            <div className="p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
    </div>
  );
}
