import React from 'react';
import { useSelector } from 'react-redux';
import { selectSounds } from '../../store';

function Displayer() {
    const { playedSounds } = useSelector(selectSounds());
    console.log(playedSounds);
    const RenderSounds = () => {
        if (!playedSounds || playedSounds.length === 0) return;
        const sounds = playedSounds.map((i) => {
            return (
                <div className="w-2 h-2 rounded-full border-solid border-2 border-sky-500 bg-sky-500"></div>
            );
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
