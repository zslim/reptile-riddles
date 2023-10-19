async function fetchTask(quizId, taskIndex) {
  try {
    const httpRawRes = await fetch(`/task/quiz/${quizId}/${taskIndex}`);
    const res = await httpRawRes.json();
    return res;
  }
  catch (error) {
    console.error(error);
  }
}

async function validateAnswer(answerId) {
  try {
    const httpRawRes = await fetch(`/task/answer/${answerId}`);
    const res = await httpRawRes.json();
    return res;
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = {fetchTask, validateAnswer};
