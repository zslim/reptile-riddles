import React from "react";

const GameLobby = ({quiz, navigateHome, handleGameStart, role, playerCount, sendJoinEvent, joined}) => {

  return (
    <div className="bg-[#1D2226] h-screen">
      <div className="mx-auto h-5/6 w-5/6 rounded-3xl bg-black top-10 relative">
        <div className="pt-20 pb-10 text-white text-center text-4xl">{quiz?.title}</div>
        <div className="grid grid-cols-2 mt-10">
          <div>
            <div className="p-4 text-white text-2xl text-center">{playerCount} players</div>
            <div className="p-2 text-white text-2xl text-center">{quiz?.taskCount} Questions</div>
          </div>
          {role === "player"
            ? <button
              className={`mx-auto pb-16 text-white font-bold text-3xl bg-pink-500 
              ${joined ? "" : "hover:bg-pink-600"} p-6 w-60 h-20  relative -bottom-4 rounded-md `}
              disabled={joined}
              onClick={() => sendJoinEvent()}>{joined ? "Good luck!" : "Join"}
            </button>
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
