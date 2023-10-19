import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import TaskPage from "./TaskPage";
import { fetchAllQuizzes, getQuizById } from "../controllers/quizProvider";
import { fetchTask } from "../controllers/taskProvider";

const QuizPage = () => {
  const { quizId } = useParams();
  const [loading, setLoading] = useState(false);
  const [taskCount, setTaskCount] = useState(-1);
  const [currentTask, setCurrentTask] = useState(-1);
  const [quiz, setQuiz] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [firstTask, setFirstTask] = useState({});

  useEffect(() => {
    async function getQuiz() {
      try {
        setLoading(true);
        const quiz = await getQuizById(quizId);
        const task = await fetchTask(quizId, 0);
        setFirstTask(() => task);
        setQuiz(() => quiz);
        setTaskCount(() => quiz.taskIdList.length);
        setCurrentTask(0);
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

  return (
    <div className="p-16">
      {isPlaying
        ? <TaskPage firstTask={firstTask} quizId={quizId} taskCount={taskCount} currentTask={currentTask} setCurrentTask={setCurrentTask} />
        : <>
          <div className="p-8">{quiz.title}</div>
          <button onClick={() => setIsPlaying(true)}>Start</button>
        </>
      }
    </div>

  );
};

export default QuizPage;