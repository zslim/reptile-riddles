import React, { useState } from 'react';
import { updateAnswer } from "../../controllers/taskProvider";

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
        <label htmlFor={task.taskId + "question"}>Question name: </label>
        <input id={task.taskId + "question"} type="text" defaultValue={question}
               onChange={(e) => setQuestion(e.target.value)}/>
      </div>
      <div>
        {answers.map(answer => (
          <div key={answer.answerId}>
            <h2>{answer.text}</h2>
            <input type="checkbox" defaultChecked={answer.isCorrect}
                   onChange={(e) => changeCorrect(e.target.checked, answer.answerId, answer.text)}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskForm;
