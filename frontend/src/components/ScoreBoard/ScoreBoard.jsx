import React from "react";

const ScoreBoard = ({scores, loading, handleTaskChange, taskCount}) => {
  const calculateScoreBarWidth = (score) => {
    const MAX_SCORE_PER_TASK = 1000;
    const width = Math.max(Math.round((score / (taskCount * MAX_SCORE_PER_TASK)) * 100), 0.2);
    return width + "%";
  };

  return (
    <>
      <div className="m-auto mt-10 w-5/6 h-3/6 bg-zinc-500 p-3 grid grid-cols-1">
        {scores?.map((player) => {
          return <div key={player.playerId} className="h-full w-full mt-4 grid grid-cols-12 gap-2">
            <div className="text-right w-full col-span-2 font-bold text-xl">{player.playerName}</div>
            <div style={{width: calculateScoreBarWidth(player.score)}} className={`h-7 col-span-8 bg-black`}></div>
            <div className=" w-full col-span-2 font-bold text-xl">{player.score}</div>
          </div>;
        })}
      </div>
      <button disabled={loading} onClick={() => handleTaskChange()}
              className={`absolute mt-4 font-bold text-white text-xl right-20 p-4 bg-pink-500 rounded-md 
              ${!loading ? "hover:bg-pink-600 hover:cursor-pointer" : null}`}>
        Next
      </button>
    </>
  );
};

export default ScoreBoard;
