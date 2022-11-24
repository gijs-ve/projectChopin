import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StartRecordButton, StopRecordButton, PauseRecordButton } from '.';
import {
    selectRecordStatus,
    raiseInterval,
    selectRecordings,
} from '../../store';
import { convertOutputTableToStrings } from '../recorder/recorderFunctions';

function Recorder() {
    const dispatch = useDispatch();
    const recordStatus = useSelector(selectRecordStatus());
    const recordings = useSelector(selectRecordings());
    const { outputTable } = recordings;
    console.log(recordings);
    useEffect(() => {
        const interval = setInterval(() => {
            if (recordStatus) {
                dispatch(raiseInterval());
            }
        }, 10);
        return () => clearInterval(interval);
    }, [recordStatus]);
    return (
        <>
            {recordStatus ? (
                <>
                    <StopRecordButton />
                    <PauseRecordButton />
                </>
            ) : (
                <StartRecordButton outputTable={outputTable} />
            )}
        </>
    );
}

export { Recorder };
