import { useState } from "react";

const plusScore = (stage: number, time: number, score: number) => {
  return Math.pow(stage, 3) * time + score;
};

function App() {
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  const onSuccess = () => {
    setScore((prev) => plusScore(stage, time, prev));
  };

  const onTimeout = () => {
    alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
  };

  return (
    <div>
      <div className='flex gap-[4px]'>
        <div>스테이지: 1,</div>
        <div>남은시간: 1,</div>
        <div>점수: 1</div>
      </div>
      <button onClick={onTimeout}>버튼</button>
    </div>
  );
}

export default App;
