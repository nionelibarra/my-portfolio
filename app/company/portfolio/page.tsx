import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProjectsCard, SocialMediaAccount } from '../../lib/interface';
import { client } from '../../lib/sanity';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { SlideIn } from '@/components/ui/slide-in';

export const metadata: Metadata = {
  title: 'Company Portfolio | That1 Tech',
  description: 'Projects and solutions built by That1 Tech Company.',
};

async function getData(): Promise<ProjectsCard[]> {
  if (!client) return [];
  const query = `*[_type == "project"] | order(_createdAt desc){
    title,
      _id,
      link,
      description,
      tags,
      "imageUrl":image.asset->url
  }`;

  const data = await client.fetch(query, {}, { next: { revalidate: 10 } });
  return data;
}

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

export default async function CompanyPortfolioPage() {
  const data = await getData();
  const socials = await getSocials();

  return (
    <div className='dark relative w-full bg-background text-foreground overflow-x-hidden'>
      <BackgroundPaths />
      <main className='relative z-10 w-full min-h-screen bg-background/70 border-b border-border shadow-md rounded-b-3xl'>
        <section className='max-w-7xl w-full px-4 md:px-8 mx-auto pt-10 md:pt-20 pb-12'>
          <SlideIn from='up'>
            <Link
              href='/company'
              className='inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-8'
            >
              <ArrowLeft className='w-4 h-4' />
              Back to Company
            </Link>
            <h1 className='text-4xl font-bold lg:text-5xl'>Company Portfolio</h1>
            <p className='leading-7 text-muted-foreground mt-2'>
              Solutions we&apos;ve engineered for our clients
            </p>
          </SlideIn>
          <div className='py-12 grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 grid-cols-1'>
            {data.map((item, index) => (
              <SlideIn
                key={item._id}
                from={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.1}
              >
              <a
                href={item.link}
                className='group block'
                target='_blank'
              >
                <div className='aspect-16/12 overflow-hidden rounded-2xl relative bg-secondary/30'>
                  <Image
                    src={item.imageUrl}
                    alt='img-description'
                    fill
                    sizes='(max-width: 768px) 100vw, 50vw'
                    className='object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-2xl'
                  ></Image>
                </div>
                <div className='mt-4'>
                  <h2 className='text-lg font-semibold hover:underline'>
                    {item.title}
                  </h2>
                  <p className='mt-1 text-muted-foreground line-clamp-3'>
                    {item.description}
                  </p>
                  <div className='mt-3 flex flex-wrap gap-2 font-semibold'>
                    {item.tags.map((tagItem, index) => (
                      <span
                        className='inline-flex items-center rounded-md bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-bold text-primary ring-2 rinng-inset ring-primary/20'
                        key={index}
                      >
                        {tagItem}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
              </SlideIn>
            ))}
          </div>
        </section>
      </main>

      <CinematicFooter socials={socials} />
    </div>
  );
}
