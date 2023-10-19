import React from 'react';

const AnswerForm = ({answer, taskId, index, changeCorrect}) => {
  return (
    <div>
      <div>
        <label htmlFor={taskId + "-answer-" + index} className={"text-white"}>{index + ". answer: "}</label>
        <input defaultValue={answer.text} type={"text"} id={taskId + "-answer-" + index}/>
      </div>
      <div>
        <label htmlFor={taskId + "-checkbox - " + index} className={"text-white"}>Correct: </label>
        <input type="checkbox" defaultChecked={answer.isCorrect} id={taskId + "-checkbox-" + index}
               onChange={(e) => changeCorrect(e.target.checked, answer.answerId, answer.text)}/>
      </div>
    </div>
  );
};

export default AnswerForm;
