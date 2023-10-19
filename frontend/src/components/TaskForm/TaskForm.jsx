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
        <label htmlFor={task.taskId + "question"} className={"text-white"}>Question name: </label>
        <input id={task.taskId + "question"} type="text" defaultValue={question}
               onChange={(e) => setQuestion(e.target.value)}/>
      </div>
      <div>
        {answers.map((answer, index) => (
          <>
            <div>
              <label htmlFor={task.taskId + "-answer-" + index} className={"text-white"}>{index + ". answer: "}</label>
              <input defaultValue={answer.text} type={"text"} id={task.taskId + "-answer-" + index}/>
            </div>
            <div>
              <label htmlFor={task.taskId + "-checkbox - " + index} className={"text-white"}>Correct: </label>
              <input type="checkbox" defaultChecked={answer.isCorrect} id={task.taskId + "-checkbox-" + index}
                     onChange={(e) => changeCorrect(e.target.checked, answer.answerId, answer.text)}/>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default TaskForm;
