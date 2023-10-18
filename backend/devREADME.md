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

Task: quiz_id, taskIndex, question, answers(list)

- `GET /task/{quizId}`: Get all tasks of a quiz
- `POST /task/{quizId}`: Create new task for a quiz
    - `body`: question string, correct answer list, incorrect answer list
    - returns created task index (always creates at the end of the list)
- `GET /task/{quizId}/{taskIndex}`: Get a task
- `PUT /task/{quizId}/{taskIndex}`: Modify existing task of a quiz
    - `body`: question string, correct answer list, incorrect answer list
- `DELETE /task/{quizId}/{taskIndex}`: Delete a task
- `GET /task/{quizId}/{taskIndex}/{answerId}`: check if answer is correct (return true or false)

