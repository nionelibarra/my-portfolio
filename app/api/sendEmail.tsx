'use server';

import { Resend } from 'resend';
import ContactFormEmail from '../email/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

const validateString = (value: unknown, maxLength: number) => {
  if (!value || typeof value !== 'string' || value.length > maxLength) {
    return false;
  }
  return true;
};

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get('senderEmail');
  const message = formData.get('message');
  const senderName = formData.get('senderName');
  const subject = formData.get('subject');

  if (!validateString(message, 5000)) {
    return {
      error: 'Invalid message',
    };
  }

  if (!validateString(senderEmail, 100)) {
    return {
      error: 'Invalid sender email',
    };
  }

  if (!validateString(subject, 500)) {
    return {
      error: 'Invalid subject',
    };
  }

  //   console.log('running sendEmail function');
  //   console.log(formData.get('senderEmail'));
  //   console.log(formData.get('senderName'));
  //   console.log(formData.get('subject'));
  //   console.log(formData.get('message'));

  await resend.emails.send({
    from: 'Portfolio Contact Form <onboarding@resend.dev>',
    to: 'nionelibarra@gmail.com',
    subject: subject as string,
    reply_to: senderEmail as string,
    react: (
      <ContactFormEmail
        message={message as string}
        senderEmail={senderEmail as string}
      />
    ),
  });
};
