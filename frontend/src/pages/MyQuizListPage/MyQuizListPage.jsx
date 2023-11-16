import { fetchMyQuizzes } from "../../controllers/quizProvider";
import QuizListPage from "../QuizListPage";

const MyQuizListPage = () => {
  return (
    <>
      <QuizListPage fetchQuizzes={fetchMyQuizzes}/>
    </>
  );
};

export default MyQuizListPage;
