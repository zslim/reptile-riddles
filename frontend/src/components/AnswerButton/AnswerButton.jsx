const AnswerButton = ({color, answer, handleSubmit, handleColorChange, loading}) => {
  function handleSelection() {
    handleSubmit(answer);
    handleColorChange("bg-neon-" + color);
  }

  return (
    <button id={answer.answerId}
            disabled={loading}
            onClick={() => handleSelection()}
            className={`h-20 w-full bg-neon-${color} place-self-center ${!loading ?? `hover:cursor-pointer hover:bg-neon2-${color}`}`}>
      <p className="m-6 text-white">{answer.text}</p>
    </button>
  );
};

export default AnswerButton;
