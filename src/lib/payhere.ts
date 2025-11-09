
export const payhereConfig = {
    sandbox: process.env.NODE_ENV !== 'production',
    merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID || '1227125', // Use your sandbox merchant ID
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payhere/notify`,
};

export const coursePrices: { [key: string]: number } = {
    'PTE': 30000,
    'IELTS': 30000,
    'CELPIP': 25000, 
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
