import { useEffect } from "react";

const TimeCounter = ({deadline, timeLeft, handleDisplayTimeChange, handleDeadline, isAnswered, loading}) => {

  useEffect(() => {
    const interval = 1000;
    let expected = new Date().getTime() + interval;
    let difference = 0;
    const cycle = setInterval(() => {
      difference = expected - new Date().getTime();
      const newTimeLeft = deadline - new Date().getTime();
      const toDisplay = Math.max(Math.floor(newTimeLeft / 1000), 0);
      if (toDisplay !== timeLeft) {
        handleDisplayTimeChange(toDisplay);
      }
      expected += interval;
      if ((newTimeLeft / 1000) < 0 || isAnswered) {
        clearInterval(cycle);
        handleDeadline();
      }
    }, interval + difference);

    return () => {
      if (cycle) {
        clearInterval(cycle);
      }
    };
  }, []);

  return (
    <>
      {!loading ?
        <div className="absolute right-10 top-5">
          {timeLeft}
        </div> : null}
    </>
  );
};

export default TimeCounter;
