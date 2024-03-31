import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav-container">
      <Link to="/">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </div>
  );
}
