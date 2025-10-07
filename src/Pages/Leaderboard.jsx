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
      fetch("https://djsnss-grainathon25.onrender.com/grain-a-thon2025/day")
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
      <img
        src="/assets/bg1.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute h-full w-full bg-black opacity-20 z-[1]"></div>

      <img
        src="/assets/pc.png"
        alt="pc"
        className="absolute bottom-0 w-[80%] h-[90%] z-[2]"
      />

      <Header />

      <div className="relative z-[3] flex flex-col items-center text-center space-y-1">
        <h1 className="font-up text-4xl text-yellow-400 tracking-wider drop-shadow-[0_0_15px_gold] mt-8">
          LEADERBOARD
        </h1>

        <div className="mt-4 p-4 flex flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-silkscreen text-cyan-300 font-semibold mb-1">
              Department
            </h1>
            <span className="border-2 border-cyan-400 rounded-lg h-16 w-40 flex items-center justify-center bg-black bg-opacity-40 shadow-[0_0_8px_cyan] overflow-hidden">
              <div className="animate-slideFade text-2xl text-white font-bold">
                {currentDept.name}
              </div>
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-silkscreen text-cyan-300 font-semibold mb-1">
              Score
            </h1>
            <span className="border-2 border-cyan-400 rounded-lg h-16 w-40 flex items-center justify-center bg-black bg-opacity-40 shadow-[0_0_8px_cyan] overflow-hidden">
              <div className="animate-slideFade text-2xl text-white font-bold">
                {currentDept.score}
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
