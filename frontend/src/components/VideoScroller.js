import React, { useEffect, useRef } from "react";
import { scroll } from "framer-motion/dom";
//play video on scroll
const VideoScroller = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    // Pause the video initially
    video.pause();

    // Function to scrub through the video on scroll
    const handleScroll = (progress) => {
      if (video.readyState) {
        video.currentTime = video.duration * progress;
      }
    };

    // Add the scroll listener
    const unsubscribe = scroll(handleScroll);

    // Clean up the scroll listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        width="600"
        controls
      ></video>
    </div>
  );
};

export default VideoScroller;
