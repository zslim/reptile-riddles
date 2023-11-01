async function fetchTaskByIndex(quizId, taskIndex) {
  const res = await fetch(`/task/quiz/${quizId}/${taskIndex}`);
  return await res.json();
}

async function fetchTasksByQuizId(quizId) {
  const res = await fetch(`/task/quiz/${quizId}`);
  return await res.json();
}

async function fetchTaskById(taskId) {
  const res = await fetch(`/task/${taskId}`);
  return await res.json();
}

async function fetchDetailedTasksByQuizId(quizId) {
  const res = await fetch(`/task/quiz/detailed/${quizId}`);
  return await res.json();
}

async function saveEmptyTask(quizId) {
  const res = await fetch(`/task/quiz/${quizId}/empty`, {
    method: "POST", headers: {
      "Content-Type": "application/json"
    }
  });
  return await res.json();
}

async function saveTask(quizId, task) {
  const res = await fetch(`/task/quiz/${quizId}`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await res.json();
}

async function updateQuestion(question, taskId) {
  const httpRes = await fetch(`/task/${taskId}`, {
    method: "PATCH", body: JSON.stringify({
      "question": question
    }), headers: {
      "Content-Type": "application/json"
    }
  });
  return await httpRes.json();
}

async function deleteTaskById(taskId) {
  const res = await fetch(`/task/${taskId}`, {
    method: "DELETE", headers: {
      "Content-Type": "application/json"
    }
  });
  return await res.json();
}

module.exports = {
  fetchTask: fetchTaskByIndex,
  fetchTasksByQuizId,
  fetchDetailedTasksByQuizId,
  saveEmptyTask,
  fetchTaskById,
  updateQuestion,
  saveTask,
  deleteTaskById
};
