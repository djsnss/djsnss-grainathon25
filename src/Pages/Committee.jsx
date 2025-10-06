import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Card from "../Components/Card";

const Committee = () => {
  const [committees, setCommittees] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://djsnss-grainathon25.onrender.com/grain-a-thon2025/comm')
        .then(res => res.json())
        .then(data => {
          const arr = data.map(item => ({
            comm: item.comm,      
            quantity: item.quantity, 
            dept: item.dept, 
          }));
          setCommittees(arr);
        })
        .catch(error => {
          console.error('Error fetching leaderboard stats:', error);
        });
    };

    fetchData();
    const pollInterval = setInterval(fetchData, 7000);
    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen relative overflow-hidden">
      <img
        src="/assets/bg2.jpeg"
        alt="Committee Background"
        className="absolute z-0 top-0 left-0 w-full h-full object-cover"
      />

      <Header />

      <div className="w-full h-max flex flex-row items-center justify-center gap-10 text-4xl text-white font-up font-bold z-10 mt-20 tracking-wider">
        <h1>Committee</h1>
        <h1>Leaderboard</h1>
      </div>

      <div
        className="z-10 w-[55%] h-[600px] overflow-y-auto gap-4 mt-6 flex flex-wrap justify-around items-start text-white"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {committees.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Committee;
