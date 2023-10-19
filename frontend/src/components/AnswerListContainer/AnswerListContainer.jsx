import AnswerButton from "../AnswerButton/AnswerButton";
import {validateAnswer} from "../../controllers/taskProvider";

const AnswerListContainer = ({setSelectedAnswer, setIsAnswered, setIsCorrect, setColor, task}) => {
  const BUTTON_COLORS = ['red', 'blue', 'yellow', 'green'];

  async function handleAnswerSubmit(e) {
    let answer = e.currentTarget.firstChild.innerHTML;
    let answerId = e.currentTarget.id;
    setSelectedAnswer(() => answer);

    const response = await validateAnswer(answerId);

    setIsCorrect(() => response);
    setIsAnswered(true);
  }

  return (
    <div className="absolute bottom-14 grid gap-1 p-1 grid-cols-2 w-screen object-center text-lg">
      {task.answers.map((answer, i) =>
        <AnswerButton answer={answer}
                      color={BUTTON_COLORS[i % BUTTON_COLORS.length]}
                      setColor={setColor}
                      handleSubmit={handleAnswerSubmit}
        />)}
    </div>
  )
}

export default AnswerListContainer;
