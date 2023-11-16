import React, { useEffect, useState } from 'react';
import QuizListContainer from "../../components/QuizListContainer";
import QuizFilterContainer from "../../components/QuizFilterContainer";
import Loading from "../../components/Loading";

const QuizListPage = ({fetchQuizzes, editable}) => {
  const [loading, setLoading] = useState(true);
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    async function getQuizzes() {
      try {
        setLoading(true);
        const quizzes = await fetchQuizzes();
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
    <>
      {loading ? <Loading/>
        : <div className="w-full h-full flex flex-row text-white">
          <QuizListContainer quizList={quizList} loading={loading} setQuizList={setQuizList} editable={editable}/>
          <QuizFilterContainer/>
        </div>
      }
    </>
  );
};

export default QuizListPage;
