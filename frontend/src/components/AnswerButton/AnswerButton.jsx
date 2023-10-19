const AnswerButton = ({color, answer, handleSubmit, setColor}) => {
  const backgroundColor = "bg-neon-" + color;
  const hoverColor = "hover:bg-neon2-" + color;

  function handleSelection(e) {
    handleSubmit(e);
    setColor("bg-neon-" + color);
  }

  return (
    <div id={answer.answerId}
         onClick={(e) => handleSelection(e)}
         className={`h-20 w-full ${backgroundColor} place-self-center ` +
           (true ? `hover:cursor-pointer ${hoverColor}` : "opacity-20")}>
      <p className="m-6 text-white">{answer.text}</p>
    </div>
  );
};

export default AnswerButton;
