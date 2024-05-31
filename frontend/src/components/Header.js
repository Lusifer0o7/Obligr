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
      className="h-menu-container"
      onMouseLeave={() => setHoveredMenuIndex(null)}
    >
      <div style={{}}>
        <label class="hamburger">
          <input type="checkbox" />
          <svg viewBox="0 0 32 32">
            <path
              class="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path class="line" d="M7 16 27 16"></path>
          </svg>
        </label>
      </div>
      <div className="h-menu-lwrapper">
        {homeMenus.map((menu, index) => {
          return (
            <div
              className="h-menu-title"
              key={index}
              onMouseEnter={() => setHoveredMenuIndex(index)}
            >
              {menu.title}
              {hoveredMenuIndex === index && (
                <div
                  className="h-menu-subtitle-wrapper"
                  onMouseEnter={() => setHoveredMenuIndex(index)}
                  onMouseLeave={() => setHoveredMenuIndex(null)}
                >
                  {menu.subtitles.map((subtitle, index) => {
                    return (
                      <div className="h-menu-subtitle" key={index}>
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

      <div className="h-menu-rwrapper">
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
            className="static-panel"
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
                className="static-panel-subtitle"
              >
                <div className="static-panel-subtitle">Your Account</div>
                <div className="static-panel-subtitle">Your Orders</div>
                <div className="static-panel-subtitle">Your Wishlist</div>
                <div className="static-panel-subtitle">Your Favorites</div>
              </div>
            </div>
          </div>
        )}

        <span style={{ fontSize: "1.3em" }}>
          <span className="h-cart-count">0</span>
          <i class="fa-solid fa-cart-shopping"></i>
        </span>
      </div>
    </motion.div>
  );
}
