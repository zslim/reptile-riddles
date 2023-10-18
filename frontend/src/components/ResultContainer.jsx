import { useNavigate } from 'react-router-dom';

const ResultContainer = ({isCorrect, setTask, setIsAnswered, style}) => {
    const navigate = useNavigate();
    function handleTaskChange(){
        setTask({});
        setIsAnswered(false);
        navigate('/task');
    }
    return (
        <div>
            <div className={style + " mx-auto m-6 w-6/12 pointer-events-none border-4 " + (isCorrect ? "border-green-400" : "border-red-400")}>
                <div className="p-6 text-white">Answer 1</div>
            </div>
            <button onClick={() => handleTaskChange()} className="p-4 bg-zinc-400 hover:bg-zinc-500 hover:cursor-pointer" >Next</button>
        </div>
    )
}

export default ResultContainer;
