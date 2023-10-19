async function fetchTaskByIndex(quizId, taskIndex) {
  const res = await fetch(`/task/quiz/${quizId}/${taskIndex}`);
  return await res.json();
}

async function fetchTasksByQuizId(quizId) {
  const res = await fetch(`/task/quiz/${quizId}`);
  return await res.json();
}

async function fetchDetailedTasksByQuizId(quizId) {
  const res = await fetch(`/task/quiz/detailed/${quizId}`);
  return await res.json();
}

async function validateAnswer(answerId) {
  const httpRawRes = await fetch(`/task/answer/${answerId}`);
  return await httpRawRes.json();
}

async function updateAnswer(answer) {
  const res = await fetch("/task/answer", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(answer)
  });
  return await res.json();
}

module.exports = {
  fetchTask: fetchTaskByIndex,
  validateAnswer,
  fetchTasksByQuizId,
  fetchDetailedTasksByQuizId,
  updateAnswer
};
