import React, { useEffect, useState } from 'react';
import { updateQuizName, fetchQuizById } from "../../controllers/quizProvider";
import { useParams } from "react-router-dom";
import { fetchDetailedTasksByQuizId, fetchTaskById, saveEmptyTask } from "../../controllers/taskProvider";
import TaskForm from "../../components/TaskForm/TaskForm";
import Loading from "../../components/Loading";

const QuizCreator = () => {
  const [quizTitle, setQuizTitle] = useState("");
  let [tasks, setTasks] = useState([]);
  const {quizId} = useParams();
  const [loading, setLoading] = useState(false);

  async function saveQuizName(e) {
    try {
      setLoading(true);
      await updateQuizName(e.target.value, quizId);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getQuiz() {
      try {
        setLoading(true);
        const quiz = await fetchQuizById(quizId);
        const tasks = await fetchDetailedTasksByQuizId(quizId);
        setQuizTitle(quiz.title);
        setTasks(tasks);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }

    getQuiz();
  }, [quizId]);
  if (loading) {
    return;
  }

  async function addNewTask() {
    try {
      setLoading(true);
      const taskId = await saveEmptyTask(quizId);
      const newTask = await fetchTaskById(taskId);
      setTasks([...tasks, newTask]);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  function setTask(task) {
    tasks = tasks.map(currTask => currTask.taskId === task.taskId ? task : currTask);
  }

  return (
    <>
      {loading ? <Loading/>
        : <div className="pt-2 bg-[#1D2226] h-fit pb-40">
          <div className="pl-20 p-12">
            <label htmlFor="name" className="text-white text-xl">Quiz title: </label>
            <input className="p-2 text-xl bg-[#050409] text-white border-2 border-zinc-700 w-4/6"
                   defaultValue={quizTitle}
                   type="text" placeholder="Eg. My quiz" id="name"
                   onBlur={(e) => saveQuizName(e)}
                   onChange={(e) => setQuizTitle(e.target.value)}
            />
          </div>
          <div className="pb-4">
            {tasks?.map(task => (
              /** @namespace task.taskId **/
              <div key={task.taskId}>
                <TaskForm task={task} setTask={setTask}/>
              </div>
            ))}
          </div>
          <button
            className="absolute text-white font-bold left-32 p-4 bg-green-800 hover:bg-green-700 hover:cursor-pointer"
            onClick={() => addNewTask()}>Add Question
          </button>
        </div>
      }
    </>
  );
};

export default QuizCreator;
