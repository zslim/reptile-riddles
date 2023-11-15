import AnswerListContainer from "../../components/AnswerListContainer";
import ResultContainer from '../../components/ResultContainer';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import TimeCounter from "../../components/TimeCounter";
import { getGameResult, getNextTask, handleAnswerSubmit } from "../../controllers/gameProvider";

const TaskPage = ({firstTask, quiz, player}) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [task, setTask] = useState(firstTask);
  const [color, setColor] = useState("zinc-500");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [result, setResult] = useState([]);
  const [isDisplayingResult, setIsDisplayingResult] = useState(false);
  const navigate = useNavigate();

  async function handleTaskChange() {
    if (quiz.taskCount > task.taskIndex) {
      try {
        setLoading(true);
        const newTask = await getNextTask(quiz.gameId);
        resetGameState(new Date(newTask.deadline));
        setTask({...newTask, deadline: new Date(newTask.deadline)});
        setIsAnswered(false);
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

  async function handleSubmit(answer) {
    try {
      setLoading(true);
      setIsDisplayingResult(false);
      const isCorrectAnswer = await handleAnswerSubmit(quiz.gameId, player.playerId, answer.answerId);
      console.log("gameId: " + quiz.gameId);
      console.log("playerId: " + player.playerId);
      console.log("answerId: " + answer.answerId);
      console.log(isCorrectAnswer);
      setSelectedAnswer(answer);
      setIsCorrect(isCorrectAnswer);
      resetGameState();
      setIsAnswered(true);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  async function handleResultDisplay() {
    try {
      setLoading(true);
      const updatedResult = await getGameResult(quiz.gameId);
      console.log(updatedResult);
      setResult(updatedResult);
      setIsDisplayingResult(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function resetGameState(deadline) {
    console.log("deadline: " + deadline);

    const newTimeLeft = deadline - new Date().getTime();
    const toDisplay = Math.max(Math.floor(newTimeLeft / 1000), 0);
    console.log("timeLeft: " + newTimeLeft);
    setTimeLeft(toDisplay);
    setIsTimedOut(false);
  }

  function handleDisplayTimeChange(secondsLeft) {
    setTimeLeft(secondsLeft);
  }

  function handleDeadline() {
    setIsCorrect(false);
    setIsTimedOut(true);
  }

  function handleColorChange(selectedButtonColor) {
    setColor(selectedButtonColor);
  }

  return (
    <>
      <div className="bg-[#1D2226] h-screen text-white font-bold">
        <div className="text-3xl text-center text-white bg-black h-fit w-screen p-5 border-b-2 border-zinc-700">
          <div className="mx-auto w-5/6">
            {task?.question}
          </div>
          {!isAnswered && !isTimedOut ?
            <TimeCounter deadline={task.deadline} timeLeft={timeLeft} handleDisplayTimeChange={handleDisplayTimeChange}
                         handleDeadline={handleDeadline} isAnswered={isAnswered} loading={loading}/>
            : null
          }
        </div>
        {isDisplayingResult ?
          <div className="m-auto mt-20 w-3/6 h-2/6 bg-zinc-500 p-3 grid grid-cols-1">
            {result?.map((player) => {
              return <div key={player.playerId} className="w-max h-max grid grid-cols-2">
                <div>{player.playerName}</div>
                <div>{player.score}</div>
              </div>
            })}
          </div>
        : <div className="m-auto mt-20 w-3/6 h-2/6 bg-zinc-500 p-3 grid">
          Don't be fooled! This is an image!
        </div>
        }
        {isAnswered || isTimedOut
          ? <ResultContainer
            handleTaskChange={handleTaskChange}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            color={color}
            isAnswered={isAnswered}
            loading={loading}
            isDisplayingResult={isDisplayingResult}
            handleResultDisplay={handleResultDisplay}
          />
          : <AnswerListContainer
            handleSubmit={handleSubmit}
            task={task}
            handleColorChange={handleColorChange}
            loading={loading}
          />
        }
      </div>
    </>
  );
};

export default TaskPage;
