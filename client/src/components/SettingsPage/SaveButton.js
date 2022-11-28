import React from 'react';
import { cnButton } from '../classNames';
import { useDispatch } from 'react-redux';

function SaveButton(p) {
    const { settings, handler } = p;
    const dispatch = useDispatch();
    return (
        <div className={cnButton} onClick={() => dispatch(handler(settings))}>
            Save
        </div>
    );
}

export { SaveButton };
