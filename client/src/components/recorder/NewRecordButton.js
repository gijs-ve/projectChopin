import React from 'react';
import { cnButton } from '../classNames';
import { useDispatch } from 'react-redux';
import { confirmRecordName } from '../../store';

function NewRecordButton(p) {
    const { setNewRecord } = p;
    const dispatch = useDispatch();
    const enableRecording = () => {
        dispatch(confirmRecordName());
    };
    return (
        <button className={cnButton} onClick={() => setNewRecord(true)}>
            Enable recording
        </button>
    );
}

export { NewRecordButton };
