import { useEffect, useState } from "react";
import { useInterval } from "@toss/react";

const useCountdown = (intialTime: number, onTimeout: () => void) => {
    const [time, setTime] = useState(intialTime);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (time > 0) setTime((prev) => prev - 1);
        }, 1000);

        if (time === 0) onTimeout();

        return () => clearInterval(countdown);
    }, [time]);

    const diminishTime = (time: number) => {
        setTime((prev) => prev - time);
    };

    return { time, diminishTime };
};

export default useCountdown;
