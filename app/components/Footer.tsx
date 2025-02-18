'use client';

import Link from 'next/link';
import { navigationItems } from './NavBar';

export function Footer() {
  return (
    <footer className='my-12'>
      <ul className='flex flex-wrap justify-center'>
        {navigationItems.map((item, index) => (
          <div key={index} className='px-5 py-2'>
            <Link href={item.href} className='text-muted-foreground'>
              {item.name}
            </Link>{' '}
          </div>
        ))}
      </ul>
      <p className='mt-2 text-center text-muted-foreground'>
        &copy; 2025 Nionel Ibarra. All Rights reserved
      </p>
    </footer>
  );
}
