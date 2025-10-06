import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { total as totalData } from "../data";
import { motion, AnimatePresence } from "framer-motion";

const colors = [
  "#09f04a",
  "#12ffd1",
  "#0cbcff",
  "#540fff",
  "#cb0eff",
  "#ff0ebc",
  "#ff0e41",
  "#ff510b",
  "#ffca09",
];

const initialArr = Object.entries(totalData).map(([name, score], i) => ({
  name,
  score,
  color: colors[i % colors.length],
}));

function getSortedArr(arr) {
  return [...arr]
    .sort((a, b) =>
      b.score === a.score ? a.name.localeCompare(b.name) : b.score - a.score
    )
    .map((item, idx) => ({ ...item, rank: idx + 1 }));
}

const Total = () => {
  const [teams, setTeams] = useState(getSortedArr(initialArr));

  // Update teams if totalData changes (simulate API update)
  useEffect(() => {
    setTeams(getSortedArr(initialArr));
  }, [totalData]);

  const handleScore = (name) => {
    const updated = teams.map((team) =>
      team.name === name ? { ...team, score: team.score + 1 } : team
    );
    setTeams(getSortedArr(updated));
  };

  const totalScore = teams.reduce((acc, curr) => acc + curr.score, 0);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen relative overflow-hidden">
      <img
        src="/assets/bg8.jpeg"
        alt="Committee Background"
        className="absolute z-0 top-0 left-0 w-full h-full object-cover"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />

      <div className="absolute h-full w-full bg-black opacity-20"></div>

      <Header />

      <div className="w-full h-max flex flex-row items-center justify-center gap-10 text-5xl text-white font-up font-bold z-20 mt-10 tracking-wider">
        <h1>Total</h1>
        <h1>Score</h1>
      </div>

      <div className="z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto mt-5">
        <div className="rounded-2xl border-4 border-cyan-400 shadow-[0_0_40px_10px_rgba(124,189,246,1)] bg-black bg-opacity-70 p-4 w-full">
          <img
            src="/assets/bg1.png"
            alt="Banner"
            className="w-full rounded-xl mb-4"
            style={{
              maxHeight: "150px",
              objectFit: "cover",
            }}
          />

          <table className="w-full text-white text-xl font-bold text-center bg-white bg-opacity-10 rounded-xl font-silkscreen overflow-hidden">
            <thead>
              <tr>
                <th className="py-1 px-2">Rank</th>
                <th className="py-1 px-2">Department</th>
                <th className="py-1 px-2">Score</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {teams.map((dept, idx) => (
                  <motion.tr
                    key={dept.name}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{ background: dept.color }}
                    className="border-b border-white last:border-none"
                  >
                    <td className="py-1 px-2">{dept.rank}</td>
                    <td className="py-1 px-2">{dept.name}</td>
                    <td className="py-1 px-2">{dept.score}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              <tr className="font-extrabold text-cyan-300">
                <td className="py-1 px-2" colSpan={2}>
                  TOTAL
                </td>
                <td className="py-1 px-2">{totalScore}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Total;
