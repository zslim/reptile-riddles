import React, { useEffect, useState } from 'react';
import { fetchAllQuizzes } from "../../controllers/quizProvider";
import QuizListContainer from "../../components/QuizListContainer";
import QuizFilterContainer from "../../components/QuizFilterContainer";

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
    <div className="w-full h-full flex flex-row">
      <QuizListContainer quizList={quizList} loading={loading}/>
      <QuizFilterContainer/>
    </div>
  );
}

export default QuizListPage;