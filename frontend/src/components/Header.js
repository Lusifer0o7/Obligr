import React, { useState, useEffect } from "react";
import { motion, useScroll, useVelocity } from "framer-motion";

export default function Header() {
  const slideDistance = 80; // if we are sliding out a nav bar at the top of the screen, this will be it's height
  const threshold = 200; // only slide it back when scrolling back at velocity above this positive (or zero) value

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const [isScrollingBack, setIsScrollingBack] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true); // true if the page is not scrolled or fully scrolled back
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const onChangeVelocity = (latest) => {
      if (latest > 0) {
        setIsScrollingBack(false);
        return;
      }
      if (latest < -threshold) {
        setIsScrollingBack(true);
        return;
      }
    };
    scrollVelocity.onChange(onChangeVelocity);
    return () => {
      scrollVelocity.onChange(onChangeVelocity);
    };
  }, [scrollVelocity, threshold]);

  useEffect(() => {
    const onChangeScroll = (latest) => {
      setIsAtTop(latest <= 0);
    };
    scrollY.onChange(onChangeScroll);
    return () => {
      scrollY.onChange(onChangeScroll);
    };
  }, [scrollY]);

  useEffect(() => {
    setIsInView(isScrollingBack || isAtTop);
  }, [isScrollingBack, isAtTop]);
  return (
    <motion.div
      animate={{ y: isInView ? 0 : -slideDistance }}
      transition={{ duration: 0.2, delay: 0.25, ease: "easeInOut" }}
      style={{
        height: slideDistance,
        position: "fixed",
        top: "0px",
        background: "rgb(0,0,0,0.5)",
        zIndex: 1,

        width: "100vw",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        color: "white",
      }}
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
        <div style={{ textTransform: "uppercase" }}>menu</div>
        <div style={{ textTransform: "uppercase" }}>contact us</div>
        <div style={{ textTransform: "uppercase" }}>about us</div>
        <div style={{ textTransform: "uppercase" }}>products</div>
      </div>
    </motion.div>
  );
}
