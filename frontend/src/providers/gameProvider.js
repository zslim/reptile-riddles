const {fetchFromBackEnd} = require("./providerBase");

async function createGameLobby(quizId) {
  return await fetchFromBackEnd({url: `/game/create/${quizId}`});
}

async function joinToGameLobby(gameId, playerName) {
  return await fetchFromBackEnd({url: `/game/join/${gameId}`, method: "POST", body: {playerName}});
}

async function getNextTask(gameId) {
  return fetchFromBackEnd({url: `/game/nextTask/${gameId}`});
}

async function handleAnswerSubmit(gameId, answer) {
  return await fetchFromBackEnd({url: `/game/submit/${gameId}?answer=${answer.answerId}`, method: "PATCH"});
}

async function getGameResult(gameId) {
  return fetchFromBackEnd({url: `/game/result/${gameId}`});
}

async function getGameList() {
  return fetchFromBackEnd({url: "/game/list"});
}

async function getQuizByGameId(gameId) {
  return fetchFromBackEnd({url: `/game/quiz/${gameId}`});
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
