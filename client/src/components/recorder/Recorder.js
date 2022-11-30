import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    StartRecordButton,
    ClearRecordButton,
    PauseRecordButton,
    SaveRecordButton,
    ResumeRecordButton,
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
                <ClearRecordButton phantom={true} />
                <PauseOrResume />
                <SaveRecordButton phantom={true} />
                <RecordHandler />
            </>
        );
    }
    return (
        <>
            <ClearRecordButton />
            <PauseOrResume />
            <SaveRecordButton />
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
                <ClearRecordButton phantom={true} />
                <StartRecordButton />
                <SaveRecordButton phantom={true} />
                <RecordNameInput phantom={true} />{' '}
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
