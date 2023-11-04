import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TaskPage from "../TaskPage";
import { fetchQuizById } from "../../controllers/quizProvider";
import { fetchTask } from "../../controllers/taskProvider";
import Loading from "../../components/Loading";

const QuizPage = () => {
  const {quizId} = useParams();
  const [loading, setLoading] = useState(false);
  const [taskCount, setTaskCount] = useState(null);
  const [taskIndex, setTaskIndex] = useState(null);
  const [quiz, setQuiz] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [firstTask, setFirstTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getQuiz() {
      try {
        setLoading(true);
        const quiz = await fetchQuizById(quizId);
        const task = await fetchTask(quizId, 0);
        setFirstTask(() => task);
        setQuiz(() => quiz);
        setTaskCount(() => quiz.taskList.length);
        setTaskIndex(0);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }

    getQuiz();
  }, []);

  function navigateHome() {
    navigate("/");
  }

  return (
    <>
      {loading ? <Loading/>
        : isPlaying ? <TaskPage firstTask={firstTask} quizId={quizId} taskCount={taskCount} taskIndex={taskIndex}
                                setTaskIndex={setTaskIndex}/>
          : <div className="bg-[#1D2226] h-screen">
            <div className="mx-auto h-3/6 w-3/6 rounded-3xl bg-black top-32 relative">
              <div className="pt-20 pb-10 text-white text-center text-4xl">{quiz.title}</div>
              <div className="grid grid-cols-2 mt-10">
                <div className="p-10 text-white text-2xl text-center">{taskCount} Questions</div>
                {taskCount <= 0
                  ? <button
                    className="mx-auto pb-16 text-white font-bold text-3xl bg-pink-500 hover:bg-pink-600 p-6 w-40 h-20  relative -bottom-4 rounded-md"
                    onClick={() => navigateHome()}>:(
                  </button>
                  : <button
                    className="mx-auto pb-16 text-white font-bold text-3xl bg-pink-500 hover:bg-pink-600 p-6 w-40 h-20  relative -bottom-4 rounded-md"
                    onClick={() => setIsPlaying(true)}>Start
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
