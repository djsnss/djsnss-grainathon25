import React, { useEffect, useRef } from 'react';
import '../Styles/MovingRocket.css';

const MovingRocket = ({ speed = 20 }) => {
  const rocketRef = useRef(null);
  
  useEffect(() => {
    const rocket = rocketRef.current;
    if (!rocket) return;
    
    // Set animation duration based on speed prop
    rocket.style.animationDuration = `${30 - speed}s`;
  }, [speed]);
  
  return (
    <div className="rocket-container">
      <img 
        src="/assets/rocket.png" 
        alt="Rocket" 
        className="rocket" 
        ref={rocketRef}
      />
    </div>
  );
};

export default MovingRocket;