async function fetchAllQuizzes() {
  const httpRawRes = await fetch("/quiz/all");
  return await httpRawRes.json();
}

module.exports = {fetchAllQuizzes};