const TaskPage = () => {

    return (
        <div className="bg-zinc-100 h-screen text-white font-bold">
            <div className="text-3xl text-center text-black bg-white h-20 w-screen p-5 border-b-2 border-zinc-300">Question numero uno?</div>
            <div className="m-auto mt-20 w-3/6 h-3/6 bg-zinc-500 p-3 grid">Don't be fooled! This is an image!</div>
            <div className="absolute bottom-14 grid gap-1 p-1 grid-cols-2 w-screen object-center text-lg">
                <div className={"h-20 w-full bg-kahoot-red place-self-center " + 
                    (true ? "hover:bg-hover-red hover:cursor-pointer" : "opacity-20")}>
                    <div className="m-6 text-white">Answer 1</div>
                </div>
                <div className={"h-20 w-full bg-kahoot-blue place-self-center " + 
                    (true ? "hover:bg-hover-blue hover:cursor-pointer" : "opacity-20")}>
                    <div className="m-6 text-white">Answer 2</div>
                </div>
                <div className={"h-20 w-full bg-kahoot-yellow place-self-center " + 
                    (true ? "hover:bg-hover-yellow hover:cursor-pointer" : "opacity-20")}>
                    <div className="m-6 text-white">Answer 3</div>
                </div>
                <div className={"h-20 w-full bg-kahoot-green place-self-center " + 
                    (true ? "hover:bg-hover-green hover:cursor-pointer" : "opacity-20")}>
                    <div className="m-6 text-white">Answer 4</div>
                </div>
            </div>
        </div>
    )
};

export default TaskPage;
