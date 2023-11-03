import React, { useEffect, useState } from 'react';
import AnswerForm from "../AnswerForm";

const TaskForm = ({
                    selectedTask,
                    setSelectedTask,
                    handleTaskSave,
                    handleTaskDelete,
                    answers,
                    setAnswers,
                    MAXIMUM_NUMBER_OF_ANSWERS,
                    MINIMUM_NUMBER_OF_ANSWERS,
                    indexAnswers
                  }) => {

  function changeCorrect(isCorrect, index) {
    const currentAnswer = answers.find((answer) => answer.index === index);
    currentAnswer.isCorrect = isCorrect;
    setAnswers(() => answers);
  }

  async function addAnswer() {
    const indexedAnswer = indexAnswers([{text: "", isCorrect: false, answerId: -1,}])[0];
    setAnswers((answers) => [...answers, indexedAnswer]);
  }

  function changeAnswer(answer) {
    const updatedAnswers = answers.map(currAnswer => currAnswer.index === answer.index ? answer : currAnswer);
    setAnswers(updatedAnswers);
  }

  function deleteAnswer(answerIndex) {
    setAnswers((answers) => [...answers.filter((answer) => answer.index !== answerIndex)]);
  }

  return (
    <>
      <div className="ml-4 p-4 border-t-2 border-x-2 border-zinc-500 w-5/6">
        <div className="m-4 mb-8">
          <label htmlFor={selectedTask.taskId + "question"} className="text-white">Question name: </label>
          <input className="bg-[#050409] text-white p-1 w-4/6 border border-zinc-700" id={selectedTask.taskId + "question"}
                 type="text" value={selectedTask.question}
                 onChange={(e) => setSelectedTask({...selectedTask, question: e.target.value})}/>
        </div>
        <div className="mb-4">
          {answers.map((answer, i) => (
            <div key={"answer" + answer.index}>
              <AnswerForm index={i} answer={answer} changeCorrect={changeCorrect} changeAnswer={changeAnswer}
                          deleteAnswer={deleteAnswer}/>
            </div>
          ))}
          {answers.length < MAXIMUM_NUMBER_OF_ANSWERS
            ? <div>
              <button
                className="text-white mt-4 font-bold left-1 p-2 bg-green-800 hover:bg-green-700 hover:cursor-pointer relative"
                onClick={() => addAnswer()}>Add Answer
              </button>
            </div>
            : null}
        </div>
      </div>
      <button
        className="m-4 text-white w-24 font-bold p-4 bg-green-800 hover:bg-green-700 hover:cursor-pointer"
        onClick={() => handleTaskSave()}>Save
      </button>
      <button
        className="m-4 text-white w-24 font-bold p-4 bg-red-800 hover:bg-red-700 hover:cursor-pointer"
        onClick={() => handleTaskDelete()}>Delete
      </button>
    </>
  );
};

export default TaskForm;
