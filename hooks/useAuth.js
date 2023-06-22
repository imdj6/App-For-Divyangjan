import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
