import { HTMLAttributes, useState, useMemo } from "react";
import useCountdown from "./hooks/useCountdown";
import classNames from "classnames";
import { SquareBoard } from "./components/Square";
import randomColor from "randomcolor";

const plusScore = (stage: number, time: number, score: number) => {
  return Math.pow(stage, 3) * time + score;
};

function App() {
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(0);

  const resetGame = () => {
    resetCountdown();
    setStage(1);
    setScore(0);
  };

  const onTimeout = () => {
    alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
    resetGame();
  };

  const { time, diminishTime, resetCountdown } = useCountdown(15, onTimeout);

  const onSuccess = () => {
    setScore((prev) => plusScore(stage, time, prev));
    setStage((prev) => prev + 1);
    resetCountdown();
  };

  const onFail = () => {
    diminishTime(3);
  };

  return (
    <div>
      <div className='flex gap-[4px]'>
        <div>스테이지: {stage},</div>
        <div>남은시간: {time},</div>
        <div>점수: {score}</div>
      </div>
      {
        <SquareBoard
          onFailure={onFail}
          onSuccess={onSuccess}
          stage={stage}
        />
      }
    </div>
  );
}

export default App;
