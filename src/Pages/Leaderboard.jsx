import React from 'react'
import Header from "../Components/Header";

import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [departmentData, setDepartmentData] = useState([
    { name: "AIDS", score: 0 },
    { name: "AIML", score: 0 },
    { name: "COMPS", score: 0 },
    { name: "CSEDS", score: 0 },
    { name: "EXTC", score: 0 },
    { name: "ICB", score: 0 },
    { name: "IT", score: 0 },
    { name: "MECH", score: 0 },
  ]);

  const [visibleIndex, setVisibleIndex] = useState(0);

  // Fetch updated scores every 7s
  useEffect(() => {
    const fetchData = () => {
      fetch("https://djsnss-bdd25.onrender.com/bdd25/counts")
        .then((res) => res.json())
        .then((data) => {
          const updated = departmentData.map((dept) => ({
            ...dept,
            score: data[dept.name] ?? 0,
          }));
          setDepartmentData(updated);
        })
        .catch((error) =>
          console.error("Error fetching leaderboard stats:", error)
        );
    };

    fetchData();
    const pollInterval = setInterval(fetchData, 7000);
    return () => clearInterval(pollInterval);
  }, []);


  useEffect(() => {
    const slideInterval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % departmentData.length);
    }, 7000);
    return () => clearInterval(slideInterval);
  }, [departmentData.length]);

  const currentDept = departmentData[visibleIndex];

  return (
    
    <div className="relative w-screen h-screen overflow-hidden ">
      {/* Background Image */}
      <img
        src="/assets/bg1.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-[1]"
      />
      

      {/* Center Image */}
      <img
        src="/assets/pc.png"
        alt="pc"
        className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1050px] h-[650px] z-[2]"
      />
      <Header />

      {/* Layer */}
     <div className="relative h-screen flex items-center justify-center z-[3] font-roboto">
 
  {/* Center Leaderboard */}
  <div className="text-center">
    {/* Title */}
    <h1 className="font-rasterforge text-5xl text-yellow-400 mb-4 drop-shadow-[0_0_25px_#FFD700]">
      LEADERBOARD
    </h1>

    {/* Header Row */}
    <div className="grid grid-cols-2 gap-8 mb-2 text-cyan-400 text-lg tracking-widest font-raleway">
      <span className=" pb-1">DEPARTMENT:</span>
      <span className="">SCORE:</span>
    </div>

    {/* Animated Slide Row */}
    <div className="relative w-[250px] h-[80px] overflow-hidden mx-auto">
      <div
        key={currentDept.name}
        className="absolute inset-0 flex justify-between items-center  px-1"
      >
        <span className=" font-silkscreen text-cyan-400 text-2xl border border-cyan-400 px-4 py-2  drop-shadow-[0_0_10px_cyan]">
          <div className='animate-slideFade'>
          {currentDept.name}
          </div>
        </span>
        <span className="text-cyan-400  font-silkscreen text-2xl border border-cyan-400 px-6 py-2  drop-shadow-[0_0_10px_cyan]">
          <div className="animate-slideFade"> {currentDept.score}
            </div>
        </span>
      </div>
          </div>
        </div>

    
      </div>
    </div>
  );
};

export default Leaderboard;
