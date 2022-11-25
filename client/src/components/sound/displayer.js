import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSounds, xPosHandler } from '../../store';
import { Sound } from './Sound';
import { DisplayOutput, OutputCanvas } from '.';

function Displayer() {
    const { playedSounds } = useSelector(selectSounds());
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            if (playedSounds.length > 0 && playedSounds) {
                dispatch(xPosHandler());
            }
        }, 10);
        return () => clearInterval(interval);
    }, [playedSounds]);
    const RenderSounds = () => {
        if (!playedSounds || playedSounds.length === 0) return;
        const sounds = playedSounds.map((i) => {
            return (
                <>
                    <DisplayOutput
                        key={`${i.height + i.xPosition}${i.output}`}
                        xPos={i.xPosition}
                        height={i.height}
                    />
                </>
            );
        });
        return sounds;
    };
    return <OutputCanvas className="w-full h-132" sounds={playedSounds} />;
}

export { Displayer };
