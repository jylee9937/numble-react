import { useState } from "react";
import { useTimeout } from "@toss/react";
import useCountdown from "./hooks/useCountdown";

const plusScore = (stage: number, time: number, score: number) => {
  return Math.pow(stage, 3) * time + score;
};

const Square = () => <div className='bg-red-500 w-[100px] h-[100px]' />;

function App() {
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(0);

  const onTimeout = () => {
    alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
  };
  const { time, diminishTime } = useCountdown(15, onTimeout);

  const squareCount = Math.pow(Math.round((stage + 0.5) / 2) + 1, 2);

  const onSuccess = () => {
    setScore((prev) => plusScore(stage, time, prev));
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
      <div className='flex gap-[2px]'>
        {Array(squareCount)
          .fill(0)
          .map((_, i) => (
            <Square key={i} />
          ))}
      </div>
      <button onClick={onTimeout}>버튼</button>
      <button onClick={onFail}>실패</button>
    </div>
  );
}

export default App;
