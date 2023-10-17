const TaskPage = () => {
    return (
        <div className="bg-grey-100 h-screen text-white font-bold">
            <div className="absolute bottom-14 grid gap-1 p-1 grid-cols-2 w-screen object-center">
                <div className="h-20 w-full bg-kahoot-red place-self-center">
                    <div className="m-5 text-white">Answer 1</div>
                </div>
                <div className="h-20 w-full bg-kahoot-blue place-self-center">
                    <div className="m-5 text-white">Answer 2</div>
                </div>
                <div className="h-20 w-full bg-kahoot-yellow place-self-center">
                    <div className="m-5 text-white">Answer 3</div>
                </div>
                <div className="h-20 w-full bg-kahoot-green place-self-center">
                    <div className="m-5 text-white">Answer 4</div>
                </div>
            </div>
        </div>
    )
};

export default TaskPage;
