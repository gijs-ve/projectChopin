import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user';

function SearchBar() {
    const user = useSelector(selectUser);
    console.log(user);
    if (!user) return;
    return (
        <>
            <div className="relative w-full text-black-400 focus-within:text-black-600">
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <h1>{user.name}</h1>
                </div>
            </div>
        </>
    );
}

export { SearchBar };
