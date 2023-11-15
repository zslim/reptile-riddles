import checkMark from "../../assets/checkmark.png";
import cross from "../../assets/cross.png";

const ResultContainer = ({
                           handleTaskChange,
                           selectedAnswer,
                           isCorrect,
                           color,
                           isAnswered,
                           loading,
                           isDisplayingResult,
                           handleResultDisplay
                         }) => {
  return (
    <>
      {isCorrect ? <div className="text-3xl text-black flex justify-center mt-5">
          <img src={checkMark} alt="check-mark" className="relative bottom-3 w-16 h-16 p-3"></img>
          <div className="h-min text-white">Correct!</div>
        </div>
        : isAnswered ? <div className="text-3xl text-black flex justify-center mt-5">
            <img src={cross} alt="cross" className="relative bottom-3 w-16 h-16 p-3"></img>
            <div className="h-min text-white">Wrong!</div>
          </div>
          : <div className="text-3xl text-black flex justify-center mt-5">
            <img src={cross} alt="cross" className="left-3 relative bottom-3 w-16 h-16 p-3"></img>
            <div className="h-min text-white">{"Timed out!"}</div>
          </div>}
      {isAnswered ?
        <div className={`${color} mx-auto m-4 pointer-events-none border-4 w-6/12 ` +
          (isCorrect ? "border-icon-green" : "border-icon-red")}>
          <div className="p-6 text-white">{selectedAnswer.text}</div>
        </div>
        : null
      }
      {isDisplayingResult ?
        <button disabled={loading} onClick={() => handleTaskChange()}
                className={`absolute text-black right-20 p-4 bg-pink-500 rounded-md ${!loading ? "hover:bg-pink-600 hover:cursor-pointer" : null}`}>Next
        </button>
        : <button disabled={loading} onClick={() => handleResultDisplay()}
                  className={`absolute text-black right-20 p-4 bg-pink-500 rounded-md ${!loading ? "hover:bg-pink-600 hover:cursor-pointer" : null}`}>Result
        </button>
      }
    </>
  );
};

export default ResultContainer;
