import Image from 'next/image';
import square from '../../public/square.svg';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HomePageData } from '../lib/interface';
import { Button } from '@/components/ui/button';

export async function SectionTwo({ data }: { data: HomePageData }) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10 '>
      <div className='w-full relative col-span-1'>
        <Image
          src={square}
          alt='square'
          className='w-full h-full object-cover rounded-2xl'
        />
      </div>
      <div className='flex flex-col w-full col-span-1 lg:col-span-2 gap-4'>
        <Card className='bg-gray-100 border-none'>
          <CardHeader>
            {' '}
            <CardTitle>Explore my stack</CardTitle>
            <CardDescription>Check out the tools I use daily</CardDescription>
            <CardContent className='flex flex-wrap gap-4 p-0'>
              {data.techstackUrls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`Tech stack image ${index + 1}`}
                  width={64} // default width
                  height={64} // default height
                  className='object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-2xl'
                />
              ))}
            </CardContent>
          </CardHeader>
        </Card>
        <div className='grid grid-cols-1 sm:grid-cols-3 w-full gap-4'>
          {data.socialmediaaccounts.map((item, index) => (
            <Card
              key={index}
              className='p-4 flex flex-col items-center sm:items-start bg-gray-100 border-none'
            >
              <Image
                src={item.imageUrl}
                alt='soc-med'
                width={64} // default width
                height={64} // default height
                className='object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-2xl'
              />

              <h1 className='text-2xl font-bold mt-3'>
                {item.socialmedianame}
              </h1>
              <p className='text-muted-foreground'>{item.username}</p>

              <Button className='mt-4' size='sm' asChild>
                <a href={item.url} target='_blank' rel='noopener noreferrer'>
                  Follow
                </a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
