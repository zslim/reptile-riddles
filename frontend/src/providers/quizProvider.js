const {fetchFromBackEnd} = require("./providerBase");

async function updateQuizName(quizName, quizId) {
  const url = `/quiz/${quizId}`;
  const method = "PATCH";
  const body = {
    "title": quizName,
    "isPublic": true // TODO: create public checkbox in quiz editor
  };
  return await fetchFromBackEnd({url, method, body});
}

async function fetchQuizById(quizId) {
  const url = `/quiz/${quizId}`;
  return await fetchFromBackEnd({url});
}

async function fetchAllQuizzes() {
  const url = "/quiz/public";
  return await fetchFromBackEnd({url});
}

async function fetchMyQuizzes() {
  const url = "/quiz/own";
  return await fetchFromBackEnd({url});
}

async function saveEmptyQuiz() {
  const url = `/quiz/create`;
  const method = "POST";
  return await fetchFromBackEnd({url, method});
}

async function copyQuiz(quizId) {
  const url = `/quiz/copy/${quizId}`;
  const method = "POST";
  return await fetchFromBackEnd({url, method});
}

async function deleteQuizById(quizId) {
  const url = `/quiz/${quizId}`;
  const method = "DELETE";
  return await fetchFromBackEnd({url, method});
}

async function fetchModifiedAtById(quizId) {
  const url = `/quiz/modified/${quizId}`;
  return await fetchFromBackEnd({url});
}

module.exports = {
  updateQuizName,
  fetchQuizById,
  fetchAllQuizzes,
  fetchMyQuizzes,
  saveEmptyQuiz,
  copyQuiz,
  deleteQuizById,
  fetchModifiedAtById
};
