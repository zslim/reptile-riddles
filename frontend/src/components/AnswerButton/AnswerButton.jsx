const AnswerButton = ({color, answer, handleSubmit, setColor}) => {
  function handleSelection(e) {
    handleSubmit(e);
    setColor("bg-neon-" + color);
  }

  return (
    <div id={answer.answerId}
         onClick={(e) => handleSelection(e)}
         className={`h-20 w-full bg-neon-${color} place-self-center hover:cursor-pointer hover:bg-neon2-${color}`}>
      <p className="m-6 text-white">{answer.text}</p>
    </div>
  );
};

export default AnswerButton;
