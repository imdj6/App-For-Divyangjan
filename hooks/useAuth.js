import React, { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext({});

// const auth=getAuth();

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = () => {
    console.log("button is clicked");
  };

  return (
    <AuthContext.Provider
      value={{
        user:true
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
