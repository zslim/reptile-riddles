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
                    indexAnswers
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
    handleAnswersChange((answers) => [...answers.filter((answer) => answer.index !== answerIndex)]);
  }

  return (
    <>
      <div className="p-4 border-2 border-zinc-500 w-5/6">
        <div className="m-4 mb-8">
          <label htmlFor={selectedTask.taskId + "question"} className="text-white">Question name: </label>
          <input className="bg-[#050409] text-white p-1 w-4/6 border border-zinc-700"
                 id={selectedTask.taskId + "question"}
                 type="text" value={selectedTask.question}
                 onChange={(e) => handleTaskChange({...selectedTask, question: e.target.value})}/>
        </div>
        <div>
          <label htmlFor={selectedTask.taskId + "time"} className="text-white">Time limit(seconds): </label>
          <input className="bg-[#050409] text-white p-1 w-1/6 border border-zinc-700"
                 id={selectedTask.taskId + "time"}
                 type="text" value={selectedTask.timeLimit}
                 onChange={(e) => handleTaskChange({...selectedTask, timeLimit: e.target.value})}/>
        </div>
        <div className="mb-4">
          {answers.map((answer, i) => (
            <div key={"answer" + answer.index}>
              <AnswerForm index={i} answer={answer} changeCorrect={changeCorrect} changeAnswer={changeAnswer}
                          deleteAnswer={deleteAnswer} isDeletable={answers.length > MINIMUM_NUMBER_OF_ANSWERS}/>
            </div>
          ))}
          {answers.length < MAXIMUM_NUMBER_OF_ANSWERS
            ? <div className="ml-24">
              <button
                className="text-white mt-4 font-bold left-1 p-2 bg-green-800 hover:bg-green-700 hover:cursor-pointer relative"
                onClick={() => addAnswer()}>Add Answer
              </button>
            </div>
            : null}
        </div>
        <div className="mt-12">
          <button
            className="m-4 text-white w-24 font-bold p-4 bg-green-800 hover:bg-green-700 hover:cursor-pointer"
            onClick={() => handleTaskSave()}>Save
          </button>
          <button
            className="m-4 text-white w-24 font-bold p-4 bg-red-800 hover:bg-red-700 hover:cursor-pointer"
            onClick={() => handleTaskDelete()}>Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
