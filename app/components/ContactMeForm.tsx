'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { sendEmail } from '../api/sendEmail';
import { useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface ContactMeFormProps {
  buttonText: string;
  buttonSelect?: 'primary';
}

export function ContactMeForm({
  buttonText,
  buttonSelect,
}: ContactMeFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { width, height } = useWindowSize();

  const handleSubmit = async (formData: FormData) => {
    await sendEmail(formData);
    setIsOpen(false);
    setIsConfirmationOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {buttonSelect == 'primary' ? (
            <Button className='hidden sm:flex'>{buttonText}</Button>
          ) : (
            <a className='relative inline-block text-lg group mt-5'>
              <span className='relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white'>
                <span className='absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50'></span>
                <span className='absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease'></span>
                <span className='relative'>Get in Touch!</span>
              </span>
              <span
                className='absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0'
                data-rounded='rounded-lg'
              ></span>
            </a>
          )}
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-3xl mb-2 md:text-center'>
              {' '}
              📮 Hit me up!
            </DialogTitle>
            <DialogDescription className='text-md text-center'>
              🤝Have an inquiry or need me for hire? Feel free to reach out!
            </DialogDescription>
          </DialogHeader>
          <form
            action={(formData) => {
              handleSubmit(formData);
            }}
          >
            <div className='flex items-center space-x-2 flex-col'>
              <Input
                type='text'
                placeholder='Name'
                className='w-full mb-4'
                name='senderName'
              />
              <Input
                type='email'
                placeholder='Email'
                className='w-full mb-4'
                name='senderEmail'
              />
              <Input
                type='text'
                placeholder='Subject'
                className='w-full mb-4'
                name='subject'
              />
              <Textarea
                placeholder='Type your message here.'
                className='w-full'
                name='message'
              />
            </div>

            <DialogFooter className='sm:justify-start mt-4'>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Close
                </Button>
              </DialogClose>
              <Button type='submit' variant='default'>
                Send ✔️
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-4xl text-center'>
              {' '}
              🎉 Message Sent!
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className='text-center text-md'>
            Thanks for reaching out! I&apos;ll be replying soon 😉
          </DialogDescription>
          <DialogFooter className='sm:justify-start mt-4'>
            <DialogClose asChild>
              <Button
                onClick={() => setIsConfirmationOpen(false)}
                variant='default'
                className='w-full'
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
        {isConfirmationOpen && <Confetti width={width} height={height} />}
      </Dialog>
    </>
  );
}
