const {fetchFromBackEnd} = require("./providerBase");

async function createGameLobby(quizId) {
  const url = `/game/create/${quizId}`;
  return await fetchFromBackEnd({url});
}

async function joinToGameLobby(gameId, playerName) {
  const url = `/game/join/${gameId}`;
  const method = "POST";
  const body = {playerName};
  return await fetchFromBackEnd({url, method, body});
}

async function getNextTask(gameId) {
  const url = `/game/nextTask/${gameId}`;
  return fetchFromBackEnd({url});
}

async function handleAnswerSubmit(gameId, answer) {
  const url = `/game/submit/${gameId}?answer=${answer.answerId}`;
  const method = "PATCH";
  return await fetchFromBackEnd({url, method});
}

async function getGameResult(gameId) {
  const url = `/game/result/${gameId}`;
  return fetchFromBackEnd({url});
}

module.exports = {
  createGameLobby,
  joinToGameLobby,
  getNextTask,
  handleAnswerSubmit,
  getGameResult
};
