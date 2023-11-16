import React from 'react';

const AnswerForm = ({index, answer, changeCorrect, changeAnswer, deleteAnswer, isDeletable, loading}) => {
  return (
    <div className="p-2 grid grid-cols-12 items-center">
      <div className="col-span-11">
        <label htmlFor={"answer-" + answer.index}
               className="text-white ml-4">{(index + 1) + ". "}</label>
        <input
          className={`ml-1 bg-[#050409] text-white p-1 border border-zinc-700 w-[calc(100%-80px)] ${isDeletable ? "border-r-0" : null}`}
          value={answer.text}
          type="text" id={"answer-" + answer.index}
          onChange={(e) => changeAnswer({
            isCorrect: answer.isCorrect,
            answerId: answer.answerId,
            text: e.target.value,
            index: answer.index
          })}
        />
        {isDeletable ?
          <button disabled={loading}
                  className={`text-stone-300 p-1 px-3 bg-[#050409] border border-zinc-700 
                  ${loading ? null : `hover:bg-zinc-800 hover:cursor-pointer`}`}
                  onClick={() => deleteAnswer(answer.index)}
          >
            x
          </button>
          : null
        }
      </div>
      <div className="col-span-1">
        <label htmlFor={"checkbox-" + answer.index} className="text-white"></label>
        <input type="checkbox" defaultChecked={answer.isCorrect} id={"checkbox-" + answer.index}
               className="scale-150 m-1 mr-6 float-right accent-stone-600 hover:cursor-pointer"
               onChange={(e) => changeCorrect(e.target.checked, answer.index)}/>
      </div>
    </div>
  );
};

export default AnswerForm;
