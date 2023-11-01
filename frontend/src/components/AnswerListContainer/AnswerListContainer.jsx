import AnswerButton from "../AnswerButton/AnswerButton";
import { validateAnswer } from "../../controllers/answerProvider";

const AnswerListContainer = ({setSelectedAnswer, setIsAnswered, setIsCorrect, setColor, task}) => {
  const BUTTON_COLORS = ['purple', 'pink', 'green', 'blue'];

  async function handleAnswerSubmit(e) {
    let answer = e.currentTarget.firstChild.innerHTML;
    let answerId = e.currentTarget.id;
    try {
      const isCorrectAnswer = await validateAnswer(answerId);
      setSelectedAnswer(() => answer);
      setIsCorrect(() => isCorrectAnswer);
      setIsAnswered(true);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="absolute bottom-14 grid gap-1 p-1 grid-cols-2 w-screen object-center text-lg">
      {task.answers.map((answer, i) =>
        <AnswerButton answer={answer}
                      color={BUTTON_COLORS[i % BUTTON_COLORS.length]}
                      setColor={setColor}
                      handleSubmit={handleAnswerSubmit}
                      key={i}
        />)}
    </div>
  );
};

export default AnswerListContainer;
