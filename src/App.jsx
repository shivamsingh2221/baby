import React, { useEffect } from "react";
import "./App.css";

export default function GirlfriendTribute() {
  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tribute">
      <img src="/Neha_Img.jpg" alt="My Love" className="photo" />
      <h1 className="headline">She is the best in the world 💖</h1>
      <p className="message">
        Every day with you is a blessing. You're my sunshine, my joy, my love.
      </p>
    </div>
  );
}
