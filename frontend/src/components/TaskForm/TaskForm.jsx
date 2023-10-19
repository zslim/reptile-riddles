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

  return (
    <div>
      <div>
        <label htmlFor={task.taskId + "question"} className={"text-white"}>Question name: </label>
        <input id={task.taskId + "question"} type="text" defaultValue={question}
               onChange={(e) => setQuestion(e.target.value)}/>
      </div>
      <div>
        {answers.map((answer, index) => (
          <div key={answer.answerId}>
            <AnswerForm answer={answer} taskId={task.taskId} index={index} changeCorrect={changeCorrect}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskForm;
