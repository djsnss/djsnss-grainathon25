import React from "react";
import Header from "../Components/Header";
import { comm } from "../data";
import Card from "../Components/Card";

const Committee = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <img
        src="/assets/bg2.jpeg"
        alt="Committee Background"
        className="absolute z-0 top-0 left-0 w-full h-full object-cover"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />

      <Header />

      <div className="w-full h-max flex flex-row items-center justify-center gap-10 text-6xl text-white font-arcade font-bold z-10">
        <h1 >Committee</h1>
        <h1 >Leaderboard</h1>
      </div>

      <div className="z-10 w-[90%] h-[400px] flex flex-col items-center justify-center mt-10 text-white">
        {comm.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Committee;