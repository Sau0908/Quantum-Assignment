import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../component/Auth/Login";
import Signup from "../component/Auth/Signup";
import User from "../component/User/User";
import { AuthContext } from "../AuthContext";

const AllRoutes = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  console.log("isAut", authenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [setAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={authenticated ? <Navigate to="/user" /> : <Signup />}
        />
        <Route
          path="/"
          element={authenticated ? <Navigate to="/user" /> : <Login />}
        />
        {authenticated && <Route path="/user" element={<User />} />}
        {!authenticated && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
