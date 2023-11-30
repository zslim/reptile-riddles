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
  return await fetchFromBackEnd({url: `/task/${taskId}`});
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
  return await fetchFromBackEnd({url: `/task/${taskId}`, method: "DELETE"});
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
  return await fetchFromBackEnd({url: `/task/question/${quizId}`, method: "POST", body: task});
}

async function updateQuestion(taskId, task) {
  return await fetchFromBackEnd({url: `/task/question/${taskId}`, method: "PATCH", body: task});
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
