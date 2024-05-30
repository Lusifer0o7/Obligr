import React, { useState, useEffect } from "react";
import { motion, useScroll, useVelocity } from "framer-motion";
import { getAllHomeMenus } from "../actions/settingAction.js";
import { useDispatch, useSelector } from "react-redux";
import { UncontrolledTooltip } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/Header.css";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isInView, setIsInView] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState(null);
  const { loading, homeMenus, error } = useSelector(
    (state) => state.allHomeMenus
  );

  useEffect(() => {
    dispatch(getAllHomeMenus());
  }, []);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100); // 100ms delay after user stops scrolling
    };

    scrollY.on("change", handleScroll);
    return () => {
      scrollY.clearListeners();
      clearTimeout(scrollTimeout);
    };
  }, [scrollY]);

  useEffect(() => {
    const onChangeScroll = (latest) => {
      setIsAtTop(latest <= 0);
    };
    scrollY.on("change", onChangeScroll);
    return () => {
      scrollY.clearListeners();
    };
  }, [scrollY]);

  useEffect(() => {
    setIsInView(!isScrolling || isAtTop);
  }, [isScrolling, isAtTop]);

  if (loading || typeof loading === "undefined" || !homeMenus) {
    return <></>;
  }

  return (
    <motion.div
      animate={{ y: isInView ? 0 : "-100vh" }}
      transition={{ duration: 0.2, delay: 0.25, ease: "easeInOut" }}
      style={{
        height: "80px",
        position: "fixed",
        top: "0px",
        background: "rgba(0,0,0,0.8)",
        zIndex: 1,
        backdropFilter: "blur(10px)",
        width: "100vw",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        color: "white",
      }}
      onMouseLeave={() => setHoveredMenuIndex(null)}
    >
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          color: "white",
        }}
      >
        {homeMenus.map((menu, index) => {
          return (
            <div
              style={{
                textTransform: "uppercase",
                position: "relative",
                height: "100%",
                cursor: "pointer",
                fontSize: "1.2em",
                textShadow: "5px, 5px, blue",
              }}
              key={index}
              onMouseEnter={() => setHoveredMenuIndex(index)}
            >
              {menu.title}
              {hoveredMenuIndex === index && (
                <div
                  style={{
                    position: "absolute",
                    top: "113%",
                    left: "50%",
                    minWidth: "20vw",
                    transform: "translateX(-50%)",
                    background: "rgba(0,0,0,0.8)",
                    color: "white",
                    padding: "10px",
                    marginTop: "3.1vh",
                    backdropFilter: "blur(10px)",
                    boxShadow: "2px 2px 5px black",

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onMouseEnter={() => setHoveredMenuIndex(index)}
                  onMouseLeave={() => setHoveredMenuIndex(null)}
                >
                  {menu.subtitles.map((subtitle, index) => {
                    return (
                      <div
                        style={{
                          margin: "1.5em",
                          cursor: "pointer",
                          fontSize: "0.7em",
                        }}
                        key={index}
                      >
                        {subtitle}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginRight: "3em",
          display: "flex",
          gap: "2em",
          alignItems: "center",
        }}
      >
        <span>
          {/* <i class="fa-solid fa-magnifying-glass"></i> */}
          <div class="h-search-wrapper">
            <button class="h-search-icon">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M22 22L20 20"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <input
              type="text"
              name="text"
              class="h-search-input"
              placeholder="Search.."
            />
          </div>
        </span>

        <span
          style={{ fontSize: "1.3em" }}
          onMouseEnter={() => setHoveredMenuIndex("account")}
        >
          <i class="fa-solid fa-user"></i>
        </span>

        {hoveredMenuIndex === "account" && (
          <div
            style={{
              position: "absolute",
              top: "70%",
              right: "0%",
              minWidth: "20vw",

              background: "rgba(0,0,0,0.8)",
              color: "white",
              padding: "5px",
              marginTop: "3.1vh",
              boxShadow: "-2px 2px 5px black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onMouseEnter={() => setHoveredMenuIndex("account")}
            onMouseLeave={() => setHoveredMenuIndex(null)}
          >
            <div
              style={{
                margin: "1em",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "1em",
                }}
              >
                <button class="pushable">
                  <span class="shadow"></span>
                  <span class="edge"></span>
                  <span class="front" onClick={() => navigate("/login")}>
                    <i class="fa-solid fa-right-to-bracket"></i> Login
                  </span>
                </button>
              </div>
              <div style={{ textAlign: "center" }}>
                Don't have account?{" "}
                <span style={{ color: "rgb(255,69,0)", cursor: "pointer" }}>
                  Sign Up
                </span>
              </div>
              <hr style={{ color: "white !important" }} />
              <div
                style={{
                  padding: "10px, 20px",
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "auto auto ",
                }}
              >
                <div
                  style={{
                    color: "white",
                    margin: "15px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Your Account
                </div>
                <div
                  style={{
                    color: "white",
                    margin: "15px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  Your Orders
                </div>
                <div
                  style={{
                    color: "white",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    margin: "15px",
                  }}
                >
                  Your Wishlist
                </div>
                <div
                  style={{
                    color: "white",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    margin: "15px",
                  }}
                >
                  Your Favorites
                </div>
              </div>
            </div>
          </div>
        )}

        <span style={{ fontSize: "1.3em" }}>
          <span
            style={{
              width: "1.5em",
              height: "1.5em",
              fontSize: "0.8em",
              position: "absolute",
              top: "1em",
              right: "1.7em",
              background: "rgb(255,69,0)",
              borderRadius: "50%",
              textAlign: "center",
            }}
          >
            0
          </span>
          <i class="fa-solid fa-cart-shopping"></i>
        </span>
      </div>
    </motion.div>
  );
}
