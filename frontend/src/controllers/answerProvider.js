async function validateAnswer(answerId) {
  const httpRawRes = await fetch(`/answer/${answerId}`);
  return await httpRawRes.json();
}

async function updateAnswer(answer) {
  const res = await fetch("/answer", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(answer)
  });
  return await res.json();
}

module.exports = {
  validateAnswer,
  updateAnswer
};
