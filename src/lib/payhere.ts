
export const payhereConfig = {
    sandbox: true, // Force sandbox mode for now
    merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payhere/notify`,
};

export const payhereUrls = {
    checkout: 'https://sandbox.payhere.lk/pay/checkout',
};


export const coursePrices: { [key: string]: number } = {
    'PTE - Online Boostify Session': 25000,
    'PTE - Physical + Online Hybrid': 30000,
    'IELTS - Weekend Group Class': 30000,
    'CELPIP - Self-Paced Program': 25000,
};

export const detailedCourseData = [
    { id: "pte-online", title: 'PTE - Online Boostify Session' },
    { id: "pte-hybrid", title: 'PTE - Physical + Online Hybrid' },
    { id: "ielts-weekend", title: 'IELTS - Weekend Group Class' },
    { id: "celpip-self", title: 'CELPIP - Self-Paced Program' },
];
