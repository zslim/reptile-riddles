import React from 'react';
import QuizListElement from "../QuizListElement";

function QuizListContainer({quizList, loading}) {
  return (
    loading ? <></> : quizList.map(quiz => <QuizListElement quiz={quiz}/>)
  );
}

export default QuizListContainer;