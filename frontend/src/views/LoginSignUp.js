import React, { useRef } from "react";
import { useState, useEffect, Fragment } from "react";
import "../assets/css/LoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  login,
  register,
  sendEmailOtp,
  verifyEmailOtp,
  sendMobileOtp,
  verifyMobileOtp,
} from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PhoneNumberUtil } from "google-libphonenumber";
import Spinner from "components/Spinner";
import Map from "components/Map";

function LoginSignUp() {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const {
    error: emailotpError,
    loading: emailotpLoading,
    emailOtpSent,
    emailOtpVerified,
  } = useSelector((state) => state.verifyEmailOtp);

  const {
    error: mobileotpError,
    loading: mobileotpLoading,
    mobileOtpSent,
    mobileOtpVerified,
  } = useSelector((state) => state.verifyMobileOtp);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(2);
  const phoneUtil = PhoneNumberUtil.getInstance();
  const [country_code, setCountry_code] = useState("");

  useEffect(() => {
    if (emailotpError || mobileotpError) {
      toast.error(emailotpError, { toastId: "error" });
      toast.error(mobileotpError, { toastId: "error" });
      dispatch(clearErrors());
    }
    if (emailOtpVerified) {
      toast.success("Email verified Successfully.");
    }
    if (mobileOtpVerified) {
      toast.success("Mobile number verified Successfully.");
    }
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [dispatch, emailotpError, mobileotpError, toast, isAuthenticated, error]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  //signup
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    if (user.password === user.confirmPassword) {
      dispatch(register(user));
    } else {
      toast.error("Passwords does not match", { toastId: "error" });
    }
  };

  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };
  const isValidPhone = isPhoneValid(user.phone);

  const nextStep = () => {
    if (step == 1) {
      if (user.firstName == "" || user.lastName == "") {
        return toast.error("Enter All Fields");
      }
    }
    if (step == 2) {
      const emailReg = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
      if (user.email == "") {
        return toast.error("Enter Email");
      } else if (!emailReg.test(user.email)) {
        return toast.error("Enter Valid Email");
      }
    }
    if (step == 3) {
      if (user.phone == "") {
        return toast.error("Enter Phone Number");
      }
    }
    if (step == 4) {
      if (user.password == "" || user.confirmPassword == "") {
        return toast.error("Enter All Fields");
      }
      if (user.password !== user.confirmPassword) {
        return toast.error("Password do not match");
      }
    }
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const verifyEmail = (event) => {
    const emailOtp = generateOTP();
    dispatch(verifyEmailOtp(emailOtp));
    setOtpDigits(["", "", "", "", "", ""]);
  };

  const verifyMobile = (event) => {
    const mobileOtp = generateOTP();
    dispatch(verifyMobileOtp(mobileOtp));
  };

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleOtpInput = (index, value) => {
    // Create a copy of the current OTP digits array
    const newOtpDigits = [...otpDigits];
    // Update the value at the specified index
    newOtpDigits[index] = value;
    // Update the state with the new OTP digits array
    setOtpDigits(newOtpDigits);
    // Move focus to the next input field if a digit is typed
    if (value && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  // Function to handle keydown events in OTP input fields
  const handleInputKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && !otpDigits[index]) {
      // Move focus to the previous input field if backspace is pressed
      otpRefs[index - 1].current.focus();
    }
  };

  const generateOTP = () => {
    // Concatenate the OTP digits to form the OTP
    const Otp = otpDigits.join("");
    // Display or use the OTP as required
    return parseInt(Otp);
  };

  const removeCountryCode = (phone) => {
    // Regular expression to match country code
    var countryCodeRegex = /^\+\d{1,2}[\s\-]*(\(\d{1,}\)[\s\-]*)?/;

    // Replace the country code with an empty string
    var cleanedNumber = phone.replace(countryCodeRegex, "");

    return cleanedNumber;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step">
            <input
              type="text"
              className="loginsignupinput"
              name="firstName"
              value={user.firstName}
              onChange={registerDataChange}
              placeholder="First Name"
            />
            <input
              type="text"
              className="loginsignupinput"
              name="lastName"
              value={user.lastName}
              onChange={registerDataChange}
              placeholder="Last Name"
            />
            <button className="loginsignupbutton" onClick={nextStep}>
              Next
            </button>
          </div>
        );

      case 2:
        return (
          <div className="step">
            <div className="input-group">
              <input
                type="text"
                name="email"
                //className="loginsignupinput"
                id="email-field"
                value={user.email}
                onChange={registerDataChange}
                placeholder="Email"
              />

              {emailOtpSent ? (
                emailOtpVerified ? (
                  <button className="get-otp-button" onClick={nextStep}>
                    <span>Next</span>
                  </button>
                ) : (
                  <button disabled="true" className="get-otp-button">
                    <span>Done.</span>
                  </button>
                )
              ) : (
                <button
                  className="get-otp-button" //send otp
                  onClick={() => dispatch(sendEmailOtp(user.email))}
                >
                  {emailotpLoading ? (
                    <span style={{ margin: "25px" }}>
                      <Spinner />
                    </span>
                  ) : (
                    <span>Get OTP</span>
                  )}
                </button>
              )}

              {emailOtpSent && !emailOtpVerified ? (
                <div className="otp-Form">
                  <span className="mainHeading">Enter OTP</span>
                  <div className="inputContainer">
                    {/* Map over the OTP digits state to render input fields */}
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        maxLength="1"
                        type="text"
                        className="otp-input"
                        value={digit}
                        // Update the state when input changes
                        onChange={(e) => handleOtpInput(index, e.target.value)}
                        // Handle keydown events
                        onKeyDown={(e) => handleInputKeyDown(index, e)}
                        // Assign a ref to each input field
                        ref={otpRefs[index]}
                      />
                    ))}
                  </div>

                  <button className="verifyButton" onClick={verifyEmail}>
                    Verify
                  </button>
                  <p className="resendNote">
                    Didn't receive the code?
                    <button className="resendBtn">Resend Code</button>
                  </p>
                </div>
              ) : (
                <></>
              )}

              {emailOtpVerified && (
                <div className="otp-Form">
                  <img
                    alt="Email Verified"
                    src={require("../assets/img/Animation - 1713950659441 (1).gif")}
                  ></img>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step">
            <div className="input-group">
              <PhoneInput
                defaultCountry="in"
                value={user.phone}
                onChange={(phone, country) => {
                  setUser({ ...user, phone: phone });
                  setCountry_code(country.country.iso2);
                }}
              />
              {mobileOtpSent ? (
                mobileOtpVerified ? (
                  <button className="get-otp-button" onClick={nextStep}>
                    <span>Next</span>
                  </button>
                ) : (
                  <button disabled="true" className="get-otp-button">
                    <span>Done.</span>
                  </button>
                )
              ) : (
                <button
                  className="get-otp-button" //send otp
                  disabled={!isValidPhone}
                  onClick={() =>
                    dispatch(
                      sendMobileOtp(removeCountryCode(user.phone), country_code)
                    )
                  }
                >
                  {mobileotpLoading ? (
                    <span style={{ margin: "25px" }}>
                      <Spinner />
                    </span>
                  ) : (
                    <span>Get OTP</span>
                  )}
                </button>
              )}
            </div>

            {!isValidPhone && (
              <div className="phone-valid">Enter valid phone number.</div>
            )}

            {mobileOtpSent && !mobileOtpVerified ? (
              <div className="otp-Form" style={{ margin: "auto" }}>
                <span className="mainHeading">Enter OTP</span>
                <div className="inputContainer">
                  {/* Map over the OTP digits state to render input fields */}
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      maxLength="1"
                      type="text"
                      className="otp-input"
                      value={digit}
                      // Update the state when input changes
                      onChange={(e) => handleOtpInput(index, e.target.value)}
                      // Handle keydown events
                      onKeyDown={(e) => handleInputKeyDown(index, e)}
                      // Assign a ref to each input field
                      ref={otpRefs[index]}
                    />
                  ))}
                </div>

                <button className="verifyButton" onClick={verifyMobile}>
                  Verify
                </button>
                <p className="resendNote">
                  Didn't receive the code?
                  <button className="resendBtn">Resend Code</button>
                </p>
              </div>
            ) : (
              <></>
            )}

            {mobileOtpVerified && (
              <div className="otp-Form" style={{ margin: "auto" }}>
                <img
                  alt="Email Verified"
                  src={require("../assets/img/Animation - 1713950659441 (1).gif")}
                ></img>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="step">
            <input
              type="password"
              className="loginsignupinput"
              name="password"
              value={user.password}
              onChange={registerDataChange}
              placeholder="Password"
            />
            <input
              type="password"
              className="loginsignupinput"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={registerDataChange}
              placeholder="Confirm Password"
            />
            {/* <button className="loginsignupbutton" onClick={prevStep}>
              Previous
            </button> */}
            <button className="loginsignupbutton" onClick={handleSignupSubmit}>
              Submit
            </button>
          </div>
        );
      default:
        return null;
    }
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

            <div>{renderStep()}</div>
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
      {/* <Map /> */}
    </div>
  );
}

export default LoginSignUp;
