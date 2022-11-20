import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

function SearchBar() {
    return (
        <>
            <label htmlFor="search-field" className="sr-only">
                Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                    />
                </div>
                <input
                    id="search-field"
                    className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                />
            </div>
        </>
    );
}

export { SearchBar };
