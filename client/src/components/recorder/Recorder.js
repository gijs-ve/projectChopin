import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StartRecordButton, StopRecordButton } from '.';
import {
    selectRecordStatus,
    raiseInterval,
    selectRecordings,
} from '../../store';
import { convertOutputTableToStrings } from '../recorder/recorderFunctions';

function Recorder() {
    const dispatch = useDispatch();
    const recordStatus = useSelector(selectRecordStatus());
    const rec = useSelector(selectRecordings());
    convertOutputTableToStrings(rec.outputTable);
    useEffect(() => {
        const interval = setInterval(() => {
            if (recordStatus) {
                dispatch(raiseInterval());
            }
        }, 10);
        return () => clearInterval(interval);
    }, [recordStatus]);
    return <>{recordStatus ? <StopRecordButton /> : <StartRecordButton />}</>;
}

export { Recorder };
