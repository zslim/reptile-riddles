import AnswerListContainer from "../components/AnswerListContainer";
import ResultContainer from "../components/ResultContainer";
import fetchTask from "../controllers/taskProvider";
import { useEffect, useState } from 'react';
import Loader from "../components/Loader";

const TaskPage = () => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const [quizId, setQuizId] = useState(1);
  const [taskIndex, setTaskIndex] = useState(0);
  const [task, setTask] = useState({});
  const [color, setColor] = useState("zinc-500");
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState({});

  useEffect(() => {
    async function getTask() {
      try {
        setLoading(true);
        const newTask = await fetchTask(quizId, taskIndex);
        setTask(() => newTask);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }

    getTask();
  }, []);

  return (
    <>
      {loading ? <Loader/>
        : <div className="bg-zinc-100 h-screen text-white font-bold">
          <div className="text-3xl text-center text-black bg-white h-20 w-screen p-5 border-b-2 border-zinc-300">
            {task?.questionText}
          </div>
          <div className="m-auto mt-20 w-3/6 h-3/6 bg-zinc-500 p-3 grid">
            Don't be fooled! This is an image!
          </div>
          {isAnswered
            ? <ResultContainer
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              setTask={setTask}
              setIsAnswered={setIsAnswered}
              color={color}/>
            : <AnswerListContainer
              setSelectedAnswer={setSelectedAnswer}
              task={task} setIsAnswered={setIsAnswered}
              setIsCorrect={setIsCorrect}
              setColor={setColor}/>
          }
        </div>
      }
    </>
  )
};

export default TaskPage;
