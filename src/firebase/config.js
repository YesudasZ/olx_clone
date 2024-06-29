import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD4DWMaCU97r6nCtdc-NJqDrHMQBiwqm44',
  authDomain: 'olx-clone-cad87.firebaseapp.com',
  projectId: 'olx-clone-cad87',
  storageBucket: 'olx-clone-cad87.appspot.com',
  messagingSenderId: '117708158420',
  appId: '1:117708158420:web:84566a1973e4efdc6b9241',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };


