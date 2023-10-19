async function fetchTask(quizId, taskIndex) {
  const httpRawRes = await fetch(`/task/quiz/${quizId}/${taskIndex}`);
  return await httpRawRes.json();
}

async function validateAnswer(answerId) {
  const httpRawRes = await fetch(`/task/answer/${answerId}`);
  return await httpRawRes.json();

}

module.exports = {fetchTask, validateAnswer};
