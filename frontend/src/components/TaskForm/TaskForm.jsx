import React, { useEffect, useState } from 'react';
import AnswerForm from "../AnswerForm";

const TaskForm = ({selectedTask, setSelectedTask, updateQuizState, handleTaskSave, handleTaskDelete}) => {
  const [answers, setAnswers] = useState(() => mapAnswers(selectedTask?.answers) ?? []);

  useEffect(() => {
    let indexedAnswers = [];
    selectedTask.answers.map((answer, i) => {
      answer.index = i;
      indexedAnswers.push(answer);
    });
    setAnswers([...indexedAnswers]);
  }, [selectedTask]);

  function mapAnswers(answerList) {
    let indexedAnswers = [];
    answerList.map((answer, i) => {
      answer.index = i;
      indexedAnswers.push(answer);
    });
    return indexedAnswers;
  }

  function changeQuestion(questionText) {
    const updatedTask = selectedTask;
    updatedTask.question = questionText;
    setSelectedTask(() => updatedTask);
    updateQuizState();
  }

  function changeCorrect(isCorrect, index) {
    const currentAnswer = answers.find((answer) => answer.index === index);
    currentAnswer.isCorrect = isCorrect;
    setAnswers(() => answers);
    updateTaskState();
  }

  async function addAnswer() {
    setAnswers(() => [...answers, {text: "", isCorrect: false, answerId: -1, index: answers.length}]);
    updateTaskState();
  }

  function changeAnswer(answer) {
    const updatedAnswers = answers.map(currAnswer => currAnswer.index === answer.index ? answer : currAnswer);
    setAnswers(() => updatedAnswers);
    updateTaskState();
  }

  function deleteAnswer(answerIndex){
    const updatedAnswers = answers.filter((answer) => answer.index !== answerIndex);
    setAnswers(() => updatedAnswers);
  }

  function updateTaskState() {
    const updatedTask = selectedTask;
    updatedTask.answers = answers;
    setSelectedTask(() => updatedTask);
    updateQuizState();
  }

  return (
    <>

      <div className="ml-4 p-4 border-t-2 border-x-2 border-zinc-500 w-5/6">
        <div className="m-4 mb-8">
          <label htmlFor={selectedTask.taskId + "question"} className="text-white">Question name: </label>
          <input className="bg-[#050409] text-white p-1 w-4/6 border border-zinc-700" id={selectedTask.taskId + "question"}
                 type="text" defaultValue={selectedTask.question}
                 onChange={(e) => changeQuestion(e.target.value)}/>
        </div>
        <div className="mb-4">
          {answers.map((answer) => (
            <div key={answer.index}>
              <AnswerForm answer={answer} changeCorrect={changeCorrect} changeAnswer={changeAnswer} deleteAnswer={deleteAnswer}/>
            </div>
          ))}
          {answers.length < 4
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
