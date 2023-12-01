import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const QuizListElement = ({quiz, deleteQuiz, copyQuiz, editable}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handlePlayClick(id) {
    navigate(`/game/lobby/${id}`);
  }

  function handleEditClick(id) {
    navigate(`/quizform/${id}`);
  }

  async function handleCopyClick(id) {
    // TODO: handle copy creation of quiz
    try {
      setLoading(true);
      await copyQuiz(id);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  async function handleDeleteClick(id) {
    try {
      setLoading(true);
      await deleteQuiz(id);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  return (<div className="flex flex-row border-2 m-2 p-1 rounded-md">
    <span className="grow flex align-middle text-lg pl-2 items-center">{quiz.title}</span>
    {editable ?
      <>
        <button className="bg-red-400 hover:bg-red-500 p-1 m-1 w-20 rounded-full text-black"
                onClick={() => handleDeleteClick(quiz.id)}>Delete
        </button>
        <button className="bg-yellow-400 hover:bg-yellow-500 p-1 m-1 w-20 rounded-full text-black"
                onClick={() => handleEditClick(quiz.id)}>Edit
        </button>
      </> :
      <>
        <button className="bg-yellow-400 hover:bg-yellow-500 p-1 m-1 w-20 rounded-full text-black"
                onClick={() => handleCopyClick(quiz.id)}>Copy
        </button>
      </>
    }
    <button className="bg-green-400 hover:bg-green-500 p-1 m-1 w-20 rounded-full text-black"
            onClick={() => handlePlayClick(quiz.id)}>Play
    </button>
  </div>);
};

export default QuizListElement;
