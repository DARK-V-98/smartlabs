
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const md5 = (data: string) => createHash('md5').update(data).digest('hex').toUpperCase();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());

        const {
            merchant_id,
            order_id,
            payhere_amount,
            payhere_currency,
            status_code,
            md5sig,
            payment_id
        } = data;

        const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

        if (!merchantSecret) {
            console.error('Payhere merchant secret not found in environment variables.');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const local_md5sig = md5(
            merchant_id +
            order_id +
            payhere_amount +
            payhere_currency +
            status_code +
            md5(merchantSecret)
        );
        
        if (local_md5sig !== md5sig) {
            console.warn(`MD5 signature mismatch for order ${order_id}.`);
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        if (status_code === '2') { // Payment success
            try {
                const [userId, courseId, batchId] = (order_id as string).split('__');
                
                if (!userId || !courseId || !batchId) {
                    throw new Error(`Invalid order_id format: ${order_id}`);
                }
                
                if (!adminDb) {
                    throw new Error("Firebase Admin DB is not initialized.");
                }

                // Use the unique payment_id from Payhere as the enrollment document ID
                const enrollmentRef = adminDb.collection('users').doc(userId).collection('enrollments').doc(payment_id as string);
                const paymentRef = adminDb.collection('payments').doc(payment_id as string);

                // Simplified data creation without a complex transaction to improve reliability
                const enrollmentData = {
                    userId: userId,
                    courseId: courseId,
                    batchId: batchId,
                    batchName: 'Default Batch', // This can be fetched on the client if needed
                    enrollmentDate: FieldValue.serverTimestamp(),
                    paymentStatus: 'paid',
                    enrollmentStatus: 'pending',
                    orderId: order_id,
                    paymentId: payment_id,
                };
                
                const paymentData = {
                    id: payment_id,
                    userId: userId,
                    courseId: courseId,
                    orderId: order_id,
                    amount: payhere_amount,
                    currency: payhere_currency,
                    statusCode: status_code,
                    paymentTimestamp: FieldValue.serverTimestamp(),
                };

                // Perform writes directly. If one fails, the error will be logged.
                await enrollmentRef.set(enrollmentData);
                await paymentRef.set(paymentData);

                console.log(`Successfully created pending enrollment for user ${userId} in course ${courseId}`);

            } catch (error) {
                console.error('Error processing successful payment in DB:', error);
                // Still return 200 to PayHere to acknowledge receipt, but log the error
            }
        } else {
            console.log(`Payment status not successful for order ${order_id}. Status: ${status_code}`);
        }

        return NextResponse.json({ status: 'ok' }, { status: 200 });

    } catch (error) {
        console.error('Error in Payhere notify route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
