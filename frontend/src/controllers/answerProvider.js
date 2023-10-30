async function validateAnswer(answerId) {
  const httpRawRes = await fetch(`/answer/validate/${answerId}`);
  return await httpRawRes.json();
}

async function updateAnswer(answer) {
  const res = await fetch("/answer/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(answer)
  });
  return await res.json();
}

async function saveEmptyAnswer(taskId) {
  const res = await fetch(`/answer/task/${taskId}/empty`, {
    method: "POST"
  });
  return await res.json();
}

async function fetchAnswer(answerId) {
  const res = await fetch(`/answer/${answerId}`);
  return await res.json();
}

module.exports = {
  validateAnswer,
  updateAnswer,
  saveEmptyAnswer,
  fetchAnswer
};
