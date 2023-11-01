import React from 'react';

const AnswerForm = ({answer, taskId, index, changeCorrect, setAnswer}) => {
  return (
    <div className="p-2 grid grid-cols-2 items-center">
      <div>
        <label htmlFor={taskId + "-answer-" + index} className="text-white">{(index + 1) + ". answer: "}</label>
        <input className="bg-[#050409] text-white p-1 border border-zinc-700 w-4/6" defaultValue={answer.text}
               type="text" id={taskId + "-answer-" + index}
               onChange={(e) => setAnswer({
                 isCorrect: answer.isCorrect,
                 answerId: answer.answerId,
                 text: e.target.value
               })}
               onBlur={(e) => changeCorrect(answer.isCorrect, answer.answerId, e.target.value)}
        />
      </div>
      <div>
        <label htmlFor={taskId + "-checkbox - " + index} className="text-white">Correct: </label>
        <input type="checkbox" defaultChecked={answer.isCorrect} id={taskId + "-checkbox-" + index}
               className="scale-150 m-1"
               onChange={(e) => changeCorrect(e.target.checked, answer.answerId, answer.text)}/>
      </div>
    </div>
  );
};

export default AnswerForm;
