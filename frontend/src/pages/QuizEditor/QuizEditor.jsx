import React, { useEffect, useState } from 'react';
import { deleteQuizById, fetchQuizById, updateQuizName } from "../../controllers/quizProvider";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTaskById, fetchDetailedTaskById,
  saveTask, updateTask
} from "../../controllers/taskProvider";
import TaskForm from "../../components/TaskForm/TaskForm";
import Loading from "../../components/Loading";

const QuizEditor = () => {
  const {quizId} = useParams();
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState({taskId: -2, taskIndex: -1, question: ''});
  const [quiz, setQuiz] = useState({title: ''});
  const [answers, setAnswers] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const MAXIMUM_NUMBER_OF_ANSWERS = 6;
  const MINIMUM_NUMBER_OF_ANSWERS = 2;

  useEffect(() => {
    async function getQuiz() {
      try {
        setLoading(true);
        const newQuiz = await fetchQuizById(quizId);
        setQuiz({...quiz, title: newQuiz.title});
        setTaskList([...newQuiz.taskIdList]);
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
    if (selectedTask.taskId !== -1) {
      let tempAnswerIndex = answerIndex;
      const newAnswers = [];
      for (let i = 0; i < MINIMUM_NUMBER_OF_ANSWERS; i++) {
        newAnswers.push({text: "", isCorrect: false, index: tempAnswerIndex});
        tempAnswerIndex++;
      }
      setAnswers(newAnswers);
      setAnswerIndex(tempAnswerIndex);

      setSelectedTask({...selectedTask, question: '', taskId: -1, taskIndex: taskList.length});
      setTaskList((taskIdList) => [...taskIdList, -1]);

      setEditing(true);
    }
    else {
      if (window.confirm("Are you leaving this question without saving?")) {
        setSelectedTask({...selectedTask, question: ""});
        const newAnswers = [];
        let tempIndex = answerIndex;
        for (let i = 0; i < MINIMUM_NUMBER_OF_ANSWERS; i++) {
          newAnswers.push({text: "", isCorrect: false, index: tempIndex});
          tempIndex++;
        }
        setAnswers(newAnswers);
        setAnswerIndex(tempIndex);
      }
    }
    setLoading(false);
    setEditing(true);
  }

  async function selectTask(taskId) {
    if (taskId !== -1) {
      if (selectedTask.taskId === -1) {
        if (window.confirm("Are you leaving this question without saving?")) {
          setLoading(true);
          const newTask = await fetchDetailedTaskById(taskId);
          setTaskList((taskIdList) => [...taskIdList.filter((id) => id !== -1)]);
          setSelectedTask({
            ...selectedTask,
            question: newTask.question,
            taskId: newTask.taskId,
            taskIndex: newTask.taskIndex
          });
          setAnswers(() => indexAnswers(newTask.answers));
          setLoading(false);
          setEditing(true);
        }
      }
      else {
        setLoading(true);
        const newTask = await fetchDetailedTaskById(taskId);
        setSelectedTask({
          ...selectedTask,
          question: newTask.question,
          taskId: newTask.taskId,
          taskIndex: newTask.taskIndex
        });
        setAnswers(() => indexAnswers(newTask.answers));
        setLoading(false);
        setEditing(true);
      }
    }
  }

  async function handleTaskSave() {
    if (window.confirm("Save changes?")) {
      try {
        setLoading(true);
        if (selectedTask.taskId === -1 || selectedTask.taskId === undefined) {
          const taskDTO = selectedTask;
          taskDTO.answers = answers;
          const savedTaskId = await saveTask(quizId, taskDTO);
          setTaskList((taskIdList) => [...(taskIdList.filter((id) => id !== -1)), savedTaskId]);
          setSelectedTask({...selectedTask, taskId: -2, taskIndex: -1, question: ''});

          setEditing(false);
        }
        else {
          const taskDTO = selectedTask;
          taskDTO.answers = answers;
          await updateTask(selectedTask.taskId, taskDTO);
          setSelectedTask({...selectedTask, taskId: -2, taskIndex: -1, question: ''});

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
        if (selectedTask.taskId !== -1) {
          await deleteTaskById(selectedTask.taskId);
        }
        setTaskList((taskIdList) => [...taskIdList.filter((task) => task.taskId !== selectedTask.taskId)]);
        setSelectedTask({...selectedTask, taskId: -2, taskIndex: -1, question: ''});

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

  async function handleQuizSave() {
    if (window.confirm("Save changes?")) {
      try {
        setLoading(true);
        await updateQuizName(quiz.title, quizId);
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

  function indexAnswers(answerList) {
    let indexedAnswers = [];
    let tempIndex = answerIndex;
    let answerIndexes = answers.map((answer) => answer.index);
    answerList.map((answer) => {
      if (!("index" in answer) || answer.index === undefined) {
        while (answerIndexes.includes(tempIndex)){
          tempIndex++;
        }
        answer.index = tempIndex;
        tempIndex++;
      }
      indexedAnswers.push(answer);
    });
    setAnswerIndex(tempIndex);
    return indexedAnswers;
  }

  async function handleQuizDelete() {
    if (window.confirm("Delete?")) {
      try {
        setLoading(true);
        await deleteQuizById(quizId);
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
      {/*{loading ? <Loading/>*/}
      {/*  :*/}
        <div className="h-[calc(100%-52px)] fixed bg-inherit w-full grid grid-cols-12">
          <div className="max-h-4/6 p-2 pl-6 mt-10 grid grid-cols-1 col-span-2 auto-rows-min">
            <div className="max-h-[65vh] overflow-auto pt-1 pb-1 grid grid-cols-1 gap-1">
              {taskList.map((task, i) => {
                return <button key={"task" + task}
                               className={`text-white font-bold p-4 
                               ${selectedTask === null ? "bg-neon-blue hover:bg-neon2-blue" : task === selectedTask.taskId
                                 ? "bg-neon-pink hover:bg-neon2-pink" : "bg-neon-blue hover:bg-neon2-blue"} hover:cursor-pointer`}
                               onClick={() => selectTask(task)}>{i + 1}. Question
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
                     value={quiz.title}
                     type="text" placeholder="Eg. My quiz" id="name"
                     onChange={(e) => setQuiz({...quiz, title: e.target.value})}
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
                  <TaskForm selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                            answers={answers}
                            setAnswers={setAnswers}
                            handleTaskSave={handleTaskSave}
                            handleTaskDelete={handleTaskDelete}
                            indexAnswers={indexAnswers}
                            MAXIMUM_NUMBER_OF_ANSWERS={MAXIMUM_NUMBER_OF_ANSWERS}
                            MINIMUM_NUMBER_OF_ANSWERS={MINIMUM_NUMBER_OF_ANSWERS}
                  />
                </>
                : null
              }
            </div>
          </div>
        </div>
      {/*}*/}
    </>
  );
};

export default QuizEditor;