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
        circle.radius(800).dir(1);
        textRef.current.style.letterSpacing = "6px";
      };
      setupCurve();
    }
  }, [winning]);

  return (
    <div className="relative w-screen h-screen bg-[url('/assets/bg7.png')] bg-cover bg-center flex items-center justify-center overflow-hidden">
      <FireworksBackground />
      {/* Score box */}
      <div className="absolute top-6 right-8 flex flex-col items-center px-4 py-2 rounded text-center z-10">
        <span className="text-white text-4xl font-bold tracking-wide font-up">
          SCORE :
        </span>
        <span className="text-yellow-400 text-6xl font-bold drop-shadow font-arcade">
          {winning ? winning["comm-quantity"] : "--"}
        </span>
      </div>

      <img
        src="/assets/trophy2.png"
        className="absolute top-64 h-40"
      />

      {/* Curved title */}
      <h1
        ref={textRef}
        id="curved2"
        className="absolute top-40 w-full text-center font-arcade text-white text-9xl font-bold drop-shadow-lg select-none z-10"
      >
        {winning ? `${winning.comm.toUpperCase()} WINS` : "Loading..."}
      </h1>
    </div>
  );
};

export default CommitteeWin;
