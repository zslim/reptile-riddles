import React, { useEffect, useState } from 'react';
import { fetchAllQuizzes } from "../controllers/quizProvider";

function QuizListPage() {
  const [loading, setLoading] = useState(true);
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    async function getQuizzes() {
      try {
        setLoading(true);
        const quizzes = await fetchAllQuizzes();
        setQuizList(quizzes);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }

    getQuizzes();
  }, []);

  return (
    <div>
      {loading ? <></> : quizList.map(quiz => <h1>{quiz.id + " " + quiz.title}</h1>)}
    </div>
  );
}

export default QuizListPage;