import { fetchMyQuizzes } from "../../providers/quizProvider";
import QuizListPage from "../QuizListPage";

const MyQuizListPage = () => {
  return (
    <>
      <QuizListPage fetchQuizzes={fetchMyQuizzes} editable={true}/>
    </>
  );
};

export default MyQuizListPage;
