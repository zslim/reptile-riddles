const AnswerButton = ({color, answer, handleSubmit, setColor}) => {
    
    function handleSelection(e){
        handleSubmit(e);
        setColor("kahoot-" + color);
    }
    
    return(
        <div id={answer.answerId}
            onClick={(e) => handleSelection(e)} 
            className={`h-20 w-full bg-kahoot-${color} place-self-center ` + 
            (true ? `hover:bg-hove-${color} hover:cursor-pointer` : "opacity-20")}>
        <p className="m-6 text-white">{answer.text}</p>
    </div>
    )
}

export default AnswerButton;