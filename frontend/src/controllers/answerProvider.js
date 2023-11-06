async function validateAnswer(answerId) {
  const httpRawRes = await fetch(`/answer/validate/${answerId}`);
  return await httpRawRes.json();
}

async function saveAnswer(taskId, answer) {
  return await fetch(`/answer/task/${taskId}`, {
    method: "POST",
    body: JSON.stringify(answer),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

async function saveAnswerList(taskId, answerList) {
  const promises = answerList.map(async (answer) => {
    return (await saveAnswer(taskId, answer))
  });
  const resAll = await Promise.all(promises);
  return resAll.map((res) => res.json());
}

async function deleteAnswerById(answerId) {
  return await fetch(`/answer/${answerId}`, {
    method: "DELETE", headers: {
      "Content-Type": "application/json"
    }
  });
}

async function deleteAnswerList(answerList) {
  const promises = answerList.map(async (answer) => {
    return (await deleteAnswerById(answer.answerId))
  });
  const resAll = await Promise.all(promises);
  return resAll.map((res) => res.json());
}

async function updateAnswer(answer) {
  return await fetch(`/answer/update/${answer.answerId}`, {
    method: "PATCH",
    body: JSON.stringify(answer),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

async function magicalAnswerUpdate(answersToDelete, answersToUpdate, answersToSave, taskId) {
  const promises = [];
  answersToDelete.map(async (answer) => promises.push(await deleteAnswerById(answer.answerId)));
  answersToUpdate.map(async (answer) => promises.push(await updateAnswer(answer)));
  answersToSave.map(async (answer) => promises.push(await saveAnswer(taskId, answer)));

  const resAll = await Promise.all(promises);
  return resAll.map((res) => res.json());
}

module.exports = {
  validateAnswer,
  saveAnswerList,
  deleteAnswerList,
  magicalAnswerUpdate
};
