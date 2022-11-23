import React from 'react';
import { useSelector } from 'react-redux';
import { selectSounds } from '../../store';
import { Sound } from './Sound';

function Displayer() {
    const { playedSounds } = useSelector(selectSounds());
    console.log(playedSounds);
    const RenderSounds = () => {
        if (!playedSounds || playedSounds.length === 0) return;
        const sounds = playedSounds.map((i) => {
            console.log(i);
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
