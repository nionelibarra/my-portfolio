import type { Metadata } from 'next';
import Image from 'next/image';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { client } from '../lib/sanity';
import { SocialMediaAccount } from '../lib/interface';

export const metadata: Metadata = {
  title: 'That1 Tech Company',
  description:
    'AI engineering and tech solutions — we turn ideas into production-grade software.',
};

async function getSocials(): Promise<SocialMediaAccount[]> {
  if (!client) return [];
  const query = `*[_type == "home"][0].socialmediaaccounts[]{
    "imageUrl": image.asset->url,
    url,
    socialmedianame,
    username,
  }`;
  return client.fetch(query, {}, { next: { revalidate: 10 } });
}

export default async function CompanyPage() {
  const socials = await getSocials();
  return (
    <div className='dark relative w-full bg-background text-foreground overflow-x-hidden'>
      <BackgroundPaths />
      {/* MAIN CONTENT AREA - high z-index so it curtains over the fixed footer */}
      <main className='relative z-10 w-full min-h-screen bg-background/70 flex flex-col items-center justify-center px-6 border-b border-border shadow-md rounded-b-3xl'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_center,color-mix(in_oklch,var(--primary)_8%,transparent)_0%,transparent_60%)] pointer-events-none' />

        <Image
          src='/company-logo-white.png'
          alt='That1 Tech Company'
          width={2172}
          height={724}
          priority
          className='w-full max-w-xs sm:max-w-md md:max-w-xl h-auto'
        />

        <h1 className='mt-10 text-4xl md:text-6xl font-black tracking-tight text-center'>
          AI Engineering & Tech Solutions
        </h1>

        <p className='mt-6 max-w-2xl text-center text-muted-foreground text-lg md:text-xl leading-relaxed'>
          We design and ship production-grade software — from AI-powered products
          and intelligent automations to full-stack platforms built to scale.
        </p>

        <div className='mt-16 flex flex-col items-center gap-2 text-muted-foreground'>
          <span className='text-xs font-semibold tracking-[0.3em] uppercase'>
            Scroll down
          </span>
          <div className='w-px h-16 bg-gradient-to-b from-muted-foreground to-transparent' />
          <svg
            className='w-5 h-5 animate-bounce'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 14l-7 7m0 0l-7-7m7 7V3'
            />
          </svg>
        </div>
      </main>

      <CinematicFooter socials={socials} />
    </div>
  );
}
