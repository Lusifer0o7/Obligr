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

import { loadUser } from "actions/userAction";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      console.log("not auth");
      //navigate("/login");
    }
    // If user is not an admin, redirect to login
    if (isAuthenticated && user && user.role.name !== "admin") {
      console.log("not user");

      //navigate("/login");
    }
    if (!user) {
      console.log("load user");
      dispatch(loadUser());
    }
  }, [user, isAuthenticated, dispatch]);

  if (!user) {
    return <>Loading...</>;
  }
  console.log(user);
  // Render children only if user is authenticated and is an admin
  // return isAuthenticated && user && user.role.name === "admin" ? (
  //   children
  // ) : (
  //   <>kuch nhi hua</>
  // );
};

export default ProtectedRoute;
