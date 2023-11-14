import AnswerForm from "../AnswerForm";

const TaskForm = ({
                    selectedTask,
                    handleTaskChange,
                    handleTaskSave,
                    handleTaskDelete,
                    answers,
                    handleAnswersChange,
                    MAXIMUM_NUMBER_OF_ANSWERS,
                    MINIMUM_NUMBER_OF_ANSWERS,
                    indexAnswers,
                    loading
                  }) => {

  function changeCorrect(isCorrect, index) {
    const currentAnswer = answers.find((answer) => answer.index === index);
    currentAnswer.isCorrect = isCorrect;
    handleAnswersChange(answers);
  }

  async function addAnswer() {
    const indexedAnswer = indexAnswers([{text: "", isCorrect: false, answerId: -1,}])[0];
    handleAnswersChange([...answers, indexedAnswer]);
  }

  function changeAnswer(answer) {
    const updatedAnswers = answers.map(currAnswer => currAnswer.index === answer.index ? answer : currAnswer);
    handleAnswersChange(updatedAnswers);
  }

  function deleteAnswer(answerIndex) {
    handleAnswersChange([...answers.filter((answer) => answer.index !== answerIndex)]);
  }

  return (
    <>
      <div className="p-4 border-2 border-zinc-500 w-5/6 bg-zinc-800">
        <div className="m-4 mb-6">
          <label htmlFor={selectedTask.taskId + "question"} className="text-white text-xl">Question </label>
          <input className="bg-[#050409] text-white text-xl p-1 w-5/6 border border-zinc-700"
                 id={selectedTask.taskId + "question"}
                 type="text" value={selectedTask.question}
                 onChange={(e) => handleTaskChange({...selectedTask, question: e.target.value})}/>
        </div>
        <div className="m-4 mb-2">
          <label htmlFor={selectedTask.taskId + "time"} className="text-white">Time limit (seconds) </label>
          <input className="bg-[#050409] text-white p-1 w-16 border border-zinc-700"
                 id={selectedTask.taskId + "time"}
                 type="number" value={selectedTask.timeLimit}
                 onChange={(e) => handleTaskChange({...selectedTask, timeLimit: e.target.value})}/>
        </div>
        <div>
          <div className="text-white text-sm m-4 mb-0 mt-0">
            <p className="text-left">Answer options
              <span className="float-right">Correct</span>
            </p>
          </div>
          {answers.map((answer, i) => (
            <div key={"answer" + answer.index}>
              <AnswerForm index={i} answer={answer} changeCorrect={changeCorrect} changeAnswer={changeAnswer}
                          deleteAnswer={deleteAnswer} isDeletable={answers.length > MINIMUM_NUMBER_OF_ANSWERS}
                          loading={loading}
              />
            </div>
          ))}
          {answers.length < MAXIMUM_NUMBER_OF_ANSWERS
            ? <div className="ml-4">
              <button
                disabled={loading}
                className={`text-white mt-2 left-1 p-1 px-3 bg-zinc-700 border-2 border-zinc-500 relative 
                ${loading ? null : `hover:bg-zinc-600 hover:cursor-pointer`}`}
                onClick={() => addAnswer()}>+ Add option
              </button>
            </div>
            : null}
        </div>
        <div className="mt-4">
          <button
            disabled={loading}
            className={`m-4 mb-2 text-white w-24 font-bold p-2 bg-green-800 
            ${loading ? null : `hover:bg-green-700 hover:cursor-pointer`}`}
            onClick={() => handleTaskSave()}>Save
          </button>
          <button
            className={`m-4 mb-2 text-stone-300 w-24 font-bold p-2 bg-zinc-950 border-2 border-zinc-700 
            ${loading ? null : `hover:bg-zinc-900 hover:cursor-pointer`}`}
            onClick={() => handleTaskDelete()}>Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
