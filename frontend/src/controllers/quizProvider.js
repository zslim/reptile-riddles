async function fetchAllQuizzes() {
  try {
    const httpRawRes = await fetch("/quiz/all");
    return await httpRawRes.json();
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = {fetchAllQuizzes};