async function createGameLobby(quizId) {
  const httpRes = await fetch(`/api/game/create/${quizId}`);
  return await httpRes.json();
}

async function joinToGameLobby(gameId, playerName) {
  const httpRes = await fetch(`/api/game/join/${gameId}`, {
    method: "POST",
    body: JSON.stringify({playerName}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await httpRes.json();
}

async function getNextTask(gameId) {
  const httpRes = await fetch(`/api/game/nextTask/${gameId}`);
  return await httpRes.json();
}

async function handleAnswerSubmit(gameId, answer) {
  console.log(answer);
  const httpRawRes = await fetch(`/api/game/submit/${gameId}?answer=${answer.answerId}`, {
    method: "PATCH",
  });
  return await httpRawRes.json();
}

async function getGameResult(gameId) {
  const httpRes = await fetch(`/api/game/result/${gameId}`);
  return await httpRes.json();
}

async function getGameList() {
  const httpRes = await fetch(`/api/game/list`);
  return await httpRes.json();
}

async function getQuizByGameId(gameId) {
  const httpRes = await fetch(`/api/game/quiz/${gameId}`);
  return await httpRes.json();
}

module.exports = {
  createGameLobby,
  joinToGameLobby,
  getNextTask,
  handleAnswerSubmit,
  getGameResult,
  getGameList,
  getQuizByGameId
};
