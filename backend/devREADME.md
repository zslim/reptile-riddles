## Endpoints ##

### Quiz ###

Quiz: id, title, task count

- `GET /quiz/all`: Get all quizzes
- `GET /quiz/{quizId}`: Get a quiz by id
- `POST /quiz/{title}`: Create a new quiz
    - returns created id
- `PATCH /quiz/{quizId}`: Modify existing quiz
    - `body`: properties to change (only title so far)
- `DELETE /quiz/{quizId}`: Create a new quiz

### Task ###

Task: taskId, quiz_id, taskIndex, question, answers(list)

- `GET /task/quiz/{quizId}`: Get all tasks of a quiz
- `GET /task/quiz/{quizId}/{taskIndex}`: Get specific task of a quiz
- `POST /task/quiz/{quizId}`: Create new task for a quiz
    - `body`: question string, correct answer list, incorrect answer list, taskIndex
    - returns created task index (always creates at the end of the list)
- `GET /task/{taskId}`: Get a task by id
- `PUT /task/{taskId}`: Modify existing task of a quiz
    - `body`: question string, correct answer list, incorrect answer list, taskIndex
- `DELETE /task/{taskId}`: Delete a task
- `GET /task/{answerId}`: check if answer is correct (return true or false)

