import { fetchAllQuizzes } from "../../controllers/quizProvider";
import QuizListPage from "../QuizListPage";

const PublicQuizListPage = () => {
  return (
    <>
      <QuizListPage fetchQuizzes={fetchAllQuizzes}/>
    </>
  );
};

export default PublicQuizListPage;
