import React from 'react';
import QuizListElement from "../QuizListElement";
import Loader from "../Loading/Loader";

function QuizListContainer({quizList, loading, setQuizList}) {

  function deleteQuiz(quizId){
    const newQuizList = quizList.filter((q) => q.id !== quizId);
    setQuizList(newQuizList);
  }

  return <div className="grow pt-16">
    {loading ? <Loader/>
      : (quizList.length === 0 ? <span>No quizzes found.</span> : quizList.map(quiz => <QuizListElement
      key={quiz.id} quiz={quiz} deleteQuiz={deleteQuiz}/>))
    }
    <button className="bg-green-400 hover:bg-green-500 p-1 m-1 w-32 rounded-full text-black">Add Quiz</button>
  </div>;
}

export default QuizListContainer;
