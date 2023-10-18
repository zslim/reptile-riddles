import AnswerListContainer from "../components/AnswerListContainer";

const TaskPage = () => {

    return (
        <div className="bg-zinc-100 h-screen text-white font-bold">
            <div className="text-3xl text-center text-black bg-white h-20 w-screen p-5 border-b-2 border-zinc-300">Question numero uno?</div>
            <div className="m-auto mt-20 w-3/6 h-3/6 bg-zinc-500 p-3 grid">Don't be fooled! This is an image!</div>
            <AnswerListContainer />
        </div>
    )
};

export default TaskPage;
