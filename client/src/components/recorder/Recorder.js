import { useSelector } from 'react-redux';
import {
    StartRecordButton,
    StopRecordButton,
    PauseRecordButton,
    SaveRecordButton,
    ResumeRecordButton,
    RecordHandler,
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
const RenderButtons = () => {
    const recordStatus = useSelector(selectRecordStatus());
    const recordings = useSelector(selectRecordings());
    const { outputTable } = recordings;
    if ((!outputTable || outputTable.length === 0) && !recordStatus)
        return <StartRecordButton />;
    return <RecordButtons />;
};
function Recorder() {
    return (
        <>
            <RenderButtons />
        </>
    );
}

export { Recorder };
