import randomColor from "randomcolor";
import React, { useMemo } from "react";
import { HTMLAttributes } from "react";

const getRandom = (max: number) => {
    return Math.round(Math.random() * (max - 1) + 1);
};

const Square = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
    return <div {...props} />;
};

type SquareBoardProps = {
    stage: number;
    onSuccess: () => void;
    onFailure: () => void;
};

const SquareBoard = ({ stage, onFailure, onSuccess }: SquareBoardProps) => {
    const squareCountByLine = Math.round((stage + 0.5) / 2) + 1;
    const totalSquareCount = Math.pow(Math.round((stage + 0.5) / 2) + 1, 2);

    const marginSize = 2;

    const squareSize =
        (360 - marginSize * 2 * squareCountByLine) / squareCountByLine;


    const { bg, diffBg, random } = useMemo(() => {
        const random = getRandom(totalSquareCount);

        const bg = randomColor();
        const diffBg = randomColor({
            seed: bg,
        });
        return {
            bg,
            diffBg,
            random,
        };
    }, [stage]);

    return (
        <div className='flex w-[360px] flex-wrap box-border'>
            {Array(totalSquareCount)
                .fill(0)
                .map((_, i) => {
                    const isDifferent = random === i + 1;
                    const onClickSquare = isDifferent ? onSuccess : onFailure;
                    return (
                        <Square
                            key={i}
                            onClick={onClickSquare}
                            style={{
                                width: `${squareSize}px`,
                                height: `${squareSize}px`,
                                margin: `${marginSize}px`,
                                background: `${isDifferent ? diffBg : bg}`,
                            }}
                        />
                    );
                })}
        </div>
    );
};

export { SquareBoard };
