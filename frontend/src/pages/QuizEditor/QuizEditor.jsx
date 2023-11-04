import React, { useEffect, useState } from 'react';
import { deleteQuizById, fetchModifiedAtById, fetchQuizById, updateQuizName } from "../../controllers/quizProvider";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTaskById, fetchDetailedTaskById, saveQuestion, updateQuestion,
} from "../../controllers/taskProvider";
import TaskForm from "../../components/TaskForm/TaskForm";
import {
  deleteAnswerList,
  magicalAnswerUpdate,
  saveAnswerList,
} from "../../controllers/answerProvider";

const QuizEditor = () => {
  const {quizId} = useParams();
  const navigate = useNavigate();

  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState({taskId: -2, taskIndex: -1, question: ''});
  const [quiz, setQuiz] = useState({title: '', modifiedAt: new Date(0)});
  const [answers, setAnswers] = useState([]);

  const [answerIndex, setAnswerIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [currentQuizInDb, setCurrentQuizInDb] = useState({title: ''});
  const [currentTaskInDb, setCurrentTaskInDb] = useState({taskId: -10, taskIndex: -10, question: ''});
  const [currentAnswersInDb, setCurrentAnswersInDb] = useState([]);

  const MAXIMUM_NUMBER_OF_ANSWERS = 6;
  const MINIMUM_NUMBER_OF_ANSWERS = 2;

  useEffect(() => {
    async function getQuiz() {
      try {
        setLoading(true);
        const newQuiz = await fetchQuizById(quizId);
        setCurrentQuizInDb({...setCurrentQuizInDb, title: newQuiz.title});
        setQuiz({...quiz, title: newQuiz.title, modifiedAt: newQuiz.modifiedAt});
        setTaskList([...newQuiz.taskList]);
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

  async function getLatestQuizVersion() {
    try {
      setLoading(true);
      setEditing(false);
      resetTaskDatabaseStatus();
      resetSelectedTaskState();
      const newQuiz = await fetchQuizById(quizId);
      setCurrentQuizInDb({...setCurrentQuizInDb, title: newQuiz.title});
      setQuiz({...quiz, title: newQuiz.title, modifiedAt: newQuiz.modifiedAt});
      setTaskList([...newQuiz.taskList]);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  async function handleTaskAddition() {
    if (await checkLastQuizModification() !== quiz.modifiedAt) {
      if (window.confirm("This quiz has been updated! Do you want to get the latest version?")) {
        await getLatestQuizVersion();
      }
      else {
        addNewTask();
      }
    }
    else {
      addNewTask();
    }
  }

  function addNewTask() {
    if (selectedTask.taskId > 0 && !isEqualWithTaskInDatabase(currentTaskInDb, selectedTask, currentAnswersInDb, answers)) {
      if (window.confirm("You have unsaved modifications! Are you discarding them?")) {
        addTask();
      }
    }
    else if (selectedTask.taskId !== -1) {
      addTask();
    }
    else {
      if (window.confirm("Are you leaving this question without saving?")) {
        addEmptyAnswers();
        resetTaskDatabaseStatus();
        setSelectedTask({...selectedTask, question: ""});
        setEditing(true);
      }
    }
  }

  function addTask() {
    addEmptyAnswers();
    resetTaskDatabaseStatus();
    const taskIndex = calculateTaskIndex();
    setSelectedTask({...selectedTask, question: '', taskId: -1, taskIndex: taskIndex});
    setTaskList((taskList) => [...taskList, {taskId: -1, question: '', taskIndex: taskIndex}]);
    setEditing(true);
  }

  async function handleTaskSelection(taskId) {
    if (await checkLastQuizModification() !== quiz.modifiedAt) {
      if (window.confirm("This quiz has been updated! Do you want to get the latest version?")) {
        await getLatestQuizVersion();
      }
      else {
        await selectNewTask(taskId);
      }
    }
    else {
      await selectNewTask(taskId);
    }
  }

  async function selectNewTask(taskId) {
    if (taskId >= 0) {
      if (selectedTask.taskId === -1 ||
        (!isEqualWithTaskInDatabase(currentTaskInDb, selectedTask, currentAnswersInDb, answers) && selectedTask.taskId > 0)) {
        if (window.confirm("Are you leaving this question without saving?")) {
          await selectTask(taskId);
          setTaskList((taskList) => [...taskList.filter((task) => task.taskId !== -1)]);
        }
      }
      else {
        await selectTask(taskId);
      }
    }
  }

  async function selectTask(taskId) {
    try {
      setLoading(true);
      const newTask = await fetchDetailedTaskById(taskId);
      updateTaskState(newTask);
      setEditing(true);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  async function handleTaskSave() {
    if (await checkLastQuizModification() !== quiz.modifiedAt) {
      if (window.confirm("This quiz has been updated! Do you want to get the latest version?")) {
        await getLatestQuizVersion();
      }
      else {
        await saveTask();
        const modifiedAt = await fetchModifiedAtById(quizId);
        setQuiz({...quiz, modifiedAt: modifiedAt});
      }
    }
    else {
      await saveTask();
      const modifiedAt = await fetchModifiedAtById(quizId);
      setQuiz({...quiz, modifiedAt: modifiedAt});
    }
  }

  async function saveTask() {
    if (selectedTask.taskId === -1 || selectedTask.taskId === undefined) {
      if (window.confirm("Save new task?")) {
        await saveNewTask();
      }
    }
    else if (!isEqualWithTaskInDatabase(currentTaskInDb, selectedTask, currentAnswersInDb, answers)) {
      if (window.confirm("Save changes?")) {
        await updateExistingTask();
      }
    } else {
      setEditing(false);
      resetSelectedTaskState();
      resetTaskDatabaseStatus();
    }
  }

  async function saveNewTask() {
    try {
      setLoading(true);
      const savedTask = await saveQuestion(quizId, selectedTask);
      setQuiz({...quiz, modifiedAt: savedTask.modifiedAt});
      await saveAnswerList(savedTask.taskId, answers);
      resetTaskDatabaseStatus();
      setTaskList((taskList) => [...(taskList.filter((task) => task.taskId !== -1)), savedTask]);
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

  async function updateExistingTask() {
    try {
      setLoading(true);
      await updateChangedObjects();
      resetTaskDatabaseStatus();
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

  async function updateChangedObjects() {
    if (!checkEqualityOnFieldsInDb(currentTaskInDb, selectedTask)) {
      const updatedQuestion = await updateQuestion(selectedTask.taskId, selectedTask);
      setTaskList([...taskList.map((task) => task.taskId === updatedQuestion.taskId ? updatedQuestion : task)]);
    }
    await updateChangedAnswers();
  }

  async function updateChangedAnswers() {
    let answersToPost = [];
    let answersToUpdate = [];
    let answersToDelete = [];

    for (const answer of currentAnswersInDb) {
      const answerWithMatchingId = answers.find((a) => a.answerId === answer.answerId);
      if (answerWithMatchingId === undefined) {
        answersToDelete.push(answer);
      }
      else if (!checkEqualityOnFieldsInDb(answer, answerWithMatchingId)) {
        answersToUpdate.push(answerWithMatchingId);
      }
    }
    for (const answer of answers) {
      if (currentAnswersInDb.find((a) => a.answerId === answer.answerId) === undefined) {
        answersToPost.push(answer);
      }
    }

    await magicalAnswerUpdate(answersToDelete, answersToUpdate, answersToPost, selectedTask.taskId);
  }

  async function handleTaskDelete() {
    if (await checkLastQuizModification() !== quiz.modifiedAt) {
      if (window.confirm("This quiz has been updated! Do you want to get the latest version?")) {
        await getLatestQuizVersion();
      }
      else {
        await deleteTask();
      }
    }
    else {
      await deleteTask();
    }
  }

  async function deleteTask() {
    if (window.confirm("Delete?")) {
      try {
        setLoading(true);
        if (selectedTask.taskId !== -1) {
          await deleteTaskById(selectedTask.taskId);
          await deleteAnswerList(answers);
          const modifiedAt = await fetchModifiedAtById(quizId);
          setQuiz({...quiz, modifiedAt: modifiedAt});
          resetTaskDatabaseStatus();
        }
        setTaskList((taskList) => [...taskList.filter((task) => task.taskId !== selectedTask.taskId)]);
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
    if (await checkLastQuizModification() !== quiz.modifiedAt) {
      if (window.confirm("This quiz has been updated! Do you want to get the latest version?")) {
        await getLatestQuizVersion();
      }
      else {
        await saveQuiz();
      }
    }
    else {
      await saveQuiz();
    }
  }

  async function saveQuiz() {
    if (editing) {
      await handleTaskSave();
      await saveQuizName();
    }
    else {
      if (window.confirm("Save changes?")) {
        await saveQuizName()
      }
    }
  }

  async function saveQuizName() {
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

  function indexAnswers(answerList) {
    let indexedAnswers = [];
    let tempIndex = answerIndex;
    let answerIndexes = answers.map((answer) => answer.index);
    answerList.map((answer) => {
      if (!("index" in answer) || answer.index === undefined) {
        while (answerIndexes.includes(tempIndex)) {
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

  function calculateTaskIndex() {
    let maxTaskIndex = -1;
    taskList.map((task) => task.taskIndex > maxTaskIndex ? maxTaskIndex = task.taskIndex : null);
    return maxTaskIndex + 1;
  }

  function addEmptyAnswers() {
    let tempAnswerIndex = answerIndex;
    const newAnswers = [];
    for (let i = 0; i < MINIMUM_NUMBER_OF_ANSWERS; i++) {
      newAnswers.push({text: "", isCorrect: false, index: tempAnswerIndex});
      tempAnswerIndex++;
    }
    setAnswers(newAnswers);
    setAnswerIndex(tempAnswerIndex);
  }

  function updateTaskState(newTask) {
    setCurrentTaskInDb({
      ...currentTaskInDb,
      question: newTask.question,
      taskId: newTask.taskId,
      taskIndex: newTask.taskIndex
    });
    setSelectedTask({
      ...selectedTask,
      question: newTask.question,
      taskId: newTask.taskId,
      taskIndex: newTask.taskIndex
    });
    setCurrentAnswersInDb(newTask.answers);
    setAnswers(indexAnswers(newTask.answers));
  }

  function resetSelectedTaskState() {
    setSelectedTask({
      ...currentTaskInDb,
      taskId: -2, taskIndex: -1, question: ''
    });
    setAnswers([]);
  }

  function resetTaskDatabaseStatus() {
    setCurrentTaskInDb({
      ...currentTaskInDb,
      question: "",
      taskId: -10,
      taskIndex: -10
    });
    setCurrentAnswersInDb([]);
  }

  function checkEqualityOnFieldsInDb(objectInDb, objectOnFrontend) {
    let isEqual = true;
    for (const [key, data] of Object.entries(objectInDb)) {
      if (objectOnFrontend[key] !== data) {
        isEqual = false;
      }
    }
    if (Object.entries(objectInDb) < 1) {
      isEqual = false;
    }
    return isEqual;
  }

  function isEqualWithTaskInDatabase(taskInDb, taskOnFrontend, answersInDb, answersOnFrontend) {
    let isEqual = true;
    if (checkEqualityOnFieldsInDb(taskInDb, taskOnFrontend) === false) {
      isEqual = false;
    }
    if (answersInDb.length !== answersOnFrontend.length) {
      isEqual = false;
    }
    for (const answer of answersInDb) {
      const answerWithMatchingId = answersOnFrontend.find((a) => a.answerId === answer.answerId);
      if (answerWithMatchingId === undefined) {
        isEqual = false;
      }
      else if (checkEqualityOnFieldsInDb(answer, answerWithMatchingId) === false) {
        isEqual = false;
      }
    }
    return isEqual;
  }

  async function checkLastQuizModification() {
    try {
      setLoading(true);
      return await fetchModifiedAtById(quizId);
    }
    catch (e) {
      console.error(e)
    }
    finally {
      setLoading(false);
    }
  }

  function handleTaskChange(task) {
    setSelectedTask(task);
  }

  function handleAnswersChange(answers) {
    setAnswers(answers);
  }

  return (
    <>
      <div className="h-[calc(100%-52px)] fixed bg-inherit w-full grid grid-cols-12">
        <div className="max-h-4/6 p-2 pl-6 mt-10 grid grid-cols-1 col-span-2 auto-rows-min">
          <div className="max-h-[65vh] overflow-auto pt-1 pb-1 grid grid-cols-1 gap-1">
            {taskList.map((task, i) => {
              return <button key={"task" + task.taskId}
                             className={`text-white font-bold p-4 
                               ${selectedTask === null ? "bg-neon-blue hover:bg-neon2-blue" : task.taskId === selectedTask.taskId
                               ? "bg-neon-pink hover:bg-neon2-pink" : "bg-neon-blue hover:bg-neon2-blue"} hover:cursor-pointer`}
                             onClick={() => handleTaskSelection(task.taskId)}>{i + 1}. Question
              </button>
            })}
          </div>
          <button
            className="h-fit text-white font-bold p-4 mt-4 bg-green-800 hover:bg-green-700 hover:cursor-pointer"
            onClick={() => handleTaskAddition()}>Add Question
          </button>
        </div>
        <div className="ml-20 w-full pl-4 pt-12 col-span-8">
          <div>
            <label htmlFor="name" className="text-white text-3xl">Quiz title: </label>
            <input className="ml-6 w-4/6 p-3 text-3xl bg-[#050409] text-white border-2 border-zinc-700"
                   value={quiz.title}
                   type="text" placeholder="Eg. My quiz" id="name"
                   onChange={(e) => setQuiz({...quiz, title: e.target.value})}
            />
          </div>
          <div className="pb-4 pt-8">
            {editing
              ? <>
                <TaskForm selectedTask={selectedTask}
                          handleTaskChange={handleTaskChange}
                          answers={answers}
                          handleAnswersChange={handleAnswersChange}
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
          <button
            className="mr-4 mt-6 text-white w-40 font-bold p-4 bg-green-800 hover:bg-green-700 hover:cursor-pointer"
            onClick={() => handleQuizSave()}>Save quiz
          </button>
          <button
            className="mt-6 text-white w-40 font-bold p-4 bg-red-800 hover:bg-red-700 hover:cursor-pointer"
            onClick={() => handleQuizDelete()}>Delete quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizEditor;