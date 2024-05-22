// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   if (isAuthenticated === false) {
//     navigate("/login");
//   }

//   if (user.role !== "admin") {
//     navigate("/login");
//   }
//   console.log(user);
//   return children;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useSelector((state) => state.user);

  const [auth, setAuth] = useState();

  useEffect(() => {
    // If user is not authenticated, redirect to login

    setAuth(localStorage.getItem(`is${user.role.name}Authenticated`));
  }, []);

  // Render children only if user is authenticated and is an admin
  return (
    <>
      {auth ? <>{children}</> : <>{navigate(`${user.role.name}/dashboard`)}</>}
    </>
  );
};

export default ProtectedRoute;
