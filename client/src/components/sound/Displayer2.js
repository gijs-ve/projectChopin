import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSounds, xPosHandler, clearDisplayer } from '../../store';
import { OutputCanvas } from '.';

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
    return (
        <OutputCanvas
            className="w-full border-stone-800 h-132 border-2 border-l-4 border-r-4"
            sounds={playedSounds}
        />
    );
}

export { Displayer };
