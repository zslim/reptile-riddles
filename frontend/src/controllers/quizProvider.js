async function changeQuizName(quizName, quizId) {
  const httpRes = await fetch(`/quiz/${quizId}`, {
    method: "PATCH",
    body: JSON.stringify({
      "title": quizName
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await httpRes.json();
}

async function getQuizById(quizId) {
  const httpRes = await fetch(`/quiz/${quizId}`);
  return await httpRes.json();
}

async function fetchAllQuizzes() {
  const httpRawRes = await fetch("/quiz/all");
  return await httpRawRes.json();
}

async function saveEmptyQuiz() {
  const httpRes = await fetch(`/quiz/createempty`, {
    method: "POST"
  });
  return await httpRes.json();
}

module.exports = {changeQuizName, getQuizById, fetchAllQuizzes, saveEmptyQuiz};
