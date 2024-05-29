import React, { useState, useEffect } from "react";
import { motion, useScroll, useVelocity } from "framer-motion";
import { getAllHomeMenus } from "../actions/settingAction.js";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner.js";
import { UncontrolledTooltip } from "reactstrap";
import { useNavigate } from "react-router-dom";

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
        height: "10vh",
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
              }}
              key={index}
              onMouseEnter={() => setHoveredMenuIndex(index)}
            >
              {menu.title}
              {hoveredMenuIndex === index && (
                <div
                  style={{
                    position: "absolute",
                    top: "3.3vh",
                    left: "50%",
                    minWidth: "20vw",
                    transform: "translateX(-15%)",
                    background: "rgba(0,0,0,0.8)",
                    color: "white",
                    padding: "10px",
                    marginTop: "3.1vh",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    flexDirection: "column",
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

      <div style={{ marginRight: "3em", display: "flex", gap: "2em" }}>
        <span onClick={() => navigate("/login")}>
          <i class="fa-solid fa-right-to-bracket" id="login-btn"></i>
        </span>
        <UncontrolledTooltip placement="bottom" target="login-btn" delay={70}>
          Login
        </UncontrolledTooltip>
        <span>
          <i class="fa-solid fa-gear"></i>
        </span>
      </div>
    </motion.div>
  );
}
