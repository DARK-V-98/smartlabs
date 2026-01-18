'use server';

import { createHash } from 'crypto';
import { payhereUrls, coursePrices, detailedCourseData } from '@/lib/payhere';

export type ServerActionState = {
    success: boolean;
    message: string;
    payload?: any; 
}

export async function enrollAction(prevState: ServerActionState, formData: FormData): Promise<ServerActionState> {
  const formValues = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    course: formData.get('course') as string,
    freeDemo: formData.get('freeDemo') === 'on',
    userId: formData.get('userId') as string,
  };
  
  const userEmail = formValues.email;

  if (!userEmail || !formValues.userId) {
      return { success: false, message: 'User not found. Please log in to enroll.' };
  }
  
  if (formValues.freeDemo) {
      // Here you could add logic to save the demo request to your database
      return { success: true, message: 'Free demo requested! We will contact you shortly.' };
  }
  
  const selectedCourse = detailedCourseData.find(c => c.title === formValues.course);
  if (!selectedCourse) {
      return { success: false, message: 'Invalid course selected.' };
  }

  const amount = coursePrices[formValues.course];
  if (!amount) {
      return { success: false, message: 'Invalid course price.' };
  }

  const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID;
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

  if (!merchantId || !merchantSecret) {
    console.error("Payhere credentials are not set in environment variables.");
    return { success: false, message: "Payment gateway is not configured." };
  }
  
  const order_id = `${formValues.userId}__${selectedCourse.id}__${Date.now()}`;
  const amount_formatted = amount.toFixed(2);
  const currency = 'LKR';
  
  const md5 = (data: string) => createHash('md5').update(data).digest('hex').toUpperCase();

  const hashed_secret = md5(merchantSecret);
  const hash_string = merchantId + order_id + amount_formatted + currency + hashed_secret;
  const hash = md5(hash_string);

  const payload = {
    merchant_id: merchantId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payhere/notify`,
    order_id: order_id,
    items: formValues.course,
    currency: currency,
    amount: amount_formatted,
    first_name: formValues.fullName.split(' ')[0],
    last_name: formValues.fullName.split(' ').slice(1).join(' ') || formValues.fullName.split(' ')[0],
    email: userEmail,
    phone: formValues.phone,
    address: '',
    city: '',
    country: 'Sri Lanka',
    hash: hash,
  };

  return { success: true, message: 'Redirecting to payment...', payload };
}
