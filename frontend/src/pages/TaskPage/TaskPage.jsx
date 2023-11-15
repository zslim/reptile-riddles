import AnswerListContainer from "../../components/AnswerListContainer";
import ResultContainer from '../../components/ResultContainer';
import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from 'react';
import TimeCounter from "../../components/TimeCounter";
import { getGameResult, getNextTask, handleAnswerSubmit } from "../../controllers/gameProvider";

const TaskPage = ({firstTask, quiz, player}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [task, setTask] = useState(firstTask);
  const [color, setColor] = useState("zinc-500");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [result, setResult] = useState([]);
  const [gameState, setGameState] = useState("playingField");
  const navigate = useNavigate();

  async function handleTaskChange() {
    if (quiz.taskCount - 1 > task.taskIndex) {
      try {
        setLoading(true);
        const newTask = await getNextTask(quiz.gameId);
        resetTimer(new Date(newTask.deadline));
        setTask({...newTask, deadline: new Date(newTask.deadline)});
        setGameState("playingField");
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
      const isCorrectAnswer = await handleAnswerSubmit(quiz.gameId, player.playerId, answer.answerId);
      setSelectedAnswer(answer);
      setIsCorrect(isCorrectAnswer);
      resetTimer();
      setGameState("result");
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  async function handleScoreDisplay() {
    try {
      setLoading(true);
      const updatedResult = await getGameResult(quiz.gameId);
      setResult(updatedResult);
      setGameState("scoreBoard");
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  function resetTimer(deadline) {
    setIsTimedOut(false);
    const newTimeLeft = deadline - new Date().getTime();
    const toDisplay = Math.max(Math.floor(newTimeLeft / 1000), 0);
    setTimeLeft(toDisplay);
  }

  function handleDisplayTimeChange(secondsLeft) {
    setTimeLeft(secondsLeft);
  }

  function handleDeadline() {
    setIsCorrect(false);
    setIsTimedOut(true);
    setGameState("result");
  }

  function handleColorChange(selectedButtonColor) {
    setColor(selectedButtonColor);
  }

  const renderGameState = useCallback(() => {
    switch (gameState) {
      case "playingField":
        return <>
          <div className="m-auto mt-20 w-3/6 h-2/6 bg-zinc-500 p-3 grid">
            Don't be fooled! This is an image!
          </div>
          <AnswerListContainer
            handleSubmit={handleSubmit}
            task={task}
            handleColorChange={handleColorChange}
            loading={loading}/>
        </>;
      case "result":
        return <>
          <div className="m-auto mt-20 w-3/6 h-2/6 bg-zinc-500 p-3 grid">
            Don't be fooled! This is an image!
          </div>
          <ResultContainer
            handleTaskChange={handleTaskChange}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            color={color}
            isTimedOut={isTimedOut}
            isAnswered={true}
            loading={loading}
            isDisplayingResult={false}
            handleResultDisplay={handleScoreDisplay}
          />
        </>;
      // case "timedOut":
      //   return <>
      //     <ResultContainer
      //       handleTaskChange={handleTaskChange}
      //       selectedAnswer={selectedAnswer}
      //       isCorrect={isCorrect}
      //       color={color}
      //       isAnswered={false}
      //       loading={loading}
      //       isDisplayingResult={false}
      //       handleResultDisplay={handleScoreDisplay}
      //     />
      //   </>
      case "scoreBoard":
        return <>
          <div className="m-auto mt-20 w-3/6 h-2/6 bg-zinc-500 p-3 grid grid-cols-1">
            {result?.map((player) => {
              return <div key={player.playerId} className="w-max h-max grid grid-cols-2">
                <div>{player.playerName}</div>
                <div>{player.score}</div>
              </div>;
            })}
          </div>
          <ResultContainer
            handleTaskChange={handleTaskChange}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            color={color}
            isAnswered={false}
            loading={loading}
            isDisplayingResult={true}
            handleResultDisplay={handleScoreDisplay}
          />
        </>;
    }
  }, [gameState]);

  return (
    <>
      <div className="bg-[#1D2226] h-screen text-white font-bold">
        <div className="text-3xl text-center text-white bg-black h-fit w-screen p-5 border-b-2 border-zinc-700">
          <div className="mx-auto w-5/6">
            {task?.question}
          </div>
          {gameState === "playing" ?
            <TimeCounter deadline={task.deadline} timeLeft={timeLeft} handleDisplayTimeChange={handleDisplayTimeChange}
                         handleDeadline={handleDeadline} isAnswered={gameState === "answered"} loading={loading}/>
            : null}
        </div>
        {renderGameState()}
      </div>
    </>
  );
};

export default TaskPage;
