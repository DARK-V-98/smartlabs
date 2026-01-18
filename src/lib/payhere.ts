
export const payhereConfig = {
    sandbox: process.env.NODE_ENV !== 'production',
    merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID || '1232775', // Use your sandbox merchant ID
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payhere/notify`,
};

export const coursePrices: { [key: string]: number } = {
    'PTE - Online Boostify Session': 25000,
    'PTE - Physical + Online Hybrid': 30000,
    'IELTS - Weekend Group Class': 30000,
    'CELPIP - Self-Paced Program': 25000,
};

// This type definition is for the Payhere object available on the window
declare global {
  interface Window {
    payhere: {
      startPayment: (payment: any) => void;
      onCompleted: (orderId: string) => void;
      onDismissed: () => void;
      onError: (error: string) => void;
    };
  }
}

    
