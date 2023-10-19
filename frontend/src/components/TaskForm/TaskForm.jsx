import React, { useState } from 'react';
import { updateAnswer } from "../../controllers/answerProvider";
import AnswerForm from "../AnswerForm";

const TaskForm = ({task, saveTask, deleteTask}) => {
  /** @namespace task.questionText **/
  const [question, setQuestion] = useState(task?.questionText ?? "");
  /** @namespace task.answers **/
  const [answers, setAnswer] = useState(task?.answers ?? []);

  async function changeCorrect(isCorrect, answerId, text) {
    const newAnswers = answers.map(answer => answer.answerId === answerId ? {
      answerId: answer.answerId,
      text: answer.text,
      isCorrect: isCorrect
    } : answer);
    setAnswer(() => newAnswers);
    const res = await updateAnswer({answerId, isCorrect, text});
  }

  async function addAnswer(){
    //create an empty answer
  }

  return (
    <div className="mx-auto p-4 border-t-2 border-x-2 border-zinc-500 w-5/6">
      <div>
        <label htmlFor={task.taskId + "question"} className={"text-white"}>Question name: </label>
        <input className="bg-[#050409] text-white p-1 w-4/6 border border-zinc-700" id={task.taskId + "question"} type="text" defaultValue={question}
               onChange={(e) => setQuestion(e.target.value)}/>
      </div>
      <div>
        {answers.map((answer, index) => (
          <div key={answer.answerId}>
            <AnswerForm answer={answer} taskId={task.taskId} index={index} changeCorrect={changeCorrect}/>
          </div>
        ))}
        {answers.length < 4
          ? <div>
            <AnswerForm answer={{text:"", answerId:69}} taskId={task.taskId} index={answers.length} changeCorrect={changeCorrect}/>
          </div>
        : null}
      </div>
    </div>
  );
};

export default TaskForm;
