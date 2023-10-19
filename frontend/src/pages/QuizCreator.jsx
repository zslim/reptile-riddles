import React, { useEffect, useState } from 'react';
import { changeQuizName, getQuizById } from "../controllers/quizProvider";
import { useParams } from "react-router-dom";
import { fetchDetailedTasksByQuizId } from "../controllers/taskProvider";
import TaskForm from "../components/TaskForm";

const QuizCreator = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const {quizId} = useParams();
  const [isLoading, setIsLoading] = useState(false);

  async function saveQuizName(e) {
    try {
      await changeQuizName(e.target.value, quizId);
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getQuiz() {
      setIsLoading(true);
      try {
        const quiz = await getQuizById(quizId);
        const tasks = await fetchDetailedTasksByQuizId(quizId);
        setQuizTitle(quiz.title);
        setTasks(tasks);
        console.log(tasks);
      }
      catch (error) {
        console.error(error)
      }
      finally {
        setIsLoading(false);
      }
    }

    getQuiz();
  }, [quizId])
  if (isLoading) {
    return;
  }
  console.log(tasks);
  return (
    <div className="pt-14 bg-white">
      <div>
        <label htmlFor="name">Quiz title: </label>
        <input defaultValue={quizTitle} type="text" placeholder="Eg. My quiz" id="name"
               onBlur={(e) => saveQuizName(e)}
               onChange={(e) => setQuizTitle(e.target.value)}
        />
      </div>
      <div>
        {tasks?.map(task => (
          /** @namespace task.taskId **/
          <div key={task.taskId}>
            <TaskForm task={task}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCreator;