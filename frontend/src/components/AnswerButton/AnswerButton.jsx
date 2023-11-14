const AnswerButton = ({color, answer, handleSubmit, setColor, loading}) => {
  function handleSelection() {
    handleSubmit(answer);
    setColor("bg-neon-" + color);
  }

  return (
    <button id={answer.answerId}
            disabled={loading}
            onClick={() => handleSelection()}
            className={`h-20 w-full bg-neon-${color} place-self-center ${!loading ? `hover:cursor-pointer hover:bg-neon2-${color}` : null}`}>
      <p className="m-6 text-white">{answer.text}</p>
    </button>
  );
};

export default AnswerButton;
