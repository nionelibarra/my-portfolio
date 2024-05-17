'use client'
import Image from 'next/image';
import me from '../../public/me.jpg';
import { HomePageData } from '../lib/interface';
import { ContactMeForm } from './ContactMeForm';
import { Cursor, useTypewriter } from 'react-simple-typewriter'



export default function Hero({ data }: { data: HomePageData }) {
  const [typewriterText,count]=useTypewriter({
    words: ['Welcome to my portfolio!',data.subheader],
    loop:true,
    delaySpeed:500,
    deleteSpeed:50,
  })
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
      <div className='col-span-1 lg:col-span-2 h-full bg-gray-100 min-h-[500px] lg:min-h-[300px] rounded-2xl p-8'>
        <h1 className='text-4xl md:text-6xl font-medium'>
          {data.header ?? 'Loading...'}
        </h1>
        <h1 className='text-4xl lg:text-6xl font-normal mt-3'>
          {/* {data.subheader ?? 'Loading...'} */}
          {typewriterText}
          <Cursor/>
        </h1>
        <ContactMeForm buttonText='Get in touch!'/>
      </div>
      <Image
        src={data.profilepic ?? me}
        alt='Neyo Ibarra'
        className='col-span-1 h-[500px] object-cover rounded-2xl bg-gray-100'
        width={500}
        height={500}
        priority
      />
    </div>
  );
}
