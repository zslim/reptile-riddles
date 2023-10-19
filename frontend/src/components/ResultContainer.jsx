import { fetchTask } from '../controllers/taskProvider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import checkMark from "../assets/checkmark.png";
import cross from "../assets/cross.png";

const ResultContainer = ({selectedAnswer, isCorrect, setIsAnswered, color, setCurrentTask, taskIndex, taskCount, setTaskIndex, quizId, setTask}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  async function handleTaskChange() {
    if (taskCount > taskIndex + 1){
      try{
        setLoading(true);
        const newTask = await fetchTask(quizId, taskIndex + 1);
        setTask(() => newTask);
        setTaskIndex((taskIndex) => taskIndex + 1);
        setIsAnswered(false);
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/result");
    }
  }

  return (
    <div>
      {isCorrect ? <div className="text-3xl text-black flex justify-center mt-5">
          <img src={checkMark} alt="check-mark" className="relative bottom-3 w-16 h-16 p-3"></img>
          <div className="w-min h-min">Correct!</div>
        </div>
        : <div className="text-3xl text-black flex justify-center mt-5">
          <img src={cross} alt="cross" className="relative bottom-3 w-16 h-16 p-3"></img>
          <div className="w-min h-min">Wrong!</div>
        </div>}
      <div className={`${color} mx-auto m-4 pointer-events-none border-4 w-6/12 ` +
        (isCorrect ? "border-icon-green" : "border-icon-red")}>
        <div className="p-6 text-white">{selectedAnswer}</div>
      </div>
      <button onClick={() => handleTaskChange()}
              className="absolute right-20 p-4 bg-zinc-400 hover:bg-zinc-500 hover:cursor-pointer">Next
      </button>
    </div>
  )
}

export default ResultContainer;
