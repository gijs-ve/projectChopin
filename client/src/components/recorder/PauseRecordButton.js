import { cnButton } from '../classNames';
import { useDispatch, useSelector } from 'react-redux';
import { pauseRecording, selectRecordStatus } from '../../store';
import { useState, useEffect } from 'react';

function PauseRecordButton() {
    const dispatch = useDispatch();
    const recordStatus = useSelector(selectRecordStatus());
    const handlePauseRecord = () => {
        dispatch(pauseRecording());
    };
    return (
        <button className={cnButton} onClick={() => handlePauseRecord()}>
            Pause recording
        </button>
    );
}

export { PauseRecordButton };

//<button className={cnButton} onClick={() => dispatch(pauseRecording())}>
