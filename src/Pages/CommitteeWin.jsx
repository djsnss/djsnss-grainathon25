import React, { useEffect, useRef } from "react";
import $ from "../jquerySetup"; // <-- use the fixed global version
import "letteringjs"; // will now see window.jQuery
import { winning } from "../data";  

const CommitteeWin = () => {
  const textRef = useRef(null);

  useEffect(() => {
    // CircleType plugin logic
    (function ($) {
      $.fn.circleType = function (options) {
        const settings = { dir: 1, position: "relative" };

        if (typeof $.fn.lettering !== "function") {
          console.error("Lettering.js not loaded!");
          return;
        }

        return this.each(function () {
          if (options) $.extend(settings, options);

          const elem = this,
            delta = 180 / Math.PI,
            ch = parseInt($(elem).css("line-height"), 10),
            fs = parseInt($(elem).css("font-size"), 10),
            txt = elem.innerHTML
              .trim()
              .replace(/\s/g, "&nbsp;");

          elem.innerHTML = txt;
          $(elem).lettering();
          elem.style.position = settings.position;

          const letters = elem.getElementsByTagName("span");
          let tw = 0,
            offset = 0;

          for (let i = 0; i < letters.length; i++) {
            tw += letters[i].offsetWidth;
          }

          const minRadius = tw / Math.PI / 2 + ch;
          settings.radius = settings.radius || minRadius;
          const origin = "center " + settings.radius / fs + "em";
          const innerRadius = settings.radius - ch;

          for (let i = 0; i < letters.length; i++) {
            let l = letters[i];
            offset += (l.offsetWidth / 2 / innerRadius) * delta;
            l.rot = offset;
            offset += (l.offsetWidth / 2 / innerRadius) * delta;
          }

          for (let i = 0; i < letters.length; i++) {
            let l = letters[i];
            const style = l.style;
            const r = (-offset * settings.dir) / 2 + l.rot * settings.dir;
            const transform = `rotate(${r}deg)`;

            style.position = "absolute";
            style.left = "50%";
            style.marginLeft = `-${l.offsetWidth / 2 / fs}em`;
            style.transform = transform;
            style.transformOrigin = origin;
          }
        });
      };
    })($);

    $("#curved2").circleType({
      position: "absolute",
      dir: 1,
      radius: 800,
    });
  }, []);

  return (
    <div className='relative w-screen h-screen bg-[url("/assets/bg7.png")] bg-cover flex items-center justify-center'>
      <div className='absolute top-6 right-8 flex flex-col items-center px-4 py-2 rounded text-center'>
        <span className='text-white text-4xl font-bold tracking-wide font-up'>
          SCORE :
        </span>
        <span className='text-yellow-400 text-6xl font-bold drop-shadow font-arcade'>
          {winning["comm-quantity"]}
        </span>
      </div>

      <h1
        id='curved2'
        ref={textRef}
        className='absolute top-36 w-full text-center font-arcade text-white text-9xl font-bold drop-shadow-lg'
      >
        {winning.comm.toUpperCase()} WINS
      </h1>
    </div>
  );
};

export default CommitteeWin;
