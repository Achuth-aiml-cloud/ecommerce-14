import React, { useState, useEffect } from "react";
import "./Hero.css";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";

const Hero = () => {
  const [heroImageURL, setHeroImageURL] = useState("");

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const storage = getStorage();
        const heroImageRef = ref(storage, "hero_image.png");
        const url = await getDownloadURL(heroImageRef);
        setHeroImageURL(url);
      } catch (error) {
        console.error("Error fetching hero image:", error);
      }
    };

    fetchHeroImage();
  }, []);

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={heroImageURL} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
