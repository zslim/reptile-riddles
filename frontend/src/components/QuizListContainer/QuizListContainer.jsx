import React from 'react';
import QuizListElement from "../QuizListElement";
import Loader from "../Loading/Loader";
import { useNavigate } from "react-router-dom";

function QuizListContainer({quizList, loading, setQuizList}) {
  const navigate = useNavigate();

  function deleteQuiz(quizId) {
    const newQuizList = quizList.filter((q) => q.id !== quizId);
    setQuizList(newQuizList);
  }

  async function createQuiz() {
    {
      const httpRes = await fetch(`/quiz/create`, {
        method: "POST",
        body: JSON.stringify({
          "title": ""
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const newQuizId = await httpRes.json();
      console.log(newQuizId);
      navigate(`/quizform/${newQuizId}`);
    }
  }

  return <div className="grow pt-16">
    {loading ? <Loader/>
      : (quizList.length === 0 ? <span>No quizzes found.</span> : quizList.map(quiz => <QuizListElement
        key={quiz.id} quiz={quiz} deleteQuiz={deleteQuiz}/>))
    }
    <button className="bg-green-400 hover:bg-green-500 p-1 m-1 w-32 rounded-full text-black"
            onClick={() => createQuiz()}>Add Quiz
    </button>
  </div>;
}

export default QuizListContainer;
