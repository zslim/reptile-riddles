import AnswerListContainer from "../../components/AnswerListContainer";
import ResultContainer from '../../components/ResultContainer';
import { useNavigate } from "react-router-dom";
import { fetchTask } from "../../controllers/taskProvider";
import { useState } from 'react';
import Loading from "../../components/Loading";
import TimeCounter from "../../components/TimeCounter";

const TaskPage = ({quizId, firstTask, taskCount, setTaskIndex, taskIndex}) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [task, setTask] = useState(firstTask);
  const [color, setColor] = useState("zinc-500");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeStamp, setTimeStamp] = useState(() => calculateTimeStamp());
  const [timeLeft, setTimeLeft] = useState();
  const [isTimedOut, setIsTimedOut] = useState(false);
  const navigate = useNavigate();

  async function handleTaskChange() {
    if (taskCount > taskIndex + 1) {
      try {
        setLoading(true);
        const newTask = await fetchTask(quizId, taskIndex + 1);
        setTask(() => newTask);
        setTaskIndex((taskIndex) => taskIndex + 1);
        setIsAnswered(false);
        resetTimer();
      }
      catch (e) {
        console.error(e);
      }
      finally {
        setLoading(false);
      }
    }
    else {
      navigate("/result");
    }
  }

  function resetTimer() {
    setTimeStamp(() => calculateTimeStamp());
    setTimeLeft(30);
    setIsTimedOut(false);
  }

  function calculateTimeStamp() {
    return new Date(new Date().getTime() + 32000);
  }

  function handleDeadline() {
    setIsTimedOut(true);
  }

  return (
    <>
      {loading ? <Loading/>
        : <div className="bg-[#1D2226] h-screen text-white font-bold">
          <div className="text-3xl text-center text-white bg-black h-fit w-screen p-5 border-b-2 border-zinc-700">
            <div className="mx-auto w-5/6">
              {task?.question}
            </div>
            {!isAnswered && !isTimedOut ?
              <TimeCounter deadline={timeStamp} timeLeft={timeLeft} setTimeLeft={setTimeLeft}
                           handleDeadline={handleDeadline} isAnswered={isAnswered}/>
              : null
            }
          </div>
          <div className="m-auto mt-20 w-3/6 h-2/6 bg-zinc-500 p-3 grid">
            Don't be fooled! This is an image!
          </div>
          {isAnswered || isTimedOut
            ? <ResultContainer
              handleTaskChange={handleTaskChange}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              color={color}
              isAnswered={isAnswered}
            />
            : <AnswerListContainer
              setSelectedAnswer={setSelectedAnswer}
              task={task}
              setIsAnswered={setIsAnswered}
              setIsCorrect={setIsCorrect}
              setColor={setColor}
              resetTimer={resetTimer}
            />
          }
        </div>
      }
    </>
  );
};

export default TaskPage;
