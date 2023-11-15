import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TaskPage from "../TaskPage";
import Loading from "../../components/Loading";
import { createGameLobby, getNextTask, joinToGameLobby } from "../../controllers/gameProvider";
import GameLobby from "../../components/GameLobby";

const QuizPage = () => {
  const {quizId} = useParams();
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({gameId: -1, title: "", taskCount: -1});
  const [firstTask, setFirstTask] = useState({});
  const [temporaryPlayer, setTemporaryPlayer] = useState({playerName: "Sanyi", playerId: -1});
  const [lobbyState, setLobbyState] = useState("creating");
  const navigate = useNavigate();

  async function createLobby() {
    try {
      setLoading(true);
      const quiz = await createGameLobby(quizId);
      setQuiz(() => quiz);
      const playerId = await joinToGameLobby(quiz.gameId, temporaryPlayer.playerName);
      setTemporaryPlayer({...temporaryPlayer, playerId: playerId});
      setLobbyState("ready");
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

  async function getTaskForGame() {
    try {
      setLoading(true);
      const task = await getNextTask(quiz.gameId);
      setFirstTask({...task, deadline: new Date(task.deadline)});
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  function navigateHome() {
    navigate("/");
  }

  const renderLobbyState = useCallback(() => {
    switch (lobbyState) {
      case "creating":
        return <button
          className="mx-auto pb-16 text-white font-bold text-3xl bg-pink-500 hover:bg-pink-600 p-6 w-40 h-20 relative m-bottom-4 rounded-md"
          onClick={() => createLobby()}>Create game lobby
        </button>
      case "ready":
        return <GameLobby quiz={quiz} navigateHome={navigateHome} handleGameStart={handleGameStart}/>
      case "running":
        return <TaskPage firstTask={firstTask} quiz={quiz} player={temporaryPlayer}/>
    }
  }, [lobbyState])

  return (
    <>
      {loading ? <Loading/>
        : renderLobbyState()
      }
    </>
  );
};

export default QuizPage;
