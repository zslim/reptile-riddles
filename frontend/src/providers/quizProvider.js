const {fetchFromBackEnd} = require("./providerBase");

async function updateQuiz(quiz, quizId) {
  return await fetchFromBackEnd({
    url: `/quiz/${quizId}`, method: "PATCH", body: quiz
  });
}

async function fetchQuizById(quizId) {
  return await fetchFromBackEnd({url: `/quiz/${quizId}`});
}

async function fetchCategories() {
  return await fetchFromBackEnd({url: '/quiz/categories'});
}

async function fetchAllQuizzes() {
  return await fetchFromBackEnd({url: "/quiz/public"});
}

async function fetchMyQuizzes() {
  return await fetchFromBackEnd({url: "/quiz/own"});
}

async function saveEmptyQuiz() {
  return await fetchFromBackEnd({url: "/quiz/create", method: "POST"});
}

async function copyQuiz(quizId) {
  return await fetchFromBackEnd({url: `/quiz/copy/${quizId}`, method: "POST"});
}

async function deleteQuizById(quizId) {
  return await fetchFromBackEnd({url: `/quiz/${quizId}`, method: "DELETE"});
}

async function fetchModifiedAtById(quizId) {
  return await fetchFromBackEnd({url: `/quiz/modified/${quizId}`});
}

module.exports = {
  updateQuiz,
  fetchQuizById,
  fetchAllQuizzes,
  fetchMyQuizzes,
  saveEmptyQuiz,
  copyQuiz,
  deleteQuizById,
  fetchModifiedAtById,
  fetchCategories
};
