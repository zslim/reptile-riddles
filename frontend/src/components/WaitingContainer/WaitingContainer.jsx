const WaitingContainer = ({
                           selectedAnswer,
                           color,
                           loading,
                         }) => {
  return (
    <>
      {(selectedAnswer !== null || true) ?
        <div className={`${color} mx-auto m-4 pointer-events-none border-4 w-6/12`}>
          <div className="p-6 text-white">{selectedAnswer?.text ?? "You should probably answer next time!"}</div>
        </div>
        : <div className={`bg-zinc-800 mx-auto m-4 pointer-events-none border-4 w-6/12`}>
          <div className="p-6 text-white">You should probably answer next time!</div>
        </div>
      }
    </>
  );
};

export default WaitingContainer;
