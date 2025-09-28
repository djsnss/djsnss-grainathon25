import React from 'react';
import ShootingStars from './Components/ShootingStars';
import { GrainathonLeaderboard } from './Components/GrainathonLeaderboard';
import MovingRocket from './Components/MovingRocket';
import './Styles/App.css';

function App() {
  return (
    <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
      <ShootingStars starCount={30} />
      <MovingRocket speed={15} />
      <div className="leaderboard-wrapper" style={{ position: 'relative', zIndex: 10 }}>
        <GrainathonLeaderboard />
      </div>
    </div>
  );
}

export default App;

