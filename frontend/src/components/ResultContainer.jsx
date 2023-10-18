import fetchTask from '../controllers/taskProvider';
import { useNavigate } from 'react-router-dom';

const ResultContainer = ({selectedAnswer, isCorrect, setTask, setIsAnswered, color}) => {
    const navigate = useNavigate();
    async function handleTaskChange(){
        const newTask = await fetchTask(1, 0);
        setTask(() => newTask);
        setIsAnswered(false);
        navigate('/task');
    }

    return (
        <div>
            <div className={`bg-${color} mx-auto m-6 pointer-events-none border-4 w-6/12 ` + 
                (isCorrect ? "border-green-400" : "border-red-400")}>
                <div className="p-6 text-white">{selectedAnswer}</div>
            </div>
            <button onClick={() => handleTaskChange()} 
                className="absolute right-20 p-4 bg-zinc-400 hover:bg-zinc-500 hover:cursor-pointer" >Next</button>
        </div>
    )
}

export default ResultContainer;
