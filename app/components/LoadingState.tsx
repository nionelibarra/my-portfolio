import { Skeleton } from '@/components/ui/skeleton';

export function LoadingMessages() {
  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex items-center w-full space-x-4'>
        <Skeleton className='h-10 w=1- rounded-lg'></Skeleton>
      </div>
      <div className='space-y-2 flex flex-col'>
        <Skeleton className='h-4 w-[250px]'/>
        <Skeleton className='h-4 w-[200px]'/>
      </div>
      <div className='flex items-center w-full space-x-4'>
        <Skeleton className='h-10 w=1- rounded-lg'></Skeleton>
      </div>
      <div className='space-y-2 flex flex-col'>
        <Skeleton className='h-4 w-[250px]'/>
        <Skeleton className='h-4 w-[200px]'/>
      </div>
      <div className='flex items-center w-full space-x-4'>
        <Skeleton className='h-10 w=1- rounded-lg'></Skeleton>
      </div>
      <div className='space-y-2 flex flex-col'>
        <Skeleton className='h-4 w-[250px]'/>
        <Skeleton className='h-4 w-[200px]'/>
      </div>
      <div className='flex items-center w-full space-x-4'>
        <Skeleton className='h-10 w=1- rounded-lg'></Skeleton>
      </div>
      <div className='space-y-2 flex flex-col'>
        <Skeleton className='h-4 w-[250px]'/>
        <Skeleton className='h-4 w-[200px]'/>
      </div>
      <div className='flex items-center w-full space-x-4'>
        <Skeleton className='h-10 w=1- rounded-lg'></Skeleton>
      </div>
      <div className='space-y-2 flex flex-col'>
        <Skeleton className='h-4 w-[250px]'/>
        <Skeleton className='h-4 w-[200px]'/>
      </div>
      <div className='flex items-center w-full space-x-4'>
        <Skeleton className='h-10 w=1- rounded-lg'></Skeleton>
      </div>
      <div className='space-y-2 flex flex-col'>
        <Skeleton className='h-4 w-[250px]'/>
        <Skeleton className='h-4 w-[200px]'/>
      </div>
    </div>
  );
}


export function GuestBookFormLoading(){
    return(
        <div className='w-full'>
            <Skeleton className='h-10 rounded-lg w-full'/>
        </div>
    )
}
