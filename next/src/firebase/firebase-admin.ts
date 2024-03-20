import * as admin from "firebase-admin";
import * as serviceAccount from "./config/firebaseConfig.json";
import { v4 as uuidv4 } from "uuid";

class FirebaseAdminSingleton {
  private static instance: FirebaseAdminSingleton;
  private firebaseApp: admin.app.App;

  private constructor() {
    this.firebaseApp = admin.initializeApp(
      {
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount
        ),
      },
      `backend_${uuidv4()}`
    );
  }

  public static getInstance(): FirebaseAdminSingleton {
    if (!FirebaseAdminSingleton.instance) {
      FirebaseAdminSingleton.instance = new FirebaseAdminSingleton();
    }

    return FirebaseAdminSingleton.instance;
  }

  public getAuth(): admin.auth.Auth {
    return this.firebaseApp.auth();
  }
}

const firebaseAdminInstance = FirebaseAdminSingleton.getInstance();
export const auth = firebaseAdminInstance.getAuth();
