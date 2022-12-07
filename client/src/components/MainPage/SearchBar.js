import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user';
import { whiteLabel, cnBeatHoven } from '../classNames';

function SearchBar() {
    const user = useSelector(selectUser);
    if (!user) return;
    return (
        <>
            <div className="relative w-full bg-gray-700 text-black-400 focus-within:text-black-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <h1 className={cnBeatHoven}>BeatHoven</h1>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <h1 className={whiteLabel}>{user.name}</h1>
                </div>
            </div>
        </>
    );
}

export { SearchBar };
