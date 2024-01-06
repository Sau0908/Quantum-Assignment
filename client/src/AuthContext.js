import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("Token exists:", token);
      setAuthenticated(true);
    } else {
      console.log("Token not found");
    }
  }, []); // Make sure to include token as a dependency if needed

  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    window.location.href = "/"; // Redirect to the home page after logout
  };

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
