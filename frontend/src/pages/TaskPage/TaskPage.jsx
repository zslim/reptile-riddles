import AnswerListContainer from "../../components/AnswerListContainer";
import ResultContainer from '../../components/ResultContainer';
import { useNavigate} from "react-router-dom";
import { fetchTask } from "../../controllers/taskProvider";
import { useState } from 'react';
const TaskPage = ({quizId, firstTask, taskCount, setTaskIndex, taskIndex}) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const [task, setTask] = useState(firstTask);
  const [color, setColor] = useState("zinc-500");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <>
         <div className="bg-zinc-100 h-screen text-white font-bold">
          <div className="text-3xl text-center text-black bg-white h-20 w-screen p-5 border-b-2 border-zinc-300">
            {task?.questionText}
          </div>
          <div className="m-auto mt-20 w-3/6 h-2/6 bg-zinc-500 p-3 grid">
            Don't be fooled! This is an image!
          </div>
          {isAnswered
            ? <ResultContainer
              handleTaskChange={handleTaskChange}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              color={color}
            />
            : <AnswerListContainer
              setSelectedAnswer={setSelectedAnswer}
              task={task}
              setIsAnswered={setIsAnswered}
              setIsCorrect={setIsCorrect}
              setColor={setColor}/>
          }
        </div>
    </>
  );
};

export default TaskPage;
