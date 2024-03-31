import { useEffect, useState } from "react";
import GameNav from "./GameNav";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${URL}/`).then((response) => {
      response.json().then((games) => {
        setData(games);
      });
    });
  }, []);

  if (!data) {
    return <h1>Loading....</h1>;
  }
  return (
    <>
      <div>
        <h1>How to play?</h1>
        <h2>Find waldo and his friends!</h2>
        <p>
          Waldo and his friends are present in diffrent places, can you find
          them?
        </p>
        <p>
          The faster you find them, the highter you iwill be in the leaderboard!
        </p>
        {data.map((item, key) => (
          <Link to={`/game/${item._id}`} key={key}>
            <div className="image-container">
              <GameNav {...item} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
