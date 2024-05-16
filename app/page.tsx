import { revalidatePath } from 'next/cache';
import Hero from './components/Hero';
import { SectionTwo } from './components/SectionTwo';
import { HomePageData } from './lib/interface';
import { client } from './lib/sanity';
import { AboutSection } from './components/AboutSection';
import { FavoriteProjects } from './components/FavoriteProjects';
import { Footer } from './components/Footer';

async function getHomePageData(): Promise<HomePageData> {
  const query = `*[_type == "home"][0]{
    header,
      subheader,
      "techstackUrls": techstack[].asset->url,
 "socialmediaaccounts": socialmediaaccounts[]{
    "imageUrl": image.asset->url,
    url,
      socialmedianame,
      username,
    
  },
        aboutmeheader,
      aboutmesubheader,
}`;
  const data = await client.fetch(query, {}, { next: { revalidate: 10 } }); //allows us to revalidate the page every 10 seconds to get the latest data  from sanity studio
  revalidatePath('/');
  return data;
}

export default async function Home() {
  const data: HomePageData = await getHomePageData();
  return (
    <div className='max-w-7xl w-full px-4 md:px-8 mx-auto'>
      <Hero data={data} />
      <SectionTwo data={data} />
      <AboutSection data={data} />
      <FavoriteProjects />
      <Footer />
    </div>
  );
}
