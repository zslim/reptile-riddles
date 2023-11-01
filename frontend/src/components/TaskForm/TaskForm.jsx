import React, { useEffect, useState } from 'react';
import { fetchAnswer, saveEmptyAnswer, updateAnswer } from "../../controllers/answerProvider";
import AnswerForm from "../AnswerForm";
import { updateQuestion } from "../../controllers/taskProvider";

const TaskForm = ({task, setTask}) => {
  /** @namespace task.questionText **/
  const [question, setQuestion] = useState(task?.questionText ?? "");
  /** @namespace task.answers **/
  let [answers, setAnswers] = useState(task?.answers ?? []);

  async function changeCorrect(isCorrect, answerId, text) {
    try {
      const res = await updateAnswer({answerId, isCorrect, text});
      const newAnswers = answers.map(answer => answer.answerId === answerId ? {
        answerId: answer.answerId,
        text: answer.text,
        isCorrect: isCorrect
      } : answer);
      setAnswers(() => newAnswers);
    } catch (e) {
      console.error(e);
    }
  }

  async function changeQuestion(question) {
    try {
      const res = await updateQuestion(question, task.taskId);
      setQuestion(question);
    } catch (e) {
      console.error(e);
    }
  }

  async function addAnswer() {
    try {
      const answerId = await saveEmptyAnswer(task.taskId);
      const newAnswer = await fetchAnswer(answerId);
      setAnswers([...answers, newAnswer]);
    } catch (e) {
      console.error(e);
    }
  }

  function setAnswer(answer) {
    answers = answers.map(currAnswer => currAnswer.answerId === answer.answerId ? answer : currAnswer);
  }

  useEffect(() => {
    setTask({questionText: question, answers, taskId: task.taskId});
  }, [setTask, question, answers, task.taskId]);

  return (
    <div className="mx-auto p-4 border-t-2 border-x-2 border-zinc-500 w-5/6">
      <div>
        <label htmlFor={task.taskId + "question"} className="text-white">Question name: </label>
        <input className="bg-[#050409] text-white p-1 w-4/6 border border-zinc-700" id={task.taskId + "question"}
               type="text" defaultValue={question}
               onBlur={(e) => changeQuestion(e.target.value)}
               onChange={(e) => setQuestion(e.target.value)}/>
      </div>
      <div>
        {answers.map((answer, index) => (
          <div key={answer.answerId}>
            <AnswerForm answer={answer} taskId={task.taskId} index={index} changeCorrect={changeCorrect}
                        setAnswer={setAnswer}/>
          </div>
        ))}
        {answers.length < 4
          ? <div>
            <button
              className="text-white font-bold left-1 p-2 bg-green-800 hover:bg-green-700 hover:cursor-pointer relative"
              onClick={() => addAnswer()}>Add Answer
            </button>
          </div>
          : null}
      </div>
    </div>
  );
};

export default TaskForm;
