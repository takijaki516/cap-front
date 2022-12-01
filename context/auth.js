import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");

  const useEmailFetch = () => {
    useEffect(() => {
      const storageData = localStorage.getItem("auth");
      if (!!storageData) {
        const emailData = JSON.parse(storageData).email;
        setUserEmail(emailData);
      } else {
        setUserEmail("");
      }
    }, []);
  };

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail, useEmailFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthContext);
