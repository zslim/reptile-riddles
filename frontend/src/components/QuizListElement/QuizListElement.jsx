import React from 'react';

function QuizListElement({quiz}) {
  return (
    <div key={quiz.id}>
      <h1>{quiz.title}</h1>
    </div>
  );
}

export default QuizListElement;