async function fetchTask(quizId, taskIndex) {
  try {
    const httpRawRes = await fetch(`/task/quiz/${quizId}/${taskIndex}`);
    return await httpRawRes.json();
  }
  catch (error) {
    console.error(error);
  }
}

async function validateAnswer(answerId) {
  try {
    const httpRawRes = await fetch(`/task/answer/${answerId}`);
    return await httpRawRes.json();
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = {fetchTask, validateAnswer};
