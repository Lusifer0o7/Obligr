import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { loadImpersonatedUser } from "../actions/userAction";

const Impersonate = ({ history }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { impUser, loading } = useSelector((state) => state.impUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const impUserId = id;

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    } else {
      dispatch(loadImpersonatedUser(impUserId));
    }
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {user.role === "admin" ? (
            <Button onClick={() => navigate("/admin/users")}>see users</Button>
          ) : (
            ""
          )}
          <h2>This is a {impUser.role} portal.</h2>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{impUser.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{impUser.email}</p>
              </div>
              <div>
                <h4>Address</h4>
                <p>{impUser.address}</p>
              </div>
              <div>
                <h4>Role</h4>
                <p>{impUser.role}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(impUser.createdAt)}</p>
              </div>
              <div>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Impersonate;
