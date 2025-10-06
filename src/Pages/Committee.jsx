import React from "react";
import Header from "../Components/Header";
import { comm } from "../data";
import Card from "../Components/Card";

const Committee = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen relative overflow-hidden">
      <img
        src="/assets/bg2.jpeg"
        alt="Committee Background"
        className="absolute z-0 top-0 left-0 w-full h-full object-cover"
      />

      <Header />

      {/* ↓ Slightly lower than header */}
      <div className="w-full h-max flex flex-row items-center justify-center gap-10 text-4xl text-white font-up font-bold z-10 mt-10 tracking-wider">
        <h1>Committee</h1>
        <h1>Leaderboard</h1>
      </div>

      {/* ↓ 3 cards per row, tight spacing */}
      <div className="z-10 w-[55%]  gap-2 mt-6 flex flex-wrap justify-between items-center text-white">
        {comm.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Committee;
