import React, { useState } from "react";

const UserContext = React.createContext({ email: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "", auth: false });
  const loginContext = (email, token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };
  const logOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };
  return (
    <UserContext.Provider value={{ user, loginContext, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
