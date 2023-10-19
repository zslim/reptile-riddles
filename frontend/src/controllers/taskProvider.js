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

module.exports = {
  fetchTask: fetchTaskByIndex,
  fetchTasksByQuizId,
  fetchDetailedTasksByQuizId,
};
