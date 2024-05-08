import checkMark from "../../assets/images/checkmark.png";
import cross from "../../assets/images/cross.png";

const ResultContainer = ({
                           selectedAnswer,
                           isCorrect,
                           color,
                         }) => {
  return (
    <>
        {isCorrect ? <div className="text-3xl text-black flex justify-center mt-5">
            <img src={checkMark} alt="check-mark" className="relative bottom-3 w-16 h-16 p-3"></img>
            <div className="h-min text-white">Correct!</div>
          </div>
          : <div className="text-3xl text-black flex justify-center mt-5">
            <img src={cross} alt="cross" className="relative bottom-3 w-16 h-16 p-3"></img>
            <div className="h-min text-white">Wrong!</div>
          </div>}
        <div className={`${color} mx-auto m-4 pointer-events-none border-4 w-6/12 ` +
          (isCorrect ? "border-icon-green" : "border-icon-red")}>
          <div className="p-6 text-white">{selectedAnswer?.text}</div>
        </div>
    </>
  );
};

export default ResultContainer;
