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
  const promises = [];
  for (const answer of answerList) {
    promises.push(await saveAnswer(taskId, answer));
  }
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
  for (const answer of answersToDelete) {
    promises.push(await deleteAnswerById(answer.answerId));
  }
  for (const answer of answersToUpdate) {
    promises.push(await updateAnswer(answer));
  }
  for (const answer of answersToSave) {
    promises.push(await saveAnswer(taskId, answer));
  }
  const resAll = await Promise.all(promises);
  return resAll.map((res) => res.json());
}

module.exports = {
  validateAnswer,
  saveAnswerList,
  magicalAnswerUpdate
};
