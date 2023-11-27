import React from 'react';
import QuizListElement from "../QuizListElement";
import { useNavigate } from "react-router-dom";
import { copyQuiz, deleteQuizById, saveEmptyQuiz } from "../../providers/quizProvider";
import Loading from "../Loading";

function QuizListContainer({quizList, loading, setQuizList, editable}) {
  const navigate = useNavigate();

  async function deleteQuiz(quizId) {
    if (window.confirm("Delete?")) {
      try {
        const res = await deleteQuizById(quizId);
        const newQuizList = quizList.filter((q) => q.id !== quizId);
        setQuizList(newQuizList);
      }
      catch (e) {
        console.error(e);
      }
    }
  }

  async function createQuiz() {
    try {
      const newQuizId = await saveEmptyQuiz();
      navigate(`/quizform/${newQuizId}`);
    }
    catch (e) {
      console.error(e);
    }
  }

  async function createCopyQuiz(quizId) {
    try {
      const newQuizId = await copyQuiz(quizId);
      navigate(`/quizform/${newQuizId}`);
    }
    catch (e) {
      console.error(e);
    }
  }

  return <div className="grow pt-16">
    {loading ? <Loading/>
      : (quizList.length === 0 ? <span>No quizzes found.</span> : quizList.map(quiz => <QuizListElement
        key={quiz.id} quiz={quiz} deleteQuiz={deleteQuiz} copyQuiz={createCopyQuiz} editable={editable}/>))
    }
    <button className="bg-green-400 hover:bg-green-500 p-1 m-1 w-32 rounded-full text-black"
            onClick={() => createQuiz()}>Add Quiz
    </button>
  </div>;
}

export default QuizListContainer;
