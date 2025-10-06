import React, { useEffect, useRef } from "react";
import CircleType from "circletype";
import { winning } from "../data";

const CommitteeWin = () => {
  const textRef = useRef(null);

  useEffect(() => {
    // Wait until fonts are loaded for consistent curvature
    const setupCurve = async () => {
      await document.fonts.ready;
      const circle = new CircleType(textRef.current);

      // Apply curve settings
      circle.radius(800).dir(1); // dir(1) = upward, dir(-1) = downward

      // Optional tweaks for spacing consistency
      textRef.current.style.letterSpacing = "6px";
      textRef.current.style.transformOrigin = "center";
    };

    setupCurve();
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[url('/assets/bg7.png')] bg-cover flex items-center justify-center overflow-hidden">
      {/* Score box */}
      <div className="absolute top-6 right-8 flex flex-col items-center px-4 py-2 rounded text-center">
        <span className="text-white text-4xl font-bold tracking-wide font-up">
          SCORE :
        </span>
        <span className="text-yellow-400 text-6xl font-bold drop-shadow font-arcade">
          {winning["comm-quantity"]}
        </span>
      </div>

      {/* Curved title */}
      <h1
        ref={textRef}
        id="curved2"
        className="absolute top-36 w-full text-center font-arcade text-white text-9xl font-bold drop-shadow-lg select-none"
      >
        {winning.comm.toUpperCase()} WINS
      </h1>
    </div>
  );
};

export default CommitteeWin;
