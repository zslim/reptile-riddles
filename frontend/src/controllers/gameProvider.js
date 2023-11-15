async function createGameLobby(quizId) {
  const httpRes = await fetch(`/game/create/${quizId}`);
  return await httpRes.json();
}

async function joinToGameLobby(gameId, playerName) {
  const httpRes = await fetch(`/game/join/${gameId}`, {
    method: "POST",
    body: JSON.stringify({playerName}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await httpRes.json();
}

async function getNextTask(gameId) {
  const httpRes = await fetch(`/game/nextTask/${gameId}`);
  return await httpRes.json();
}

async function handleAnswerSubmit(gameId, playerId, answer) {
  console.log(answer);
  const httpRawRes = await fetch(`/game/submit/${gameId}/${playerId}`, {
    method: "POST",
    body: JSON.stringify(answer),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await httpRawRes.json();
}

async function getGameResult(gameId) {
  const httpRes = await fetch(`/game/result/${gameId}`);
  return await httpRes.json();
}

module.exports = {
  createGameLobby,
  joinToGameLobby,
  getNextTask,
  handleAnswerSubmit,
  getGameResult
}
