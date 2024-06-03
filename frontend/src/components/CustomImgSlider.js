import React, { useState, useEffect } from "react";

import "../assets/css/CustomImgSlider.css";
import { getAllHomeSliders } from "actions/settingAction";
import { useDispatch, useSelector } from "react-redux";

function CustomImgSlider({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);

  const dispatch = useDispatch();
  const { loading, homeSliders, error } = useSelector(
    (state) => state.allHomeSliders
  );

  useEffect(() => {
    dispatch(getAllHomeSliders());
  }, []);

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          slideNext();
          setSlideDone(true);
        }, 5000)
      );
    }
  }, [slideDone]);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= homeSliders.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return homeSliders.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div
      className="container__slider"
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
    >
      {homeSliders &&
        homeSliders.map((slider, index) => {
          return (
            <div
              className={
                "slider__item slider__item-active-" + (activeIndex + 1)
              }
              key={index}
            >
              <img
                alt="img"
                src={require(`../../../uploads/${slider.image.filename}`)}
              />
              {console.log(slider.image.filename)}
              <div className="slider__info">
                <h1
                  className="danfo-banner-title"
                  style={{
                    color: "rgb(255,255,255,0.9)",
                    fontSize: "6em",
                    textShadow: "5px 5px 5px black",
                  }}
                >
                  {slider.title}
                </h1>
                <p
                  className="dancing-script-banner-title"
                  style={{
                    color: "rgb(255,255,255,0.9)",
                    fontSize: "3em",
                    textShadow: "2px 2px black",
                  }}
                >
                  {slider.description}
                </p>
              </div>
            </div>
          );
        })}

      <div className="container__slider__links">
        {homeSliders &&
          homeSliders.map((item, index) => {
            return (
              <button
                key={index}
                className={
                  activeIndex === index
                    ? "container__slider__links-small container__slider__links-small-active"
                    : "container__slider__links-small"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(index);
                }}
              ></button>
            );
          })}
      </div>

      <button
        className="slider__btn-next"
        onClick={(e) => {
          e.preventDefault();
          slideNext();
        }}
      >
        {">"}
      </button>

      <button
        className="slider__btn-prev"
        onClick={(e) => {
          e.preventDefault();
          slidePrev();
        }}
      >
        {"<"}
      </button>
    </div>
  );
}

export default CustomImgSlider;
