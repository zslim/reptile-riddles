const AnswerListContainer = () => {

    return(
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
                (true ? "hover:bg-hover-green hover:cursor-pointer"  : "opacity-20")}>
                <div className="m-6 text-white">Answer 4</div>
            </div>
        </div>
    )
}

export default AnswerListContainer;
