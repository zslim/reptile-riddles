import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TaskPage from "../TaskPage";
import Loading from "../../components/Loading";
import { getQuizByGameId, handleAnswerSubmit } from "../../providers/gameProvider";
import GameLobby from "../../components/GameLobby";
import { useUser } from "../../context/UserContextProvider";
import { socket } from "../../socket";
import moment from "moment";

const QuizPage = () => {
  const EMPTY_QUIZ = {gameId: -1, title: "", taskCount: -1, playerCount: 0};
  const {gameId} = useParams();
  const [loading, setLoading] = useState(false);
  const [lobbyState, setLobbyState] = useState("ready");
  const navigate = useNavigate();
  const [gameState, setGameState] = useState("playingField");
  const [playerCount, setPlayerCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [joined, setJoined] = useState(false);

  const {user} = useUser();

  const [quiz, setQuiz] = useState({...EMPTY_QUIZ});
  const [task, setTask] = useState({});

  useEffect(() => {
    function onJoinEvent(value) {
      setPlayerCount(value);
    }

    function onTaskChange(value) {
      console.log(value);
      const lastValidTime = Date.parse((value.deadline));
      console.log(lastValidTime);
      setTask({...value, deadline: lastValidTime});
      setGameState("playingField");
      setLobbyState("running");
    }

    function onResultDisplay() {
      setGameState("result");
      // setLobbyState("result");
    }

    function onSubmit(value) {
      console.log("isCorrect? " + value);
      setIsCorrect(value);
    }

    function onExit(){
      navigate("/result");
    }

    socket.connect();
    socket.on('join', onJoinEvent);
    socket.on('task_change', onTaskChange);
    socket.on('result', onResultDisplay);
    socket.on("submit", onSubmit);
    socket.on("exit", onExit);
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.disconnect();
      socket.off('join', onJoinEvent);
      socket.off('task_change', onTaskChange);
      socket.off('result', onResultDisplay);
      socket.off('submit', onSubmit);
      socket.off('exit', onExit);
      socket.off("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    };
  }, []);

  useEffect(() => {
    async function getQuizData() {
      try {
        setLoading(true);
        const currentQuiz = await getQuizByGameId(gameId);
        setQuiz(currentQuiz);
        setPlayerCount(currentQuiz.playerCount);
      }
      catch (e) {
        console.error(e)
      }
      finally {
        setLoading(false);
      }
    }

    getQuizData();
  }, []);

  function navigateHome() {
    navigate("/");
  }

  function sendJoinEvent() {
    socket.emit("join", {gameId: gameId, name: user.username});
    setJoined(true);
  }

  function changeGameState(gameStatus) {
    setGameState(gameStatus);
  }

  function selectAnswer(answer) {
    setSelectedAnswer(answer);
  }

  async function handleSubmit(answer) {
    try {
      setLoading(true);
      // const isCorrectAnswer = await handleAnswerSubmit(quiz.gameId, answer);
      selectAnswer(answer);
      socket.emit("submit", {...answer, gameId: quiz.gameId, username: user.username});
      // setIsCorrect(isCorrectAnswer);
      resetTimer(task.deadline);
      changeGameState("waiting");
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  function resetTimer(deadline) {
    // setIsTimedOut(false);
    const newTimeLeft = deadline - new Date().getTime();
    const toDisplay = Math.max(Math.floor(newTimeLeft / 1000), 0);
    setTimeLeft(toDisplay);
  }

  function handleTimeChange(time) {
    setTimeLeft(time);
  }

  return (
    <>
      {loading ? <Loading/>
        : <>
          {lobbyState === "ready"
            ? <>
              <GameLobby quiz={quiz} navigateHome={navigateHome} role={"player"}
                         playerCount={playerCount} sendJoinEvent={sendJoinEvent} joined={joined}/>
            </> : null
          }
          {lobbyState === "running" ?
            <TaskPage task={task} quiz={quiz} gameState={gameState} changeGameState={changeGameState}
                      selectAnswer={selectAnswer} selectedAnswer={selectedAnswer} isCorrect={isCorrect}
                      handleSubmit={handleSubmit} timeLeft={timeLeft}
                      handleTimeChange={handleTimeChange}/> : null}
        </>
      }
    </>
  );
};

export default QuizPage;
