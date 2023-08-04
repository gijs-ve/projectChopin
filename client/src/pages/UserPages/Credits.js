import React from 'react';
import { cnCreditsText, whiteLabel } from '../../components/classNames';

function Credits() {
    return (
        <div className="flex flex-col flex-wrap border-4 rounded-xl border-gray-300 content-center text-center border-2 bg-gray-400 mx-[20%] px-[12%] py-[3%]">
            <h1 className={cnCreditsText}>BeatHoven v0.2</h1>
            <h1 className={whiteLabel + ' self-end'}>
                by Gijsbert van Everdingen
            </h1>
        </div>
    );
}

export { Credits };
