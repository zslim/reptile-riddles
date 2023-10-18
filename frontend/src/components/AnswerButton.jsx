const AnswerButton = ({color, answer, handleSubmit, setColor}) => {
    const backgroundColor = "bg-kahoot-" + color;
    const hoverColor = "hover:bg-hover-" + color;
    
    function handleSelection(e){
        handleSubmit(e);
        setColor("bg-kahoot-" + color);
    }
    
    return(
        <div id={answer.answerId}
            onClick={(e) => handleSelection(e)} 
            className={`h-20 w-full ${backgroundColor} place-self-center ` + 
            (true ? `hover:cursor-pointer ${hoverColor}` : "opacity-20")}>
        <p className="m-6 text-white">{answer.text}</p>
    </div>
    )
}

export default AnswerButton;