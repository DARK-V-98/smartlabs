import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccountString = process.env.FIREBASE_ADMIN_CONFIG;
    if (!serviceAccountString) {
        throw new Error("FIREBASE_ADMIN_CONFIG environment variable is not set.");
    }
    
    const serviceAccount = JSON.parse(serviceAccountString);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (e: any) {
    console.error('Firebase admin initialization error:', e.message);
  }
}

let adminDb, adminAuth;

try {
  adminDb = admin.firestore();
  adminAuth = admin.auth();
} catch (e: any) {
    console.error('Failed to get Firestore or Auth instance from Firebase Admin SDK:', e.message);
}

export { adminDb, adminAuth };
