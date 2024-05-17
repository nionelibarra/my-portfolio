import { Card } from '@/components/ui/card';
import me from '../../public/me.jpg';
import Image from 'next/image';
import { HomePageData } from '../lib/interface';
import { ContactMeForm } from './ContactMeForm';

export function AboutSection({ data }: { data: HomePageData }) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10'>
      <Card className='col-span-1 lg:col-span-2 border-none bg-gray-100 p-8'>
        <h1 className='text-4xl lg:text-6xl'>
          {data.aboutmeheader ?? 'Loading..'}
        </h1>
        <p className='mt-4 text-muted-foreground lg:text-lg'>
          {data.aboutmesubheader ?? 'Loading..'}
        </p>
        <ContactMeForm buttonText='Get in Touch!' />
      </Card>
      <div className='col-span-1'>
        <Image
          src={data.profilepictwo ?? me}
          alt='Neyo Ibarra'
          className='h-[500px] object-cover rounded-lg w-full'
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
