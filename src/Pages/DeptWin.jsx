import React, { useEffect, useRef, useState } from "react";
import CircleType from "circletype";
import FireworksBackground from "../Components/FireworksBackground";

const CommitteeWin = () => {
  const textRef = useRef(null);
  const [winning, setWinning] = useState(null);

  useEffect(() => {
    fetch('https://djsnss-grainathon25.onrender.com/grain-a-thon2025/winning')
      .then(res => res.json())
      .then(data => setWinning(data))
      .catch(error => console.error('Error fetching winning stats:', error));
  }, []);

  useEffect(() => {
    if (winning && textRef.current) {
      const setupCurve = async () => {
        await document.fonts.ready;
        const circle = new CircleType(textRef.current);
        // Responsive radius
        const radius = window.innerWidth < 640 ? 250 : window.innerWidth < 1024 ? 500 : 800;
        circle.radius(radius).dir(1);
        textRef.current.style.letterSpacing = window.innerWidth < 640 ? "2px" : "6px";
      };
      setupCurve();
      // Re-apply on resize for responsiveness
      const handleResize = () => {
        if (textRef.current) {
          const circle = new CircleType(textRef.current);
          const radius = window.innerWidth < 640 ? 250 : window.innerWidth < 1024 ? 500 : 800;
          circle.radius(radius).dir(1);
          textRef.current.style.letterSpacing = window.innerWidth < 640 ? "2px" : "6px";
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [winning]);

  return (
    <div className="relative w-screen h-screen bg-[url('/assets/bg7.png')] bg-cover bg-center flex items-center justify-center overflow-hidden">
      <FireworksBackground />
      {/* Score box */}
      <div className="absolute top-4  sm:top-6 sm:right-8 flex flex-col items-center px-2 py-1 sm:px-4 sm:py-2 rounded text-center z-10">
        <span className="text-white text-2xl sm:text-4xl font-bold tracking-wide font-up">
          SCORE :
        </span>
        <span className="text-yellow-400 text-4xl sm:text-6xl font-bold drop-shadow font-arcade">
          {winning ? winning["dept-quantity"] : "--"}
        </span>
      </div>

      <img
        src="/assets/trophy2.png"
        className="absolute top-[40%] sm:top-64 h-28 sm:h-40"
        alt="Trophy"
      />

      {/* Curved title */}
      <h1
        ref={textRef}
        id="curved2"
        className="absolute top-[25%] sm:top-40 w-full text-center font-arcade text-white text-[50px] sm:text-9xl font-bold drop-shadow-lg select-none z-10 px-2"
        style={{ wordBreak: "break-word" }}
      >
        {winning ? `${winning.dept.toUpperCase()} WINS` : "Loading..."}
      </h1>
    </div>
  );
};

export default CommitteeWin;
