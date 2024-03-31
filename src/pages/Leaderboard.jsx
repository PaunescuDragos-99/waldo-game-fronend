import { useEffect, useState } from "react";
import ScoreTable from "./ScoreTable";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [activeLeaderboard, setActiveLeaderboard] = useState("");
  const [leaderboardData, setLeadeboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${URL}/`).then((response) => {
      response.json().then((games) => {
        setData(games);
        setActiveLeaderboard(games[0]._id);
      });
    });
  }, []);

  useEffect(() => {
    if (!activeLeaderboard) return;
    setLoading(false);
    fetch(`${URL}/leaderboard/${activeLeaderboard}`).then((response) => {
      response.json().then((leaderboard) => {
        setLeadeboardData(leaderboard);
        setLoading(true);
      });
    });
  }, [activeLeaderboard]);

  function handleActiveLeaderboard(id) {
    setActiveLeaderboard(id);
  }

  if (!data) {
    return <h1>Loading....</h1>;
  }
  return (
    <>
      <div className="leaderboard-container">
        {data.map((item, key) => (
          <button key={key} onClick={() => handleActiveLeaderboard(item._id)}>
            <p>{item.title}</p>
          </button>
        ))}
      </div>
      {!loading && <p>Loading...</p>}
      {leaderboardData && <ScoreTable leaderboardData={leaderboardData} />}
    </>
  );
}
