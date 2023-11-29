async function updateQuizName(quiz, quizId) {
  const httpRes = await fetch(`/quiz/${quizId}`, {
    method: "PATCH",
    body: JSON.stringify(quiz),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await httpRes.json();
}

async function fetchQuizById(quizId) {
  const httpRes = await fetch(`/quiz/${quizId}`);
  return await httpRes.json();
}

async function fetchCategories(){
  const httpRes = await fetch("/quiz/categories");
  return await httpRes.json();
}

async function fetchAllQuizzes() {
  const httpRawRes = await fetch("/quiz/public");
  return await httpRawRes.json();
}

async function fetchMyQuizzes() {
  const httpRawRes = await fetch("/quiz/own");
  return await httpRawRes.json();
}

async function saveEmptyQuiz() {
  const httpRes = await fetch(`/quiz/create`, {
    method: "POST"
  });
  return await httpRes.json();
}

async function copyQuiz(quizId) {
  const httpRes = await fetch(`/quiz/copy/${quizId}`, {
    method: "POST"
  });
  return await httpRes.json();
}

async function deleteQuizById(quizId) {
  const httpRes = await fetch(`/quiz/${quizId}`, {
    method: "DELETE"
  });
  return await httpRes.json();
}

async function fetchModifiedAtById(quizId) {
  const httpRes = await fetch(`/quiz/modified/${quizId}`);
  return await httpRes.json();
}

module.exports = {
  updateQuizName,
  fetchQuizById,
  fetchAllQuizzes,
  fetchMyQuizzes,
  saveEmptyQuiz,
  copyQuiz,
  deleteQuizById,
  fetchModifiedAtById,
  fetchCategories
};
