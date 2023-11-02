import React, { useEffect, useState } from 'react';
import { deleteQuizById, fetchQuizById, updateQuizName } from "../../controllers/quizProvider";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTaskById,
  fetchDetailedTasksByQuizId,
  fetchTaskById,
  saveTask, updateTask
} from "../../controllers/taskProvider";
import TaskForm from "../../components/TaskForm/TaskForm";
import Loading from "../../components/Loading";

const QuizEditor = () => {
  const {quizId} = useParams();
  const [quizTitle, setQuizTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const MAXIMUM_NUMBER_OF_ANSWERS = 6;
  const MINIMUM_NUMBER_OF_ANSWERS = 2;

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

  async function addNewTask() {
    setLoading(true);
    if (selectedTask === null || selectedTask.taskId !== -1) {
      const newTask = await {question: "", answers: [], taskId: -1, taskIndex: tasks.length};
      for (let i = 0; i < MINIMUM_NUMBER_OF_ANSWERS; i++){
        newTask.answers.push({text:"", isCorrect: false});
      }
      setTasks(() => [...tasks, newTask]);
      setSelectedTask(() => newTask);
      setEditing(true);
    } else {
      if (window.confirm("Are you leaving this question without saving?")) {
        let taskToOverwrite = await tasks.find((task) => task.taskId === -1);
        taskToOverwrite = {question: "", answers: [], taskId: -1, taskIndex: tasks.length};
        for (let i = 0; i < MINIMUM_NUMBER_OF_ANSWERS; i++){
          taskToOverwrite.answers.push({text:"", isCorrect: false});
        }
        setSelectedTask(() => taskToOverwrite);
        setTasks(() => [...tasks]);
      }
    }
    setLoading(false);
    setEditing(true);
  }

  async function selectTask(taskId) {
    if (selectedTask !== null && selectedTask.taskId === -1){
      if (window.confirm("Are you leaving this question without saving?")) {
        setLoading(true);
        const taskToEdit = await tasks.find((task) => task.taskId === taskId);
        const updatedTasks = tasks.filter((task) => task.taskId !== selectedTask.taskId);
        setSelectedTask(() => taskToEdit);
        setTasks([...updatedTasks]);
        setLoading(false);
        setEditing(true);
      }
    } else {
      setLoading(true);
      const taskToEdit = await tasks.find((task) => task.taskId === taskId);
      setSelectedTask(() => taskToEdit);
      setLoading(false);
      setEditing(true);
    }
  }

  async function handleTaskSave() {
    if (window.confirm("Save changes?")) {
      try {
        setLoading(true);
        if (selectedTask.taskId === -1) {
          const savedTaskId = await saveTask(quizId, selectedTask);
          const savedTask = await fetchTaskById(savedTaskId);
          const updatedTasks = tasks.map((task) => task.taskId === -1 ? savedTask : task);
          setTasks(() => updatedTasks);
          setSelectedTask(() => null);
          setEditing(false);
        }
        else {
          const savedTask = await updateTask(selectedTask.taskId, selectedTask);
          const updatedTasks = tasks.map((task) => task.taskId === -1 ? savedTask : task);
          setTasks(() => updatedTasks);
          setSelectedTask(() => null);
          setEditing(false);
        }
      }
      catch (e) {
        console.error(e);
      }
      finally {
        setLoading(false);
      }
    }
  }

  async function handleTaskDelete() {
    if (window.confirm("Delete?")) {
      try {
        setLoading(true);
        if (setSelectedTask.taskId !== -1) {
          const deletedTaskId = await deleteTaskById(selectedTask.taskId);
        }
        const updatedTasks = tasks.filter((task) => task.taskId !== selectedTask.taskId);
        setTasks(() => updatedTasks);
        setSelectedTask(() => null);
        setEditing(false);
      }
      catch (e) {
        console.error(e);
      }
      finally {
        setLoading(false);
      }
    }
  }

  function updateQuizState() {
    const updatedTasks = tasks.map((task) => task.taskId === selectedTask.taskId ? selectedTask : task);
    setTasks(() => updatedTasks);
  }

  async function handleQuizSave() {
    if (window.confirm("Save changes?")) {
      try {
        setLoading(true);
        const res = await updateQuizName(quizTitle, quizId);
      }
      catch (e) {
        console.error(e);
      }
      finally {
        setLoading(false);
      }
    }
  }

  async function handleQuizDelete() {
    if (window.confirm("Delete?")) {
      try {
        setLoading(true);
        const res = await deleteQuizById(quizId);
        navigate("/quiz/all");
      }
      catch (e) {
        console.error(e);
      }
      finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      {loading ? <Loading/>
        :
        <div className="h-[calc(100%-52px)] fixed bg-inherit w-full grid grid-cols-12">
          <div className="max-h-4/6 p-2 pl-6 mt-10 grid grid-cols-1 col-span-2 auto-rows-min">
            <div className="max-h-[65vh] overflow-auto pt-1 pb-1 grid grid-cols-1 gap-1">
              {tasks.map((task) => {
                return <button key={task.taskId}
                               className={`text-white font-bold p-4 
                               ${selectedTask === null ? "bg-neon-blue hover:bg-neon2-blue" : task.taskId === selectedTask.taskId 
                               ? "bg-neon-pink hover:bg-neon2-pink" : "bg-neon-blue hover:bg-neon2-blue"} hover:cursor-pointer`}
                               onClick={() => selectTask(task.taskId)}>{task.taskIndex + 1}. Question
                </button>
              })}
            </div>
            <button
              className="h-fit text-white font-bold p-4 mt-4 bg-green-800 hover:bg-green-700 hover:cursor-pointer"
              onClick={() => addNewTask()}>Add Question
            </button>
          </div>
          <div className="ml-20 w-full pl-4 pt-12 col-span-8">
            <div>
              <label htmlFor="name" className="text-white text-xl">Quiz title: </label>
              <input className="p-2 text-xl bg-[#050409] text-white border-2 border-zinc-700 w-4/6"
                     defaultValue={quizTitle}
                     type="text" placeholder="Eg. My quiz" id="name"
                     onChange={(e) => setQuizTitle(e.target.value)}
              />
            </div>
            <button
              className="m-4 text-white w-24 font-bold p-4 bg-green-800 hover:bg-green-700 hover:cursor-pointer"
              onClick={() => handleQuizSave()}>Save
            </button>
            <button
              className="m-4 text-white w-24 font-bold p-4 bg-red-800 hover:bg-red-700 hover:cursor-pointer"
              onClick={() => handleQuizDelete()}>Delete
            </button>
            <div className="pb-4 pt-8">
              {editing
                ? <>
                  <TaskForm task={selectedTask}
                            setTask={setSelectedTask}
                            updateQuizState={updateQuizState}
                            handleTaskSave={handleTaskSave}
                            handleTaskDelete={handleTaskDelete}
                            MAXIMUM_NUMBER_OF_ANSWERS={MAXIMUM_NUMBER_OF_ANSWERS}
                            MINIMUM_NUMBER_OF_ANSWERS={MINIMUM_NUMBER_OF_ANSWERS}
                  />
                </>
                : null
              }
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default QuizEditor;