import React from 'react';
import { whiteLabel } from '../../components/classNames';

function UserSection(p) {
    const { name } = p;
    return (
        <div className="hover:bg-gray-700 rounded-xl px-2 py-2">
            <h1 className={whiteLabel}>{name}</h1>
        </div>
    );
}

export { UserSection };
