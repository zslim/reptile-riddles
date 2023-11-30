const {fetchFromBackEnd} = require("./providerBase");

// async function validateAnswer(answerId) {
//   const httpRawRes = await fetch(`/answer/validate/${answerId}`);
//   return await httpRawRes.json();
// }

async function saveAnswer(taskId, answer) {
  return await fetchFromBackEnd({url: `/answer/task/${taskId}`, method: "POST", body: answer});
}

async function saveAnswerList(taskId, answerList) {
  const promises = answerList.map(async (answer) => {
    return (await saveAnswer(taskId, answer));
  });
  return await Promise.all(promises);
  //const resAll = await Promise.all(promises);
  //return resAll.map((res) => res.json());
}

async function deleteAnswerById(answerId) {
  return await fetchFromBackEnd({url: `/answer/${answerId}`, method: "DELETE"});
}

async function deleteAnswerList(answerList) {
  const promises = answerList.map(async (answer) => {
    return (await deleteAnswerById(answer.answerId));
  });
  return await Promise.all(promises);
  //const resAll = await Promise.all(promises);
  //return resAll.map((res) => res.json());
}

async function updateAnswer(answer) {
  return await fetchFromBackEnd({url: `/answer/update/${answer.answerId}`, method: "PATCH", body: answer});
}

async function magicalAnswerUpdate(answersToDelete, answersToUpdate, answersToSave, taskId) {
  const promises = [
    ...answersToDelete.map(async (answer) => await deleteAnswerById(answer.answerId)),
    ...answersToUpdate.map(async (answer) => await updateAnswer(answer)),
    ...answersToSave.map(async (answer) => await saveAnswer(taskId, answer))
  ];
  return await Promise.all(promises);
  //
  //answersToDelete.map(async (answer) => promises.push(await deleteAnswerById(answer.answerId)));
  //answersToUpdate.map(async (answer) => promises.push(await updateAnswer(answer)));
  //answersToSave.map(async (answer) => promises.push(await saveAnswer(taskId, answer)));
  //
  //const resAll = await Promise.all(promises);
  //return resAll.map((res) => res.json());
}

module.exports = {
  // validateAnswer,
  saveAnswerList,
  deleteAnswerList,
  magicalAnswerUpdate
};
