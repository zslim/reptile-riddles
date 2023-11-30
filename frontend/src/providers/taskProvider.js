const {fetchFromBackEnd} = require("./providerBase");

// async function fetchTaskByIndex(quizId, taskIndex) {
//   const res = await fetch(`/task/quiz/${quizId}/${taskIndex}`);
//   return await res.json();
// }

// async function fetchTasksByQuizId(quizId) {
//   const res = await fetch(`/task/quiz/${quizId}`);
//   return await res.json();
// }

// async function fetchTaskById(taskId) {
//   const res = await fetch(`/task/${taskId}`);
//   return await res.json();
// }

// async function fetchDetailedTasksByQuizId(quizId) {
//   const res = await fetch(`/task/quiz/detailed/${quizId}`);
//   return await res.json();
// }

async function fetchDetailedTaskById(taskId) {
  const url = `/task/${taskId}`;
  return await fetchFromBackEnd({url});
}

// async function saveTask(quizId, task) {
//   const res = await fetch(`/task/quiz/${quizId}`, {
//     method: "POST",
//     body: JSON.stringify(task),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
//   return await res.json();
// }

async function deleteTaskById(taskId) {
  const url = `/task/${taskId}`;
  const method = "DELETE";
  return await fetchFromBackEnd({url, method});
}

// async function updateTask(taskId, task) {
//   const res = await fetch(`/task/${taskId}`, {
//     method: "PATCH",
//     body: JSON.stringify(task),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
//   return await res.json();
// }

async function saveQuestion(quizId, task) {
  const url = `/task/question/${quizId}`;
  const method = "POST";
  const body = task;
  return await fetchFromBackEnd({url, method, body});
}

async function updateQuestion(taskId, task) {
  const url = `/task/question/${taskId}`;
  const method = "PATCH";
  const body = task;
  return await fetchFromBackEnd({url, method, body});
}

module.exports = {
  // fetchTask: fetchTaskByIndex,
  // fetchTasksByQuizId,
  // fetchDetailedTasksByQuizId,
  // fetchTaskById,
  // saveTask,
  deleteTaskById,
  // updateTask,
  fetchDetailedTaskById,
  saveQuestion,
  updateQuestion
};
