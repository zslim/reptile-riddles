async function validateAnswer(answerId) {
  const httpRawRes = await fetch(`/answer/validate/${answerId}`);
  return await httpRawRes.json();
}

module.exports = {
  validateAnswer,
};
