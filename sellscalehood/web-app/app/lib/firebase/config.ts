// import * as admin from 'firebase-admin';

// export function Firebase {
//   private app: admin.app.App;

//   constructor() {
//     this.initializeApp();
//   }

//   private initializeApp(): void {
//     const firebaseConfig: admin.ServiceAccount = {
//       type: process.env.FIREBASE_TYPE as string,
//       projectId: process.env.FIREBASE_PROJECT_ID as string,
//       privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID as string,
//       privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
//       clientId: process.env.FIREBASE_CLIENT_ID as string,
//       authUri: process.env.FIREBASE_AUTH_URI as string,
//       tokenUri: process.env.FIREBASE_TOKEN_URI as string,
//       authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL as string,
//       clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL as string
//     };

//     if (!admin.apps.length) {
//       this.app = admin.initializeApp({
//         credential: admin.credential.cert(firebaseConfig)
//       });
//     } else {
//       this.app = admin.app();
//     }
//   }

//   public config(): FirebaseFirestore.Firestore {
//     return admin.firestore(this.app);
//   }
// }
