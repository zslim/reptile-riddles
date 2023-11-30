import React, { useEffect, useState } from 'react';
import {
  deleteQuizById,
  fetchCategories,
  fetchModifiedAtById,
  fetchQuizById,
  updateQuiz
} from "../../providers/quizProvider";
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
  const [quiz, setQuiz] = useState({title: '', modifiedAt: new Date(0), categories: [], isPublic: false});
  const [answers, setAnswers] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [answerIndex, setAnswerIndex] = useState(1);
  const [quizLoading, setQuizLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [currentQuizInDb, setCurrentQuizInDb] = useState({title: ''});
  const [currentTaskInDb, setCurrentTaskInDb] = useState({...DEFAULT_DB_TASK});
  const [currentAnswersInDb, setCurrentAnswersInDb] = useState([]);

  const MAXIMUM_NUMBER_OF_ANSWERS = 6;
  const MINIMUM_NUMBER_OF_ANSWERS = 2;

  useEffect(() => {
    async function getQuiz() {
      try {
        setQuizLoading(true);
        const newQuiz = await fetchQuizById(quizId);
        setCurrentQuizInDb(newQuiz);
        setQuiz(newQuiz);
        setTaskList([...newQuiz.taskList]);
        console.log(newQuiz);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setQuizLoading(false);
      }
    }

    getQuiz();
  }, [quizId]);

  useEffect(() => {
    async function getCategories() {
      try {
        setCategoriesLoading(true);
        const categories = await fetchCategories();
        setCategories(categories);
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setCategoriesLoading(false);
      }
    }

    getCategories();
  }, []);

  async function needToLoadFromDb() {
    if (await isModified()) {
      return window.confirm("This quiz has been updated! Do you want to get the latest version?");
    }
    return false;
  }

  async function getLatestQuizVersion() {
    try {
      setQuizLoading(true);
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
      setQuizLoading(false);
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
      setQuizLoading(true);
      const newTask = await fetchDetailedTaskById(taskId);
      updateTaskState(newTask);
      setTaskList((taskList) => [...taskList.filter((task) => !isNewTask(task.taskId))]);
      setEditing(true);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setQuizLoading(false);
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
      setQuizLoading(true);
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
      setQuizLoading(false);
    }
  }

  async function updateExistingTask() {
    try {
      setQuizLoading(true);
      await updateChangedObjects();
      resetTaskDatabaseStatus();
      resetSelectedTaskState();
      setEditing(false);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setQuizLoading(false);
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
      setQuizLoading(true);
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
      setQuizLoading(false);
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
      setQuizLoading(true);
      await updateQuiz(quiz, quizId);
      navigate("/quiz/all");
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setQuizLoading(false);
    }
  }

  async function handleQuizDelete() {
    if (window.confirm("Delete?")) {
      try {
        setQuizLoading(true);
        await deleteQuizById(quizId);
        navigate("/quiz/all");
      }
      catch (e) {
        console.error(e);
      }
      finally {
        setQuizLoading(false);
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

  function addCategoryToQuiz(e) {
    if (!quiz.categories.includes(e.target.value) && e.target.value !== "") {
      setQuiz(prevState => {
        let newQuiz = {...prevState};
        newQuiz.categories = [...prevState.categories, e.target.value];
        return newQuiz;
      });
    }
    setSelectedCategory("");
  }

  function deleteCategoryFromQuiz(categoryToDelete) {
    setQuiz(prevState => {
      let newQuiz = {...prevState};
      newQuiz.categories = [...prevState.categories.filter(category => category !== categoryToDelete)];
      return newQuiz;
    });
  }

  function changePublic(e) {
    console.log(e.target.checked);
    setQuiz(prevState => {
      let newQuiz = {...prevState};
      newQuiz.isPublic = e.target.checked;
      return newQuiz;
    });
  }

  async function checkLastQuizModification() {
    try {
      setQuizLoading(true);
      return await fetchModifiedAtById(quizId);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setQuizLoading(false);
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
      <div className="h-[calc(100%-52px)] w-full bg-inherit grid grid-cols-12">
        <div className="max-h-4/6 p-2 pl-6 mt-10 grid grid-cols-1 col-span-2 auto-rows-min">
          <button
            disabled={quizLoading}
            className={`h-fit text-white font-bold mb-4 p-4 bg-green-800 
                      ${quizLoading ? null : `hover:bg-green-700 hover:cursor-pointer`}`}
            onClick={() => handleTaskAddition()}>Add Question
          </button>
          <div
            className="max-h-[65vh] overflow-auto p-2 bg-zinc-900 grid grid-cols-1 gap-1 border-2 border-zinc-500">
            {taskList.map((task, i) => {
              return <button key={"task" + task.taskId}
                             disabled={quizLoading}
                             className={`text-white font-bold p-4 text-left
                               ${task.taskId === selectedTask.taskId
                               ? `bg-neon-blue ${quizLoading ? null : `hover:bg-neon2-blue`}`
                               : `bg-zinc-800 ${quizLoading ? null : `hover:bg-zinc-700`}`} 
                               ${quizLoading ? null : `hover:cursor-pointer`}`}
                             onClick={() => handleTaskSelection(task.taskId)}>{i + 1}. {createQuestionLabel(task.question)}
              </button>;
            })}
          </div>

        </div>


        <div className="ml-20 w-full pl-4 pt-8 col-span-8">
          <div className="border-2 border-zinc-500 mr-2 p-7 bg-zinc-800 w-5/6">
            <div>
              <label htmlFor="name" className="text-white text-2xl">Quiz title: </label>
              <input className="ml-6 w-4/6 p-2 text-2xl bg-[#050409] text-white border-2 border-zinc-700"
                     value={quiz.title}
                     type="text" id="name"
                     onChange={(e) => setQuiz({...quiz, title: e.target.value})}
              />
            </div>
            <div className="m-5 ml-12">
              <label className="text-white" htmlFor="categorySelect">Categories: </label>
              <select id="categorySelect" value={selectedCategory} disabled={categoriesLoading}
                      onChange={(e) => addCategoryToQuiz(e)}>
                <option value="" disabled>Choose category!</option>
                {categories.map(
                  category => (<option value={category} key={"option" + category}>{category}</option>)
                )}
              </select>
              <label className="inline-block ml-8 text-white" htmlFor="publicOrPrivate">Public:</label>
              <input className="scale-150 m-1 mr-6 ml-2 accent-stone-600 hover:cursor-pointer"
                     type="checkbox"
                     checked={quiz.isPublic}
                     onChange={e => changePublic(e)}/>
            </div>
            <div className="table">
              {quiz.categories.map(category => (
                <span
                  className="border-2 border-amber-600 ml-4 rounded-2xl p-2 bg-amber-300 mb-4 inline-block"
                  key={"span" + category}>{category}
                  <button className="ml-2 text-red-700"
                          onClick={() => deleteCategoryFromQuiz(category)}>X</button>
              </span>
              ))}
            </div>
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
                          loading={quizLoading}
                />
              </>
              : null
            }
          </div>
          <button
            disabled={quizLoading}
            className={`mr-4 mt-2 text-white w-40 font-bold p-4 bg-green-800 
                      ${quizLoading ? null : `hover:bg-green-700 hover:cursor-pointer`}`}
            onClick={() => handleQuizSave()}>Save quiz
          </button>
          <button
            disabled={quizLoading}
            className={`mt-2 text-white w-40 font-bold p-4 bg-zinc-950 border-2 border-zinc-700 
            ${quizLoading ? null : `hover:bg-zinc-900 hover:cursor-pointer`}`}
            onClick={() => handleQuizDelete()}>Delete quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizEditor;
