'use server';

import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const validateString = (value: unknown, maxLength: number) => {
  if (!value || typeof value !== 'string' || value.length > maxLength) {
    return false;
  }
  return true;
};

export const sendEmail = async (formData: FormData) => {
  if (!resend) {
    return {
      error: 'Email service is not configured',
    };
  }

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

  await resend.emails.send({
    from: 'Portfolio Contact Form <onboarding@resend.dev>',
    to: 'nionelibarra@gmail.com',
    subject: subject as string,
    replyTo: senderEmail as string,
    text: `From: ${senderName} <${senderEmail}>\n\n${message}`,
  });
};
