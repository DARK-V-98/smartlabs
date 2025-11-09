
'use client';

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');

    return (
        <div className="w-full">
            <div className="container mx-auto flex min-h-[calc(100vh-12rem)] items-center justify-center py-12">
                <Card className="w-full max-w-lg text-center shadow-lg">
                    <CardHeader>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <CardTitle className="mt-4 text-3xl font-headline">Payment Successful!</CardTitle>
                        <CardDescription className="text-lg">Thank you for your enrollment.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Your payment has been processed successfully. Your spot is confirmed! You will receive a confirmation email shortly with further details.
                        </p>
                        {orderId && (
                            <p className="mt-4 text-sm text-muted-foreground">
                                Your Order ID is: <span className="font-mono bg-muted p-1 rounded-md">{orderId}</span>
                            </p>
                        )}
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/dashboard">Go to Your Dashboard</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
