import React, { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext({});

// const auth=getAuth();

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = (email,password,name) => {
    console.log(email,password,name);
  };

  return (
    <AuthContext.Provider
      value={{
        user:false
        ,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
