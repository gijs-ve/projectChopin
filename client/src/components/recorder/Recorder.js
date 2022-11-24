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
const RecordButtons = () => {
    return (
        <>
            <PauseOrResume />
            <StopRecordButton />
            <SaveRecordButton />

            <RecordHandler />
        </>
    );
};
const RenderRecordSection = () => {
    const recordStatus = useSelector(selectRecordStatus());
    const recordings = useSelector(selectRecordings());
    const { outputTable } = recordings;
    if ((!outputTable || outputTable.length === 0) && !recordStatus)
        return (
            <>
                <StartRecordButton />
                <RecordNameInput />
            </>
        );
    return <RecordButtons />;
};
function Recorder() {
    const [newRecord, setNewRecord] = useState(false);
    return (
        <>
            {newRecord ? (
                <RenderRecordSection />
            ) : (
                <NewRecordButton setNewRecord={setNewRecord} />
            )}
        </>
    );
}

export { Recorder };
