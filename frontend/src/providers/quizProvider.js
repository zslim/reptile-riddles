async function updateQuizName(quizName, quizId) {
  const httpRes = await fetch(`/api/quiz/${quizId}`, {
    method: "PATCH",
    body: JSON.stringify({
      "title": quizName,
      "isPublic": true // TODO: create public checkbox in quiz editor
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await httpRes.json();
}

async function fetchQuizById(quizId) {
  const httpRes = await fetch(`/api/quiz/${quizId}`);
  return await httpRes.json();
}

async function fetchAllQuizzes() {
  const httpRawRes = await fetch("/api/quiz/public");
  return await httpRawRes.json();
}

async function fetchMyQuizzes() {
  const httpRawRes = await fetch("/api/quiz/own");
  return await httpRawRes.json();
}

async function saveEmptyQuiz() {
  const httpRes = await fetch(`/api/quiz/create`, {
    method: "POST"
  });
  return await httpRes.json();
}

async function copyQuiz(quizId) {
  const httpRes = await fetch(`/api/quiz/copy/${quizId}`, {
    method: "POST"
  });
  return await httpRes.json();
}

async function deleteQuizById(quizId) {
  const httpRes = await fetch(`/api/quiz/${quizId}`, {
    method: "DELETE"
  });
  return await httpRes.json();
}

async function fetchModifiedAtById(quizId) {
  const httpRes = await fetch(`/api/quiz/modified/${quizId}`);
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
  fetchModifiedAtById
};
