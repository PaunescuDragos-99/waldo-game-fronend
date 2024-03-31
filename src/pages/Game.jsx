import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Game() {
  const [coord, setCoord] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [data, setData] = useState([]);
  const [characters, setCharacters] = useState([{}]);
  const [foundCharacters, setFoundCharacters] = useState([{}]);
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false); // New state for modal
  const [username, setUsername] = useState("");
  const [gameTime, setGameTime] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${URL}/game/${id}`).then((response) => {
      response.json().then((gameData) => {
        setData(gameData);
        setCharacters(gameData.character);
      });
    });
  }, []);

  useEffect(() => {
    async function getScore() {
      try {
        fetch(`${URL}/game/${id}/completedGame`).then((response) => {
          response.json().then((score) => {
            setGameTime(score.gametime);
          });
        });
      } catch (err) {
        return <p>there is an error try again later</p>;
      }
    }
    if (foundCharacters.length === 4) {
      getScore();
      gameWon();
    }
  }, [foundCharacters]);

  async function createNewScore(e) {
    const name = username;
    const score = gameTime;
    e.preventDefault();
    const response = await fetch(`${URL}/game/${id}/leaderboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, score: score }),
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  const handleClick = (e) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    setCoord({ x, y });
    setPosition({ x: e.pageX + 20, y: e.pageY + 20 });
    setIsOpen(true);
  };

  function gameWon() {
    setShowModal(true);
  }

  const handleCharacterClick = (characterName) => {
    setIsOpen(false);
    findCharacter(characterName, coord);
  };

  function findCharacter(characterName, coord) {
    const foundCharacter = characters.find(
      (character) => character.name === characterName
    );
    if (
      foundCharacter.locationY - 60 < coord.y &&
      foundCharacter.locationY + 60 > coord.y &&
      foundCharacter.locationX - 60 < coord.x &&
      foundCharacter.locationX + 60 > coord.x
    ) {
      toast.success(`You have found: ${foundCharacter.name}!`);
      setFoundCharacters([...foundCharacters, foundCharacter]);
    } else {
      toast.error(`This is not: ${foundCharacter.name}!`);
    }
  }

  return (
    <div className="game-container">
      <div className="character-info-container">
        {characters
          ?.filter(
            (character) =>
              !foundCharacters.some(
                (foundCharacter) => foundCharacter.name === character.name
              )
          )
          .map((item, key) => (
            <div key={key} className="dropdown-character-container">
              <img
                className="dropdown-image"
                src={item.characterImageURL}
                alt="waldo"
              />
              <p>{item.name}</p>
            </div>
          ))}
      </div>
      <div className="image-game-container">
        <img
          src={data.imageURL}
          // src="https://r4.wallpaperflare.com/wallpaper/43/843/751/waldo-cartoon-where-s-wally-wallpaper-c794b5568c62bc0cb096d91609658cef.jpg"
          alt="waldo winter"
          onClick={(e) => handleClick(e)}
        />
      </div>
      {isOpen && (
        <div
          className="dropdown-menu"
          style={{ position: "absolute", top: position.y, left: position.x }}
        >
          {characters
            ?.filter(
              (character) =>
                !foundCharacters.some(
                  (foundCharacter) => foundCharacter.name === character.name
                )
            )
            .map((item, key) => (
              <div key={key} className="dropdown-character-container">
                <img
                  className="dropdown-image"
                  src={item.characterImageURL}
                  alt="waldo"
                />
                <p
                  onClick={() => handleCharacterClick(item.name)}
                  className="character-select"
                >
                  {item.name}
                </p>
              </div>
            ))}
        </div>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Congratulations! You have won the game in ${gameTime}s!</h2>
            <form onSubmit={createNewScore}>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Submit</button>
              <Link to="/">
                <button>Home</button>
              </Link>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
