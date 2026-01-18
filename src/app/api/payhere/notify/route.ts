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
                const [userId, courseId] = (order_id as string).split('__');
                
                if (!userId || !courseId) {
                    throw new Error(`Invalid order_id format: ${order_id}`);
                }
                
                if (!adminDb) {
                    throw new Error("Firebase Admin DB is not initialized.");
                }

                const enrollmentRef = adminDb.collection('users').doc(userId).collection('enrollments').doc(courseId);
                const userRef = adminDb.collection('users').doc(userId);
                const paymentRef = adminDb.collection('payments').doc(data.payment_id as string);
                
                await adminDb.runTransaction(async (transaction) => {
                    const userDoc = await transaction.get(userRef);
                    
                    // Create enrollment record
                    transaction.set(enrollmentRef, {
                        userId: userId,
                        courseId: courseId,
                        enrollmentDate: FieldValue.serverTimestamp(),
                        paymentStatus: 'paid',
                        orderId: order_id,
                        paymentId: data.payment_id,
                    });
                    
                    // Create payment log record
                    transaction.set(paymentRef, {
                        id: data.payment_id,
                        userId: userId,
                        courseId: courseId,
                        orderId: order_id,
                        amount: payhere_amount,
                        currency: payhere_currency,
                        statusCode: status_code,
                        paymentTimestamp: FieldValue.serverTimestamp(),
                    });

                    // Update user role if they are not yet a student or have a higher role
                    if (userDoc.exists && userDoc.data()?.role === 'user') {
                       transaction.update(userRef, { role: 'student' });
                    }
                });

                console.log(`Successfully enrolled user ${userId} in course ${courseId}`);

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
