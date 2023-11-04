async function updateQuizName(quizName, quizId) {
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

async function fetchQuizById(quizId) {
  const httpRes = await fetch(`/quiz/${quizId}`);
  return await httpRes.json();
}

async function fetchAllQuizzes() {
  const httpRawRes = await fetch("/quiz/all");
  return await httpRawRes.json();
}

async function saveEmptyQuiz() {
  const httpRes = await fetch(`/quiz/create`, {
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

module.exports = {updateQuizName, fetchQuizById, fetchAllQuizzes, saveEmptyQuiz, deleteQuizById};
