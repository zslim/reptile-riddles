import AnswerButton from "../AnswerButton/AnswerButton";

const AnswerListContainer = ({handleSubmit, handleColorChange, task, loading}) => {
  const BUTTON_COLORS = ['purple', 'pink', 'green', 'blue'];

  return (
    <div className="absolute bottom-14 grid gap-1 p-1 grid-cols-2 w-screen object-center text-lg">
      {task.answers.map((answer, i) =>
        <div key={answer.answerId}>
          <AnswerButton answer={answer}
                        color={BUTTON_COLORS[i % BUTTON_COLORS.length]}
                        handleColorChange={handleColorChange}
                        handleSubmit={handleSubmit}
                        loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default AnswerListContainer;
