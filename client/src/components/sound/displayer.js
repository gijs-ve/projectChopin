import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSounds, xPosHandler } from '../../store';
import { Sound } from './Sound';

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
            return <Sound xPos={i.xPosition} />;
        });
        return sounds;
    };
    return (
        <div className="w-5/6 h-96 border-solid border-2 border-sky-500 ">
            <RenderSounds />
        </div>
    );
}

export { Displayer };
