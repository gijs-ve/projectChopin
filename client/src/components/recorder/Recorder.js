import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    StartRecordButton,
    StopRecordButton,
    PauseRecordButton,
    SaveRecordButton,
    ResumeRecordButton,
    NewRecordButton,
    RecordHandler,
    RecordNameInput,
} from '.';
import { selectRecordStatus, selectRecordings } from '../../store';

const PauseOrResume = () => {
    const recordStatus = useSelector(selectRecordStatus());
    if (!recordStatus) return <ResumeRecordButton />;
    return <PauseRecordButton />;
};
const RecordButtons = (p) => {
    const { recordStatus } = p;
    if (recordStatus) {
        return (
            <>
                <PauseOrResume />
                <SaveRecordButton phantom={true} />
                <StopRecordButton />
                <RecordHandler />
            </>
        );
    }
    return (
        <>
            <PauseOrResume />
            <SaveRecordButton />
            <StopRecordButton />
        </>
    );
};
function Recorder() {
    const recordStatus = useSelector(selectRecordStatus());
    const recordings = useSelector(selectRecordings());
    const { outputTable } = recordings;
    if ((!outputTable || outputTable.length === 0) && !recordStatus)
        return (
            <>
                <StartRecordButton />
                <StopRecordButton phantom={true} />
                {/* <PhantomInputRecordButton /> */}
            </>
        );
    return (
        <>
            <RecordButtons recordStatus={recordStatus} />
            <RecordNameInput />{' '}
        </>
    );
}

export { Recorder };
