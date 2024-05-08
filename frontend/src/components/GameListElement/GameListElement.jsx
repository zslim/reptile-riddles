import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const GameListElement = ({game, joinGame}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //
  // async function handleJoinClick(id) {
  //   // await joinGame(id);
  //   navigate(`/game/quiz/${id}`);
  // }

  return (<div className="flex flex-row border-2 m-2 p-1 rounded-md">
    <span className="grow flex align-middle text-lg pl-2 items-center">{game.quizTitle}</span>
    <span className="grow flex align-middle text-lg pl-2 items-center">{game.playerCount} players</span>
    <button className="bg-green-400 hover:bg-green-500 p-1 m-1 w-20 rounded-full text-black"
            onClick={() => joinGame(game.gameId)}>Join
    </button>
  </div>);
};

export default GameListElement;
