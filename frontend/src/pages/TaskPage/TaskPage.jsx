import AnswerListContainer from "../../components/AnswerListContainer";
import ResultContainer from '../../components/ResultContainer';
import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from 'react';
import TimeCounter from "../../components/TimeCounter";
import WaitingContainer from "../../components/WaitingContainer";

const TaskPage = ({
                    task,
                    quiz,
                    changeGameState,
                    gameState,
                    selectAnswer,
                    selectedAnswer,
                    isCorrect,
                    handleSubmit,
                    timeLeft,
                    handleTimeChange
                  }) => {
  const [color, setColor] = useState("zinc-500");
  const [loading, setLoading] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);

  const navigate = useNavigate();

  // async function handleTaskChange() {
  //   if (quiz.taskCount - 1 > task.taskIndex) {
  //     try {
  //       setLoading(true);
  //       const newTask = await getNextTask(quiz.gameId);
  //       resetTimer(new Date(newTask.deadline));
  //       setTask({...newTask, deadline: new Date(newTask.deadline)});
  //       setGameState("playingField");
  //     }
  //     catch (e) {
  //       console.error(e);
  //     }
  //     finally {
  //       setLoading(false);
  //     }
  //   }
  //   else {
  //     navigate("/result");
  //   }
  // }
  //
  // async function handleSubmit(answer) {
  //   try {
  //     setLoading(true);
  //     const isCorrectAnswer = await handleAnswerSubmit(quiz.gameId, answer);
  //     setSelectedAnswer(answer);
  //     setIsCorrect(isCorrectAnswer);
  //     resetTimer();
  //     setGameState("result");
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  //   finally {
  //     setLoading(false);
  //   }
  // }
  //
  // async function navigateToScoreBoard() {
  //   try {
  //     setLoading(true);
  //     const updatedResult = await getGameResult(quiz.gameId);
  //     setScores(updatedResult);
  //     setGameState("scoreBoard");
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  //   finally {
  //     setLoading(false);
  //   }
  // }
  //
  // function resetTimer(deadline) {
  //   setIsTimedOut(false);
  //   const newTimeLeft = deadline - new Date().getTime();
  //   const toDisplay = Math.max(Math.floor(newTimeLeft / 1000), 0);
  //   setTimeLeft(toDisplay);
  // }

  function handleDisplayTimeChange(secondsLeft) {
    handleTimeChange(secondsLeft);
  }

  function handleDeadline() {
    setIsTimedOut(true);
    changeGameState("waiting");
  }

  function handleColorChange(selectedButtonColor) {
    setColor(selectedButtonColor);
  }

  const renderGameState = useCallback(() => {
    switch (gameState) {
      case "playingField":
        return <>
          {/*<TaskDisplayContainer/>*/}
          <AnswerListContainer
            handleSubmit={handleSubmit}
            task={task}
            handleColorChange={handleColorChange}
            loading={loading}/>
        </>;
      case "result":
        return <>
          {/*<TaskDisplayContainer/>*/}
          <ResultContainer
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            color={color}
            isTimedOut={isTimedOut}
            isAnswered={true}
            loading={loading}
          />
        </>;
      case "waiting":
        return <>
          {/*<TaskDisplayContainer/>*/}
          <WaitingContainer
            handleColorChange={handleColorChange}
            selectedAnswer={selectedAnswer}
            color={color}
            loading={loading}
            task={task}
          />
        </>;
      // case "scoreBoard":
      //   return <>
      //     <ScoreBoard scores={scores}
      //                 loading={loading}
      //                 taskCount={task.taskIndex + 1}/>
      //   </>;
    }
  }, [gameState]);

  return (
    <>
      <div className="bg-[#1D2226] h-screen text-white font-bold">
        <div className="text-3xl text-center text-white bg-black h-fit w-screen p-5 border-b-2 border-zinc-700">
          <div className="mx-auto w-5/6">
            {gameState === "scoreBoard" ? "SCOREBOARD" : task?.question}
          </div>
          {gameState === "playingField" ?
            <TimeCounter deadline={task.deadline} timeLeft={timeLeft}
                         handleDisplayTimeChange={handleDisplayTimeChange}
                         handleDeadline={handleDeadline} isAnswered={gameState === "answered"}
                         loading={loading}/>
            : null}
        </div>
        {renderGameState()}
      </div>
    </>
  );
};

export default TaskPage;
