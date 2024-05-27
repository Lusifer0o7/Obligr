import "../assets/css/VerticleImageSlider.css";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function VerticleImageSlider({ id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section
      className="vis-section"
      style={{ flexDirection: id % 2 == 0 && "row-reverse" }}
    >
      <div ref={ref}>
        <img
          className="vis-img"
          src={require("../assets/img/domino-studio-164_6wVEHfI-unsplash.jpg")}
          alt="A London skyscraper"
        />
      </div>
      <motion.h2 style={{ y }} className="vis-h2">
        <div>
          <div style={{ color: "white" }}>Lorem ipsum dolor sit amet,</div>
          <small>
            consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </small>
        </div>
      </motion.h2>
    </section>
  );
}

export default VerticleImageSlider;
