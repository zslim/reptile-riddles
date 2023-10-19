import React from 'react';
import { useNavigate } from "react-router-dom";

function QuizListElement({quiz}) {
  const navigate = useNavigate();

  const handlePlayClick = (id) => {
    navigate(`/game/quiz/${id}`);
  };

  return (<div className="flex flex-row border-2 m-2 p-1 rounded-md">
    <span className="grow flex align-middle text-lg pl-2 items-center">{quiz.title}</span>
    <button className="bg-red-400 p-1 m-1 w-20 rounded-full">Delete</button>
    <button className="bg-yellow-400 p-1 m-1 w-20 rounded-full">Edit</button>
    <button className="bg-green-400 p-1 m-1 w-20 rounded-full" onClick={() => handlePlayClick(quiz.id)}>Play</button>
  </div>);
}

export default QuizListElement;