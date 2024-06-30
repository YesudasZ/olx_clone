import { createContext, useState, useEffect } from "react";
import { auth } from '../firebase/config';
import { onAuthStateChanged } from "firebase/auth";

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

export default function Context({children}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}