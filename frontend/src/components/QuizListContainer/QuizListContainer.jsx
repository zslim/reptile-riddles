import React from 'react';
import QuizListElement from "../QuizListElement";

function QuizListContainer({quizList, loading}) {
  return <div className="grow">
    {loading ? <></> : quizList.map(quiz => <QuizListElement key={quiz.id} quiz={quiz}/>)}
  </div>;
}

export default QuizListContainer;