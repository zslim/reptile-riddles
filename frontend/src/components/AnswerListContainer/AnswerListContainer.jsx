import AnswerButton from "../AnswerButton/AnswerButton";
import { validateAnswer } from "../../controllers/answerProvider";

const AnswerListContainer = ({setSelectedAnswer, setIsAnswered, setIsCorrect, setColor, task, resetTimer, loading, setLoading}) => {
  const BUTTON_COLORS = ['purple', 'pink', 'green', 'blue'];

  async function handleAnswerSubmit(answer) {
    try {
      setLoading(() => true);
      const isCorrectAnswer = await validateAnswer(answer.answerId);
      setSelectedAnswer(answer);
      setIsCorrect(isCorrectAnswer);
      setIsAnswered(true);
      resetTimer();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="absolute bottom-14 grid gap-1 p-1 grid-cols-2 w-screen object-center text-lg">
      {task.answers.map((answer, i) =>
        <div key={answer.answerId}>
          <AnswerButton answer={answer}
                        color={BUTTON_COLORS[i % BUTTON_COLORS.length]}
                        setColor={setColor}
                        handleSubmit={handleAnswerSubmit}
                        loading={loading}
          />
        </div>
  )}
    </div>
  );
};

export default AnswerListContainer;
