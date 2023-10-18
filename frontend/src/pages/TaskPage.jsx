import AnswerListContainer from "../components/AnswerListContainer";
import ResultContainer from "../components/ResultContainer";
import { useState } from 'react'; 

const TaskPage = () => {
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [task, setTask] = useState({});
    const [style, setStyle] = useState("h-20 bg-zinc-500");

    return (
        <div className="bg-zinc-100 h-screen text-white font-bold">
            <div className="text-3xl text-center text-black bg-white h-20 w-screen p-5 border-b-2 border-zinc-300">Question numero uno?</div>
            <div className="m-auto mt-20 w-3/6 h-3/6 bg-zinc-500 p-3 grid">Don't be fooled! This is an image!</div>
            {isAnswered 
                ? <ResultContainer isCorrect={isCorrect} setTask={setTask} setIsAnswered={setIsAnswered} style={style}/> 
                : <AnswerListContainer setIsAnswered={setIsAnswered} setIsCorrect={setIsCorrect} setStyle={setStyle} />}
        </div>
    )
};

export default TaskPage;
