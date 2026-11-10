import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  BrainCircuit,
  Cpu,
  Globe,
  Workflow,
} from 'lucide-react';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { client } from '../lib/sanity';
import { SocialMediaAccount } from '../lib/interface';

export const metadata: Metadata = {
  title: 'That1 Tech Company',
  description:
    'Technology engineering and solutions — hardware, IoT, software, and AI, engineered to bring ideas to life.',
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

const pillars = [
  {
    number: '01',
    icon: Cpu,
    title: 'Hardware & IoT Engineering',
    description: 'From initial concepts to connected physical products.',
    items: [
      'Arduino & microcontroller prototyping',
      'Electronics & PCB development',
      'Embedded systems',
      'IoT devices & integrations',
      'Production-ready hardware solutions',
    ],
  },
  {
    number: '02',
    icon: Globe,
    title: 'Software & Application Development',
    description: 'Custom software designed around your business or product.',
    items: [
      'Web applications & platforms',
      'Business management systems',
      'iOS & Android applications',
      'E-commerce & online platforms',
      'APIs & system integrations',
    ],
  },
  {
    number: '03',
    icon: BrainCircuit,
    title: 'AI Engineering & Integration',
    description: 'Make your products and business operations intelligent.',
    items: [
      'AI-powered applications',
      'AI sales & customer support agents',
      'Custom AI assistants',
      'Retrieval-Augmented Generation (RAG)',
      'Machine learning solutions',
    ],
  },
  {
    number: '04',
    icon: Workflow,
    title: 'Automation & Systems Integration',
    description:
      'Connect systems, eliminate repetitive work, and improve operations.',
    items: [
      'Business process automation',
      'Workflow automation',
      'Hardware-to-software integrations',
      'IoT monitoring & control systems',
      'Data processing & reporting',
    ],
  },
];

const flowSteps = [
  { title: 'Hardware', description: 'Devices, sensors, embedded systems' },
  { title: 'Connectivity', description: 'IoT, APIs, cloud infrastructure' },
  { title: 'Applications', description: 'Web, iOS, Android' },
  { title: 'Intelligence', description: 'AI, automation, analytics' },
];

export default async function CompanyPage() {
  const socials = await getSocials();
  return (
    <div className='dark relative w-full bg-background text-foreground overflow-x-hidden'>
      <BackgroundPaths />

      {/* MAIN CONTENT AREA - high z-index so it curtains over the fixed footer */}
      <main className='relative z-10 w-full bg-background/70 border-b border-border shadow-md rounded-b-3xl'>

        {/* HERO */}
        <section className='min-h-screen flex flex-col items-center justify-center px-6 relative'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_center,color-mix(in_oklch,var(--primary)_8%,transparent)_0%,transparent_60%)] pointer-events-none' />

          <Image
            src='/company-logo-white.png'
            alt='That1 Tech Company'
            width={2172}
            height={724}
            priority
            className='w-full max-w-xs sm:max-w-md md:max-w-xl h-auto'
          />

          <p className='mt-10 text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-primary'>
            Hardware. Software. Intelligence.
          </p>

          <h1 className='mt-4 text-4xl md:text-6xl font-black tracking-tight text-center'>
            We Turn Ideas Into Technology.
          </h1>

          <p className='mt-6 max-w-2xl text-center text-muted-foreground text-lg md:text-xl leading-relaxed'>
            From hardware and connected devices to mobile apps, intelligent
            software, and AI-powered automation — we engineer solutions that
            bring ideas to life.
          </p>

          <div className='mt-8 flex flex-wrap justify-center gap-3'>
            {['Hardware & IoT', 'Web & Mobile Apps', 'AI Solutions', 'Automation'].map(
              (chip) => (
                <span
                  key={chip}
                  className='rounded-full border border-border bg-secondary/40 px-5 py-2 text-xs md:text-sm font-semibold tracking-wide'
                >
                  {chip}
                </span>
              )
            )}
          </div>

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
        </section>

        {/* CAPABILITIES — four pillars */}
        <section className='max-w-7xl w-full mx-auto px-6 py-24'>
          <p className='text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-primary text-center'>
            Capabilities
          </p>
          <h2 className='mt-4 text-3xl md:text-5xl font-black tracking-tight text-center'>
            End-to-End Technology Engineering
          </h2>
          <p className='mt-4 text-center text-muted-foreground text-lg max-w-2xl mx-auto'>
            One technology partner — from physical hardware to intelligent
            applications.
          </p>

          <div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className='rounded-2xl border border-border bg-secondary/30 backdrop-blur-sm p-6 flex flex-col'
              >
                <div className='flex items-center justify-between'>
                  <pillar.icon className='w-8 h-8 text-primary' />
                  <span className='text-4xl font-black text-muted-foreground/30'>
                    {pillar.number}
                  </span>
                </div>
                <h3 className='mt-5 text-lg font-bold leading-snug'>
                  {pillar.title}
                </h3>
                <p className='mt-2 text-sm text-muted-foreground'>
                  {pillar.description}
                </p>
                <ul className='mt-4 space-y-2 text-sm text-muted-foreground'>
                  {pillar.items.map((item) => (
                    <li key={item} className='flex gap-2'>
                      <span className='text-primary mt-0.5'>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ONE INTEGRATED SOLUTION — capability flow */}
        <section className='max-w-7xl w-full mx-auto px-6 pb-28'>
          <h2 className='text-3xl md:text-5xl font-black tracking-tight text-center'>
            One Integrated Technology Solution.
          </h2>
          <p className='mt-4 text-center text-muted-foreground text-lg max-w-3xl mx-auto'>
            We don&apos;t just build websites, apps, or hardware independently —
            we combine them into complete solutions.
          </p>

          <div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {flowSteps.map((step, index) => (
              <div
                key={step.title}
                className='flex flex-col lg:flex-row items-center gap-4'
              >
                <div className='rounded-2xl border border-border bg-secondary/30 backdrop-blur-sm p-6 flex-1 w-full text-center'>
                  <h3 className='text-xl font-bold'>{step.title}</h3>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    {step.description}
                  </p>
                </div>
                {index < flowSteps.length - 1 && (
                  <ArrowRight className='w-6 h-6 shrink-0 rotate-90 lg:rotate-0 text-primary' />
                )}
              </div>
            ))}
          </div>

          <p className='mt-14 text-center text-muted-foreground text-lg max-w-3xl mx-auto'>
            A smart inventory monitor? We build the{' '}
            <span className='text-foreground font-semibold'>device and sensors</span>,{' '}
            the <span className='text-foreground font-semibold'>embedded software</span>,{' '}
            the <span className='text-foreground font-semibold'>IoT connectivity</span>,{' '}
            the <span className='text-foreground font-semibold'>dashboard and mobile app</span>,{' '}
            and the <span className='text-foreground font-semibold'>AI-powered analytics</span>{' '}
            — end to end.
          </p>
        </section>
      </main>

      <CinematicFooter socials={socials} />
    </div>
  );
}
