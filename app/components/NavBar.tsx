'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileMenu } from './MobileMenu';
import { ContactMeForm } from './ContactMeForm';
import { Download } from 'lucide-react';

export const navigationItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Guestbook',
    href: '/guestbook',
  },
  {
    name: 'Projects',
    href: '/projects',
  },
];

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = '/my_resume.pdf'; // Replace with the actual path to your PDF file
  link.download = 'nionel_resume.pdf'; // The name of the file to be downloaded
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function NavBar() {
  const pathname = usePathname();
  return (
    <nav className='max-w-7xl mx-auto px-4 md:px-8 py-5 grid grid-cols-12'>
      <div className='col-span-6 flex md:col-span-3'>
        <Link href={'/'}>
          <h1 className='text-4xl font-bold'>
            Neyo <span className='text-blue-500'>Ibarra</span>
          </h1>
        </Link>
      </div>
      <div className='hidden sm:flex justify-center items-center col-span-6'>
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === item.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex items-center justify-end md:col-span-3 col-span-6 space-x-3'>
        <Button
          onClick={handleDownload}
          className='items-center justify-center border-blue-700 text-blue-700'
          variant={'outline'}
        >
          📝 Download Resume
        </Button>
        <ContactMeForm buttonText='👉 Contact Me!' buttonSelect='primary' />
        <div className='sm:hidden'>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
