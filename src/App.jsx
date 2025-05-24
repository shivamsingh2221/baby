import React, { useEffect, useRef, useState } from "react";
import "./App.css";

// Auto-import all images from assets/images
const images = import.meta.glob("./assets/images/*.{jpg,jpeg,png}", {
  eager: true,
});
const imageUrls = Object.values(images).map((mod) => mod.default);

export default function GirlfriendTribute() {
  const [index, setIndex] = useState(0);
  const slideIntervalRef = useRef(null);

  const goToNext = () => {
    setIndex((i) => (i + 1) % imageUrls.length);
    resetSlideTimer();
  };

  const goToPrev = () => {
    setIndex((i) => (i - 1 + imageUrls.length) % imageUrls.length);
    resetSlideTimer();
  };

  const resetSlideTimer = () => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % imageUrls.length);
    }, 3000);
  };

  useEffect(() => {
    // Floating hearts
    const heartInterval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }, 500);

    // Start slide timer
    resetSlideTimer();

    return () => {
      clearInterval(heartInterval);
      clearInterval(slideIntervalRef.current);
    };
  }, []);

  return (
    <div className="tribute">
      <img
        src={imageUrls[index]}
        alt="Us"
        className="photo"
        onClick={goToNext}
        style={{ cursor: "pointer" }}
        onError={(e) => (e.target.style.display = "none")}
      />
      <div className="buttons">
        <button onClick={goToPrev}>← </button>
        <button onClick={goToNext}> →</button>
      </div>
      <h1 className="headline">She is the best in the world 💖</h1>
      <p className="message">
        Every day with you is a blessing. You're my sunshine, my joy, my love.
      </p>
    </div>
  );
}
