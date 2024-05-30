import React, { useEffect, useRef, useState } from "react";
import {
  Parallax,
  ParallaxBanner,
  ParallaxProvider,
  useParallax,
} from "react-scroll-parallax";
import { motion, useScroll, useSpring } from "framer-motion";
import ProductList from "./ProductViews/ProductList";
import "../assets/css/Homepage.css";
import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardText,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap";
import Header from "components/Header";
import VerticleImageSlider from "components/VerticleImageSlider";
import ParallaxText from "components/ParallaxText";
import CustomImgSlider from "components/CustomImgSlider";

export default function Homepage() {
  const cardVariants = {
    offscreen: {
      y: 300,
    },
    onscreen: {
      y: 50,
      rotate: -5,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <ParallaxProvider>
      <Header />
      <div className="home">
        <div>
          <CustomImgSlider>
            {/* {[1, 2, 3, 4].map((image, index) => {
              return ()} */}

            <img
              alt="img"
              src={require("../assets/img/lorenzo-herrera-p0j-mE6mGo4-unsplash.jpg")}
            />
            <img
              alt="img"
              src={require("../assets/img/alex-knight-2EJCSULRwC8-unsplash.jpg")}
            />
            <img
              alt="img"
              src={require("../assets/img/pexels-wendywei-1555900.jpg")}
            />
            <img
              alt="img"
              src={require("../assets/img/tomasz-frankowski-kBUfvkbFIoE-unsplash.jpg")}
            />
            {/* );
            })} */}
          </CustomImgSlider>
        </div>

        <div style={{}}>
          <ProductList />
          <ProductList />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              margin: "2em 0",
            }}
          >
            <a class="fancy" href="#">
              <span class="top-key"></span>
              <span class="text">Load More</span>
              <span class="bottom-key-1"></span>
              <span class="bottom-key-2"></span>
            </a>
          </div>
        </div>

        {/* <div className="caro">
          <div className="caro-rotation-direction">
            <ul className="caro-item-wrapper" style={{ "--_num-elements": 11 }}>
              <li
                className="caro-item"
                style={{
                  "--_index": 1,
                  // "--_image-url": require("../assets/img/anime3.png"),
                }}
              >
                <a
                  href="https://unsplash.com/de/fotos/ein-hohes-gebaude-mit-einer-uhr-an-der-seite-cI09n4yMIYc"
                  target="_blank"
                >
                  Architecture Example 1
                </a>
              </li>
              <li
                className="caro-item"
                style={{
                  "--_index": 2,
                  // "--_image-url":
                  //   "url('https://images.unsplash.com/photo-1706146280538-620fa8cda080?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <a
                  href="https://unsplash.com/de/fotos/ein-sehr-hohes-gebaude-mit-vielen-fenstern-3svDIdPOT6M"
                  target="_blank"
                >
                  Architecture Example 2
                </a>
              </li>
              <li
                className="caro-item"
                style={{
                  "--_index": 3,
                }}
              >
                <a
                  href="https://unsplash.com/de/fotos/ein-sehr-hohes-gebaude-mit-vielen-fenstern-ivYgEOo7MnQ"
                  target="_blank"
                >
                  Architecture Example 3
                </a>
              </li>
              <li
                className="caro-item"
                style={{
                  "--_index": 4,
                  // "--_image-url":
                  //   "url('https://images.unsplash.com/photo-1565363887713-783cd82d36d2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <a
                  href="https://unsplash.com/de/fotos/weiss-graues-gebaudekonzept-8yOPWMS46CQ"
                  target="_blank"
                >
                  Architecture Example 4
                </a>
              </li>
              <li
                className="caro-item"
                style={{
                  "--_index": 5,
                  // "--_image-url":
                  //   "url('https://images.unsplash.com/photo-1701025034709-bef78e69d1ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <a
                  href="https://unsplash.com/de/fotos/ein-paar-hohe-gebaude-mit-vielen-fenstern-duj9YsiNKvM"
                  target="_blank"
                >
                  Architecture Example 5
                </a>
              </li>
              <li
                className="caro-item"
                style={{
                  "--_index": 6,
                  // "--_image-url":
                  //   "url('https://images.unsplash.com/photo-1701824580548-4f285fc0b80a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <a
                  href="https://unsplash.com/de/fotos/die-spiegelung-eines-gebaudes-in-den-fenstern-eines-anderen-gebaudes-QT6ltyDT7UA"
                  target="_blank"
                >
                  Architecture Example 6
                </a>
              </li>
              <li
                className="caro-item"
                style={{
                  "--_index": 7,
                  // "--_image-url":
                  //   "url('https://images.unsplash.com/photo-1558472306-75b150ac26eb?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <a
                  href="https://unsplash.com/de/fotos/nahaufnahme-des-weissen-gebaudes-tKnda8e9ejM"
                  target="_blank"
                >
                  Architecture Example 7
                </a>
              </li>
              <li
                className="caro-item"
                style={{
                  "--_index": 8,
                  // "--_image-url":
                  //   "url('https://images.unsplash.com/photo-1713623210045-95d02b35c4a2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <a
                  href="https://unsplash.com/de/fotos/ein-hohes-gebaude-mit-zwei-balkonen-und-einer-uhr-sYg7bcIodC8"
                  target="_blank"
                >
                  Architecture Example 8
                </a>
              </li>
              <li
                className="caro-item"
                style={{
                  "--_index": 9,
                  // "--_image-url":
                  //   "url('https://images.unsplash.com/photo-1700846968547-ace2dacd5e0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <a
                  href="https://unsplash.com/de/fotos/eine-nahaufnahme-der-seite-eines-gebaudes-VvhIUx1lITA"
                  target="_blank"
                >
                  Architecture Example 9
                </a>
              </li>
              <li
                className="caro-item"
                style={{
                  "--_index": 10,
                  // "--_image-url":
                  //   "url('https://images.unsplash.com/photo-1700846978475-5f4dd936c00a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <a
                  href="https://unsplash.com/de/fotos/eine-wand-aus-metallquadraten-und-quadraten-a_XIDnN6C0Y"
                  target="_blank"
                >
                  Architecture Example 10
                </a>
              </li>
              <li
                className="caro-item"
                style={{
                  "--_index": 11,
                  // "--_image-url":
                  //   "url('https://images.unsplash.com/photo-1707788620837-cd3efcce3ceb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <a
                  href="https://unsplash.com/de/fotos/eine-nahaufnahme-einer-metallstruktur-mit-einem-himmelshintergrund-9u9t6gP8R-s"
                  target="_blank"
                >
                  Architecture Example 11
                </a>
              </li>
              <li className="caro-ground"></li>
            </ul>
          </div>
        </div> */}

        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gridGap: "10px",
              "@media (max-width: 600px)": {
                gridTemplateColumns: "auto !important",
              },
            }}
          >
            <motion.div
              className="sec2-container"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
            >
              <motion.div className="sec2" variants={cardVariants}>
                <div style={{ width: "100%", height: "100%" }}>
                  <Card style={{ width: "100%", height: "100%" }}>
                    <CardBody>
                      <CardImg
                        alt="product"
                        src={require("../assets/img/usama-akram-kP6knT7tjn4-unsplash.jpg")}
                      />
                    </CardBody>
                    {/* <div>
                      <div className="pro-info">
                        <CardTitle style={{ textAlign: "center" }}>
                          <h4 style={{ color: "white" }}>Nike Shoes</h4>
                        </CardTitle>
                        <CardText>
                          <small style={{ color: "white" }}>
                            "Lorem ipsum dolor amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore.
                          </small>
                        </CardText>
                        <CardFooter>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <div role="group" class="btn-group">
                              <button
                                type="button"
                                class="btn btn-info"
                                id="cart"
                              >
                                <i class="fa-solid fa-cart-shopping"></i>
                              </button>

                              <UncontrolledTooltip
                                placement="top"
                                target="cart"
                                delay={0}
                              >
                                Add to Cart
                              </UncontrolledTooltip>

                              <button type="button" class="btn  btn-primary">
                                $5200
                              </button>
                            </div>
                          </div>
                        </CardFooter>
                      </div>
                    </div> */}
                  </Card>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="sec2-container"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
            >
              <div className="splash" />
              <motion.div className="sec2" variants={cardVariants}>
                <div style={{ width: "100%", height: "100%" }}>
                  <Card style={{ width: "100%", height: "100%" }}>
                    <CardBody>
                      <CardImg
                        alt="product"
                        src={require("../assets/img/samuel-lopes-FUR3LNiI2jc-unsplash.jpg")}
                      />
                    </CardBody>
                    {/* <div>
                      <div className="pro-info">
                        <CardTitle style={{ textAlign: "center" }}>
                          <h4 style={{ color: "white" }}>Nike Shoes</h4>
                        </CardTitle>
                        <CardText>
                          <small style={{ color: "white" }}>
                            "Lorem ipsum dolor amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore.
                          </small>
                        </CardText>
                        <CardFooter>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <div role="group" class="btn-group">
                              <button
                                type="button"
                                class="btn btn-info"
                                id="cart"
                              >
                                <i class="fa-solid fa-cart-shopping"></i>
                              </button>

                              <UncontrolledTooltip
                                placement="top"
                                target="cart"
                                delay={0}
                              >
                                Add to Cart
                              </UncontrolledTooltip>

                              <button type="button" class="btn  btn-primary">
                                $5200
                              </button>
                            </div>
                          </div>
                        </CardFooter>
                      </div>
                    </div> */}
                  </Card>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* <div
          style={{
            height: "130vh",
            background: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Parallax speed={-10} scale={[0.5, 1]}>
            <div style={{ textAlign: "center", fontSize: "4em" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </div>
          </Parallax>
          <Parallax speed={-12} scale={[0.8, 1]}>
            <div
              style={{
                display: "flex",
                gap: "3em",
              }}
            >
              <div class="c2a-card">
                <div class="c2a-card2">
                  <div
                    style={{
                      textAlign: "center",
                      color: "whitesmoke",
                      fontSize: "2em",
                      paddingTop: "1em",
                    }}
                  >
                    Get Started
                  </div>
                </div>
              </div>
              <div class="c2a-card">
                <div class="c2a-card2">
                  <div
                    style={{
                      textAlign: "center",
                      color: "whitesmoke",
                      fontSize: "2em",
                      paddingTop: "1em",
                    }}
                  >
                    Explore More
                  </div>
                </div>
              </div>
              <div class="c2a-card">
                <div class="c2a-card2">
                  <div
                    style={{
                      textAlign: "center",
                      color: "whitesmoke",
                      fontSize: "2em",
                      paddingTop: "1em",
                    }}
                  >
                    Join Community
                  </div>
                </div>
              </div>
            </div>
          </Parallax>
        </div> */}

        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {[1, 2, 3].map((image) => (
            <VerticleImageSlider id={image} />
          ))}
        </div> */}

        <div style={{ margin: "2em", padding: "5em 0" }}>
          <ParallaxText baseVelocity={-5}>Gloraglam</ParallaxText>
          <ParallaxText baseVelocity={5}>& Shop Verities Online </ParallaxText>
        </div>

        <div>
          <div
            style={{
              width: "100%",
              margin: "0 auto",
              padding: "3rem",
              color: "white",
            }}
          >
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #2d2d2d",
                paddingBottom: "3rem",
              }}
            >
              <div>
                <img
                  src="https://placehold.co/100x100"
                  alt="Midday logo"
                  style={{ height: "2rem" }}
                />
                <h1
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "600",
                    marginTop: "0.75rem",
                  }}
                >
                  GloraGlam
                </h1>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "300",
                  }}
                >
                  Run your business smarter.
                </p>
              </div>
            </header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "3rem",
              }}
            >
              <div style={{ width: "25%" }}>
                <h2
                  style={{
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  Product
                </h2>
                <ul>
                  <li style={{ marginBottom: "0.5rem" }}>Features</li>
                  <li style={{ marginBottom: "0.5rem" }}>Pricing</li>
                  <li style={{ marginBottom: "0.5rem" }}>Story</li>
                  <li style={{ marginBottom: "0.5rem" }}>Updates</li>
                  <li style={{ marginBottom: "0.5rem" }}>Download</li>
                </ul>
              </div>
              <div style={{ width: "25%" }}>
                <h2
                  style={{
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  Resources
                </h2>
                <ul>
                  <li style={{ marginBottom: "0.5rem" }}>Github</li>
                  <li style={{ marginBottom: "0.5rem" }}>Support</li>
                  <li style={{ marginBottom: "0.5rem" }}>Privacy policy</li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    Terms and Conditions
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>Open Startup</li>
                  <li style={{ marginBottom: "0.5rem" }}>Investors</li>
                </ul>
              </div>
              <div style={{ width: "25%" }}>
                <h2
                  style={{
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  Solutions
                </h2>
                <ul>
                  <li style={{ marginBottom: "0.5rem" }}>Midday Engine</li>
                  <li style={{ marginBottom: "0.5rem" }}>Self hosted</li>
                  <li style={{ marginBottom: "0.5rem" }}>SaaS hosting</li>
                  <li style={{ marginBottom: "0.5rem" }}>OSS friends</li>
                </ul>
              </div>
              <div style={{ width: "25%", textAlign: "right" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "1rem",
                    marginBottom: "0.75rem",
                    color: "black",
                  }}
                >
                  <i class="fa-solid fa-star"></i>
                  <span>Star</span>
                  <span>1.8K</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "1rem",
                    color: "black",
                  }}
                >
                  <i class="fa-brands fa-github"></i>
                  <i class="fa-solid fa-print"></i>
                  <i class="fa-solid fa-camera"></i>
                  <i class="fa-brands fa-linkedin-in"></i>
                </div>
                <div
                  style={{
                    borderTop: "1px solid #2d2d2d",
                    marginTop: "3rem",
                    paddingTop: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#38a169",
                      color: "black",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "9999px",
                      fontSize: "0.875rem",
                    }}
                  >
                    Operational
                  </span>
                </div>
              </div>
            </div>
            <footer
              style={{
                color: "#a0aec0",
                fontSize: "0.875rem",
                marginTop: "3rem",
              }}
            ></footer>
          </div>
        </div>

        {/* <div style={{ height: "100vh" }}></div> */}
      </div>
    </ParallaxProvider>
  );
}
