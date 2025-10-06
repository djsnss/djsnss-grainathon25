
import React, { useState, useEffect } from "react";
import Header from "../Components/Header";

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

  // Rotate departments every 7s
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % departmentData.length);
    }, 7000);
    return () => clearInterval(slideInterval);
  }, [departmentData.length]);

  const currentDept = departmentData[visibleIndex];

return (
  <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden font-roboto">
    {/* Background Image */}
    <img src="/assets/bg1.png"alt="background"
      className="absolute inset-0 w-full h-full object-cover z-[1]"
    />

    {/* Center PC Image */}
    <img
      src="/assets/pc.png"
      alt="pc"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[650px] z-[2]"
    />

    <Header />

    {/* Content Layer */}
    <div className="relative z-[3] flex flex-col items-center text-center space-y-1">
      {/* Title */}
      <h1 className="font-up text-4xl text-yellow-400 tracking-widest drop-shadow-[0_0_15px_gold]">
        LEADERBOARD
      </h1>

      {/* Table Container */}
      <div className=" p-6 w-[280px]">
        {/* Headers */}
        <div className="grid grid-cols-2 text-white font-raleway text-lg mb-2">
          <div className="text-left">DEPARTMENT:</div>
          <div className="text-right">SCORE:</div>
        </div>

        {/* Animated Current Dept */}
         <div className="absolute w-[250px]  overflow-hidden">
        <div className="overflow-hidden h-[50px] ">
          <div
            key={currentDept.name}
            className="absolute inset-1  flex justify-between items-center text-cyan-300 font-silkscreen text-3xl "
          >
            <span className="border border-cyan-400 h-[50px] w-[130px]  drop-shadow-[0_0_8px_cyan] ">
              <div className="animate-slideFade">{currentDept.name}</div></span>
             <span className="border border-cyan-400 h-[50px] w-[80px]  drop-shadow-[0_0_8px_cyan] ">
              <div className="animate-slideFade">
              {currentDept.score}
             </div>
            </span>
          </div>
        </div>
       </div>
      </div>
    </div>
  </div>
);

};

export default Leaderboard;
