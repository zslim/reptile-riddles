import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { createGameLobby } from "../../providers/gameProvider";
import GameLobby from "../../components/GameLobby";
import { useUser } from "../../context/UserContextProvider";
import { socket } from "../../socket";
import ScoreBoard from "../../components/ScoreBoard";

const LobbyPage = () => {
  const EMPTY_QUIZ = {gameId: -1, title: "", taskCount: -1, playerCount: 0};
  const EMPTY_TASK = {taskIndex: -1, question: "", answers: [], deadline: Date.now()};
  const {quizId} = useParams();
  const [loading, setLoading] = useState(false);
  const [lobbyState, setLobbyState] = useState("creating");
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState(0);
  const [scores, setScores] = useState([]);
  const {user} = useUser();

  const [task, setTask] = useState({...EMPTY_TASK});
  const [quiz, setQuiz] = useState({...EMPTY_QUIZ});

  useEffect(() => {
    function onTaskChange(value) {
      const lastValidTime = value.deadline.valueOf();
      setTask({...value, deadline: lastValidTime});
      setLobbyState("running");
    }

    function onJoin(value) {
      setPlayerCount(value)
    }

    function onScoreboardDisplay(value) {
      setScores(value);
      setLobbyState("scoreboard");
    }

    socket.connect();
    socket.on('join', onJoin);
    socket.on('task_change', onTaskChange);
    socket.on('scoreboard', onScoreboardDisplay);

    return () => {
      socket.disconnect();
      socket.off('join', onJoin);
      socket.off('task_change', onTaskChange);
      socket.off('scoreboard', onScoreboardDisplay);
    };
  }, []);

  async function createLobby() {
    try {
      setLoading(true);
      const newQuiz = await createGameLobby(quizId);
      setQuiz(newQuiz);
      setPlayerCount(newQuiz.playerCount);
      setLobbyState("ready");
      socket.emit("create_room", newQuiz.generatedId);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  async function handleGameStart() {
    await getTaskForGame();
    setLobbyState("running");
  }

  function getTaskForGame() {
    if (task.taskIndex + 1 >= quiz.taskCount) {
      socket.emit("exit", quiz.generatedId);
      navigate("/result");
    }
    else {
      socket.emit("task_change", {taskIndex: task.taskIndex, gameId: quiz.generatedId})
    }
  }

  function navigateHome() {
    navigate("/");
  }

  function sendResults() {
    socket.emit("scoreboard", {gameId: quiz.gameId, gameUUID: quiz.generatedId});
  }

  return (
    <>
      {loading ? <Loading/>
        : <>
          {lobbyState === "creating"
            ? <div className="bg-[#1D2226] h-screen w-screen grid">
              <button
                className="w-fit h-fit p-16 place-self-center text-white font-bold text-3xl bg-pink-500 hover:bg-pink-600 rounded-md"
                onClick={() => createLobby()}>Create game lobby
              </button>
            </div> : null
          }
          {lobbyState === "ready"
            ? <GameLobby quiz={quiz} navigateHome={navigateHome} handleGameStart={handleGameStart}
                         role={"host"}
                         playerCount={playerCount}/> : null
          }
          {lobbyState === "running"
            ? <>
              <div className="text-3xl text-center text-white bg-black h-fit w-screen p-5 border-b-2 border-zinc-700">
                <div className="mx-auto w-5/6 text-5xl">
                  {task.question}
                </div>
              </div>
              <button
                className="mx-auto ml-8 mt-4 pb-16 text-white font-bold text-3xl bg-pink-500 hover:bg-pink-600 p-6 w-40 h-20  relative -bottom-4 rounded-md"
                onClick={() => sendResults()}>Results
              </button>
            </> : null}
          {lobbyState === "scoreboard" ?
            <>
              <div className="text-3xl text-center text-white bg-black h-fit w-screen p-5 border-b-2 border-zinc-700">
                <div className="mx-auto w-5/6">
                  SCOREBOARD
                </div>
              </div>
              <ScoreBoard scores={scores}
                          loading={loading}
                          taskCount={task.taskIndex + 1}
                          handleTaskChange={getTaskForGame}/>
            </>
            : null
          }
        </>
      }
    </>
  );
};

export default LobbyPage;
