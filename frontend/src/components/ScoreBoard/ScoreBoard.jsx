import React from "react";

const ScoreBoard = ({scores, loading, handleTaskChange}) => {
  return (
    <>
      <div className="m-auto mt-20 w-3/6 h-2/6 bg-zinc-500 p-3 grid grid-cols-1">
        {scores?.map((player) => {
          return <div key={player.playerId} className="w-max h-max grid grid-cols-2">
            <div>{player.playerName}</div>
            <div>{player.score}</div>
          </div>
        })}
      </div>
      <button disabled={loading} onClick={() => handleTaskChange()}
              className={`absolute text-black right-20 p-4 bg-pink-500 rounded-md 
              ${!loading ? "hover:bg-pink-600 hover:cursor-pointer" : null}`}>
        Next
      </button>
    </>
  )
}

export default ScoreBoard;
