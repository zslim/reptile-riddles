import React, { useEffect, useState } from 'react';
import { deleteQuizById, fetchModifiedAtById, fetchQuizById, updateQuizName } from "../../providers/quizProvider";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTaskById, fetchDetailedTaskById, saveQuestion, updateQuestion, } from "../../providers/taskProvider";
import TaskForm from "../../components/TaskForm/TaskForm";
import { magicalAnswerUpdate, saveAnswerList, } from "../../providers/answerProvider";

const QuizEditor = () => {
  const {quizId} = useParams();
  const navigate = useNavigate();

  const DEFAULT_TASK = {taskId: -1, taskIndex: -1, question: '', timeLimit: 30};
  const DEFAULT_BRIEF_TASK = {taskId: -1, taskIndex: -1, question: ''};
  const DEFAULT_DB_TASK = {taskId: -10, taskIndex: -10, question: '', timeLimit: 0};

  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState({...DEFAULT_TASK});
  const [quiz, setQuiz] = useState({title: '', modifiedAt: new Date(0)});
  const [answers, setAnswers] = useState([]);

  const [answerIndex, setAnswerIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [currentQuizInDb, setCurrentQuizInDb] = useState({title: ''});
  const [currentTaskInDb, setCurrentTaskInDb] = useState({...DEFAULT_DB_TASK});
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

  async function needToLoadFromDb() {
    if (await isModified()) {
      return window.confirm("This quiz has been updated! Do you want to get the latest version?");
    }
    return false;
  }

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
    if (await isModified()) {
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
    if (!isNewTask(selectedTask.taskId) && !isSelectedTaskEqualWithTaskInDatabase()) {
      if (window.confirm("You have unsaved modifications! Are you discarding them?")) {
        addTask();
      }
    }
    else if (!isNewTask(selectedTask.taskId) || checkOneWayEquality(DEFAULT_TASK, selectedTask)) {
      addTask();
    }
    else {
      if (window.confirm("Are you leaving this question without saving?")) {
        resetTaskDatabaseStatus();
        resetSelectedTaskState();
        addEmptyAnswers();
        setEditing(true);
      }
    }
  }

  function addTask() {
    resetTaskDatabaseStatus();
    addEmptyAnswers();
    const taskIndex = calculateTaskIndex();
    setSelectedTask({...DEFAULT_TASK, taskIndex: taskIndex,});
    setTaskList((taskList) => [...taskList, {...DEFAULT_BRIEF_TASK, taskIndex: taskIndex}]);
    setEditing(true);
  }

  async function handleTaskSelection(taskId) {
    if (await isModified()) {
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
    if (!isNewTask(taskId)) {
      if (!isNewTask(selectedTask.taskId) && (!isSelectedTaskEqualWithTaskInDatabase())) {
        if (window.confirm("You have unsaved modifications! Are you discarding them?")) {
          await selectTask(taskId);
        }
      }
      else if (!isNewTask(selectedTask.taskId) || checkOneWayEquality(DEFAULT_TASK, selectedTask)) {
        await selectTask(taskId);
      }
      else {
        if (window.confirm("Are you leaving this question without saving?")) {
          await selectTask(taskId);
        }
      }
    }
  }

  async function selectTask(taskId) {
    try {
      setLoading(true);
      const newTask = await fetchDetailedTaskById(taskId);
      updateTaskState(newTask);
      setTaskList((taskList) => [...taskList.filter((task) => !isNewTask(task.taskId))]);
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
    let modifiedAt = quiz.modifiedAt;
    if (await isModified()) {
      if (window.confirm("This quiz has been updated! Do you want to get the latest version?")) {
        await getLatestQuizVersion();
      }
      else {
        await saveTask();
        modifiedAt = await fetchModifiedAtById(quizId);
        setQuiz({...quiz, modifiedAt: modifiedAt});
      }
    }
    else {
      await saveTask();
      modifiedAt = await fetchModifiedAtById(quizId);
      setQuiz({...quiz, modifiedAt: modifiedAt});
    }
    //TODO: look into modification time after updating task - it does not update properly
    modifiedAt = await fetchModifiedAtById(quizId);
    setQuiz({...quiz, modifiedAt});
  }

  async function saveTask() {
    if (isNewTask(selectedTask.taskId)) {
      if (window.confirm("Save new task?")) {
        await saveNewTask();
      }
    }
    else if (!isSelectedTaskEqualWithTaskInDatabase()) {
      if (window.confirm("Save changes?")) {
        await updateExistingTask();
      }
    }
    else {
      setEditing(false);
      resetSelectedTaskState();
      resetTaskDatabaseStatus();
    }
  }

  async function saveNewTask() {
    try {
      setLoading(true);
      const savedTask = await saveQuestion(quizId, selectedTask);
      await saveAnswerList(savedTask.taskId, answers);
      resetTaskDatabaseStatus();
      setTaskList((taskList) => [...(taskList.filter((task) => !isNewTask(task.taskId))), savedTask]);
      resetSelectedTaskState();
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
      resetSelectedTaskState();
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
    if (!checkOneWayEquality(currentTaskInDb, selectedTask)) {
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
      else if (!checkOneWayEquality(answer, answerWithMatchingId)) {
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
    if (window.confirm("Delete?")) {
      if (await needToLoadFromDb()) {
        await getLatestQuizVersion();
      }
      else {
        await deleteTask();
      }
    }
  }

  async function deleteTask() {
    try {
      setLoading(true);
      if (!isNewTask(selectedTask.taskId)) {
        await deleteTaskById(selectedTask.taskId);
        const modifiedAt = await fetchModifiedAtById(quizId);
        setQuiz({...quiz, modifiedAt});
        resetTaskDatabaseStatus();
      }
      setTaskList((taskList) => [...taskList.filter((task) => task.taskId !== selectedTask.taskId)]);
      resetSelectedTaskState();
      setEditing(false);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  async function handleQuizSave() {
    if (await isModified()) {
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
        await saveQuizName();
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
      taskIndex: newTask.taskIndex,
      timeLimit: newTask.timeLimit
    });
    setSelectedTask({
      ...selectedTask,
      question: newTask.question,
      taskId: newTask.taskId,
      taskIndex: newTask.taskIndex,
      timeLimit: newTask.timeLimit
    });
    setCurrentAnswersInDb([...newTask.answers.map((answer) => {
      return {...answer};
    })]);
    setAnswers(indexAnswers([...newTask.answers.map((answer) => {
      return {...answer};
    })]));
  }

  function resetSelectedTaskState() {
    setSelectedTask({...DEFAULT_TASK});
    setAnswers([]);
  }

  function resetTaskDatabaseStatus() {
    setCurrentTaskInDb({...DEFAULT_DB_TASK});
    setCurrentAnswersInDb([]);
  }

  function isNewTask(taskId) {
    return taskId < 0;
  }

  async function isModified() {
    return await checkLastQuizModification() !== quiz.modifiedAt;
  }

  function checkOneWayEquality(objectInDb, objectOnFrontend) {
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

  function isSelectedTaskEqualWithTaskInDatabase() {
    let isEqual = true;
    if (checkOneWayEquality(currentTaskInDb, selectedTask) === false) {
      isEqual = false;
    }
    if (currentAnswersInDb.length !== answers.length) {
      isEqual = false;
    }
    for (const answer of currentAnswersInDb) {
      const answerWithMatchingId = answers.find((a) => a.answerId === answer.answerId);
      if (answerWithMatchingId === undefined) {
        isEqual = false;
      }
      else if (checkOneWayEquality(answer, answerWithMatchingId) === false) {
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
      console.error(e);
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

  function createQuestionLabel(question) {
    const maxLength = 24;
    const length = Math.min(maxLength, question.length);
    return question.substring(0, length) + (question.length > maxLength ? "..." : "");
  }

  return (
    <>
      <div className="h-[calc(100%-52px)] fixed bg-inherit w-full grid grid-cols-12">
        <div className="max-h-4/6 p-2 pl-6 mt-10 grid grid-cols-1 col-span-2 auto-rows-min">
          <button
            disabled={loading}
            className={`h-fit text-white font-bold mb-4 p-4 bg-green-800 
                      ${loading ? null : `hover:bg-green-700 hover:cursor-pointer`}`}
            onClick={() => handleTaskAddition()}>Add Question
          </button>
          <div className="max-h-[65vh] overflow-auto p-2 bg-zinc-900 grid grid-cols-1 gap-1 border-2 border-zinc-500">
            {taskList.map((task, i) => {
              return <button key={"task" + task.taskId}
                             disabled={loading}
                             className={`text-white font-bold p-4 text-left
                               ${task.taskId === selectedTask.taskId
                               ? `bg-neon-blue ${loading ? null : `hover:bg-neon2-blue`}`
                               : `bg-zinc-800 ${loading ? null : `hover:bg-zinc-700`}`} 
                               ${loading ? null : `hover:cursor-pointer`}`}
                             onClick={() => handleTaskSelection(task.taskId)}>{i + 1}. {createQuestionLabel(task.question)}
              </button>;
            })}
          </div>

        </div>
        <div className="ml-20 w-full pl-4 pt-8 col-span-8">
          <div>
            <label htmlFor="name" className="text-white text-2xl">Quiz title: </label>
            <input className="ml-6 w-4/6 p-2 text-2xl bg-[#050409] text-white border-2 border-zinc-700"
                   value={quiz.title}
                   type="text" id="name"
                   onChange={(e) => setQuiz({...quiz, title: e.target.value})}
            />
          </div>
          <div className="pb-4 pt-6">
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
                          loading={loading}
                />
              </>
              : null
            }
          </div>
          <button
            disabled={loading}
            className={`mr-4 mt-2 text-white w-40 font-bold p-4 bg-green-800 
                      ${loading ? null : `hover:bg-green-700 hover:cursor-pointer`}`}
            onClick={() => handleQuizSave()}>Save quiz
          </button>
          <button
            disabled={loading}
            className={`mt-2 text-white w-40 font-bold p-4 bg-zinc-950 border-2 border-zinc-700 
            ${loading ? null : `hover:bg-zinc-900 hover:cursor-pointer`}`}
            onClick={() => handleQuizDelete()}>Delete quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizEditor;
