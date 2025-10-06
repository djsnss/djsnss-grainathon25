import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./Pages/Leaderboard";
import Committee from "./Pages/Committee";
import Total from "./Pages/Total";
import DeptWin from "./Pages/DeptWin";
import CommitteeWin from "./Pages/CommitteeWin";

function App() {
  return (
    <Router>
      <div className="min-h-screen min-w-screen overflow-hidden">
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/total" element={<Total />} />
          <Route path="/dept-win" element={<DeptWin />} />
          <Route path="/committee-win" element={<CommitteeWin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
