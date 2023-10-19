import React from 'react';
import { useNavigate } from "react-router-dom";

function QuizListElement({quiz, deleteQuiz}) {
  const navigate = useNavigate();

  const handlePlayClick = (id) => {
    navigate(`/game/quiz/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`/quizform/${id}`);
  };

  const handleDeleteClick = (id) => {
    try{
    //delete request comes here
      deleteQuiz(id);
    } catch (e){
      console.error(e)
    }
  };

  return (<div className="flex flex-row border-2 m-2 p-1 rounded-md">
    <span className="grow flex align-middle text-lg pl-2 items-center">{quiz.title}</span>
    <button className="bg-red-400 hover:bg-red-500 p-1 m-1 w-20 rounded-full text-black" onClick={() => handleDeleteClick(quiz.id)}>Delete</button>
    <button className="bg-yellow-400 hover:bg-yellow-500 p-1 m-1 w-20 rounded-full text-black" onClick={() => handleEditClick(quiz.id)}>Edit</button>
    <button className="bg-green-400 hover:bg-green-500 p-1 m-1 w-20 rounded-full text-black" onClick={() => handlePlayClick(quiz.id)}>Play</button>
  </div>);
}

export default QuizListElement;