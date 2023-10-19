async function fetchTaskByIndex(quizId, taskIndex) {
  const res = await fetch(`/task/quiz/${quizId}/${taskIndex}`);
  return await res.json();
}

async function fetchTasksByQuizId(quizId) {
  const res = await fetch(`/task/quiz/${quizId}`);
  return await res.json();
}

async function validateAnswer(answerId) {
  const httpRawRes = await fetch(`/task/answer/${answerId}`);
  return await httpRawRes.json();
}

module.exports = {fetchTask: fetchTaskByIndex, validateAnswer, fetchTasksByQuizId};
