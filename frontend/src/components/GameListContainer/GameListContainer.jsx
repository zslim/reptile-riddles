import React from 'react';
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import GameListElement from "../GameListElement";
import { joinToGameLobby } from "../../providers/gameProvider";

function GameListContainer({gameList, loading}) {
  const navigate = useNavigate();

  async function joinGame(gameId) {
    try {
     // await joinToGameLobby(gameId);
      console.log(gameId);
     navigate(`/game/quiz/${gameId}`);
    }
    catch (e) {
      console.error(e);
    }
  }

  return <div className="grow pt-16">
    {loading ? <Loading/>
      : (gameList.length === 0 ? <span>No games found.</span> : gameList.map(game => <GameListElement
        key={game.gameId} game={game} joinGame={joinGame}/>))
    }
  </div>;
}

export default GameListContainer;
