import React from 'react';
import QuizListElement from "../QuizListElement";
import Loading from "../Loading";

function QuizListContainer({quizList, loading}) {

  return <div className="grow pt-16">
    {loading ? <></> : (quizList.length === 0 ? <span>No quizzes found.</span> : quizList.map(quiz => <QuizListElement
      key={quiz.id} quiz={quiz}/>))}
  </div>;
}

export default QuizListContainer;
