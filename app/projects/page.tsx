import Image from 'next/image';
import { ProjectsCard } from '../lib/interface';
import { client } from '../lib/sanity';

async function getData() {
  // GROQ Query
  const query = `*[_type == "project"]{
    title,
      _id,
      link,
      description,
      tags,
      "imageUrl":image.asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function ProjectsPage() {
  const data: ProjectsCard[] = await getData();
  return (
    <section className='max-w-7xl w-full px-4 md:px-8 mx-auto'>
      <h1 className='text-4xl font-bold lg:text-5xl pt-5'>Projects</h1>
      <p className='leading-7 text-muted-foreground'>
        Check out what projects I have created
      </p>
      <div className='py-12 grid md:grid-cols-2 gap -4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1'>
        {data.map((item) => (
          <a
            href={item.link}
            key={item._id}
            className='group block'
            target='_blank'
          >
            <div className='aspect-w-16 aspect-h-12 overflow-hidden rounded-2xl relative'>
              <Image
                src={item.imageUrl}
                alt='img-description'
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-2xl'
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
                  <span className='inline-flex items-center rounded-md bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-bold text-primary ring-2 rinng-inset ring-primary/20' key={index}>{tagItem}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}