import React from "react";
import { useState, useEffect, Fragment } from "react";
import "../assets/css/LoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function LoginSignUp() {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [dispatch, error, toast, isAuthenticated]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  //signup
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    dispatch(register(user));
  };

  return (
    <div className="loginsignup">
      <div className="loginsignupmain">
        <input
          className="loginsignupinput"
          type="checkbox"
          id="chk"
          aria-hidden="true"
        />

        <div className="signup">
          <form onSubmit={handleSignupSubmit}>
            <label
              className="loginsignuplabel"
              htmlFor="chk"
              aria-hidden="true"
            >
              Sign up
            </label>
            <input
              className="loginsignupinput"
              type="text"
              name="name"
              placeholder="Name"
              required
              onChange={registerDataChange}
            />
            <input
              className="loginsignupinput"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={registerDataChange}
            />
            <input
              className="loginsignupinput"
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={registerDataChange}
            />
            <button className="loginsignupbutton" type="submit">
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLoginSubmit}>
            <label
              className="loginsignuplabel"
              htmlFor="chk"
              aria-hidden="true"
            >
              Login
            </label>
            <input
              className="loginsignupinput"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="loginsignupinput"
              type="password"
              name="pswd"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginsignupbutton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp;
