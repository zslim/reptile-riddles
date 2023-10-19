import AnswerButton from "./AnswerButton";

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

  async function validateAnswer(answerId) {
    try {
      const httpRawRes = await fetch(`/task/answer/${answerId}`);
      const res = await httpRawRes.json();
      return res;
    }
    catch (error) {
      console.error(error);
    }
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
