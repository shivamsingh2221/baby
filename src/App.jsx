import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const images = import.meta.glob("./assets/images/*.{jpg,jpeg,png}", {
  eager: true,
});
const imageUrls = Object.values(images).map((mod) => mod.default);

export default function GirlfriendTribute() {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const slideIntervalRef = useRef(null);
  const audioRef = useRef(null);

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
    const heartInterval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }, 500);

    resetSlideTimer();

    return () => {
      clearInterval(heartInterval);
      clearInterval(slideIntervalRef.current);
    };
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

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

      <button className="modal-button" onClick={() => setShowModal(true)}>
        💌 💌 If Angry then Click HERE 💌 💌
      </button>

      <audio
        ref={audioRef}
        src="/src/assets/audio/gustakhi_song.mp3"
        preload="auto"
      />

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowModal(false);
            stopAudio();
          }}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>I'm Sorry 💔</h2>
            <p className="message">
              I know I might have hurt you at times, and for that, I'm truly
              sorry. You mean the world to me, and I never want to lose you.
              Please forgive me. 💗 <br></br>
              Here's a special बेसुरा song for my prettiest girl in the world.
            </p>
            <div className="audio-controls">
              <button className="play-button" onClick={playAudio}>
                ▶️ Play
              </button>
              <button className="stop-button" onClick={stopAudio}>
                ⏹️ Stop
              </button>
            </div>
            <button
              className="close-button"
              onClick={() => {
                setShowModal(false);
                stopAudio();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
