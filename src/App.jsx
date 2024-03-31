import "./App.css";
import { Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="container">
      <Navbar />
      <div className="body-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
