import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TaskPage from "../TaskPage";
import Loading from "../../components/Loading";
import { createGameLobby, getNextTask, joinToGameLobby } from "../../controllers/gameProvider";

const QuizPage = () => {
  const {quizId} = useParams();
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({gameId: -1, title: "", taskCount: -1});
  const [firstTask, setFirstTask] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [temporaryPlayer, setTemporaryPlayer] = useState({playerName: "Sanyi", playerId: -1});
  const navigate = useNavigate();

  useEffect(() => {
    async function createLobby() {
      try {
        setLoading(true);
        const quiz = await createGameLobby(quizId);
        setQuiz(() => quiz);
        const playerId = await joinToGameLobby(quiz.gameId, temporaryPlayer.playerName);
        setTemporaryPlayer({...temporaryPlayer, playerId: playerId});
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }

    createLobby();
  }, []);

  async function handleGameStart(){
    await getTaskForGame();

  }

  async function getTaskForGame(){
    try {
      setLoading(true);
      const task = await getNextTask(quiz.gameId);
      setFirstTask({...task, deadline: new Date(task.deadline)});
      setIsPlaying(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function navigateHome() {
    navigate("/");
  }

  return (
    <>
      {loading ? <Loading/>
        : isPlaying ? <TaskPage firstTask={firstTask} quiz={quiz} player={temporaryPlayer}/>
          : <div className="bg-[#1D2226] h-screen">
            <div className="mx-auto h-3/6 w-3/6 rounded-3xl bg-black top-32 relative">
              <div className="pt-20 pb-10 text-white text-center text-4xl">{quiz.title}</div>
              <div className="grid grid-cols-2 mt-10">
                <div className="p-10 text-white text-2xl text-center">{quiz.taskCount} Questions</div>
                {quiz.taskCount <= 0
                  ? <button
                    className="mx-auto pb-16 text-white font-bold text-3xl bg-pink-500 hover:bg-pink-600 p-6 w-40 h-20  relative -bottom-4 rounded-md"
                    onClick={() => navigateHome()}>:(
                  </button>
                  : <button
                    className="mx-auto pb-16 text-white font-bold text-3xl bg-pink-500 hover:bg-pink-600 p-6 w-40 h-20  relative -bottom-4 rounded-md"
                    onClick={() => handleGameStart()}>Start
                  </button>
                }
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default QuizPage;
