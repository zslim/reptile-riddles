import { useUser } from "../../context/UserContextProvider";

const GameLobby = ({
                     quiz,
                     navigateHome,
                     handleNameChange,
                     playerName,
                     handleGameStart,
                     role,
                     playerCount,
                     sendJoinEvent,
                     joined
                   }) => {
  // const {user} = useUser();

  return (
    <div className="bg-[#1D2226] h-screen">
      <div className="mx-auto h-5/6 w-5/6 rounded-3xl bg-black top-10 relative">
        <div className="pt-10 pb-4 text-white text-center text-4xl">{quiz?.title}</div>
        <div className="grid grid-cols-2 mt-6">
          <div>
            <div className="p-4 text-white text-2xl text-center">{playerCount} players</div>
            <div className="p-2 text-white text-2xl text-center">{quiz?.taskCount} Questions</div>
          </div>
          {role === "player"
            ?
            <>
              {joined ? null :
                <div className="grid grid-cols-1">
                  <label className="my-4 text-2xl text-white">Player name:</label>
                  <input className="p-2 text-white text-2xl bg-zinc-900 border-b border-zinc-500 w-fit h-10"
                         value={playerName} type={"text"} id={"playerName"}
                         onChange={(e) => handleNameChange(e.target.value)}>
                  </input>
                </div>
              }
              <button
                className={`mx-auto pb-16 text-white font-bold text-3xl bg-pink-500 
              ${joined ? "" : "hover:bg-pink-600"} p-6 w-60 h-20  relative -bottom-4 rounded-md `}
                disabled={joined}
                onClick={() => sendJoinEvent(playerName)}>{joined ? "Good luck!" : "Join"}
              </button>
            </>
            : quiz.taskCount <= 0
              ? <button
                className="mx-auto pb-16 text-white font-bold text-3xl bg-pink-500 hover:bg-pink-600 p-6 w-40 h-20  relative -bottom-4 rounded-md"
                onClick={() => navigateHome()}>:(
              </button>
              : <button
                className="mx-auto pb-16 text-white font-bold text-3xl bg-pink-500 hover:bg-pink-600 p-6 w-40 h-20  relative -bottom-4 rounded-md"
                onClick={() => handleGameStart()}>Start
              </button>
          }
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
