import { RecordingsSection, RecordListener } from '../components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRecordList, selectProfileName } from '../store';
function RecordingsPage() {
    const ownRecords = useSelector(selectRecordList());
    const selfName = useSelector(selectProfileName);
    const [displayStatus, setDisplayStatus] = useState([
        { label: 'My recordings', status: false },
        { label: 'Shared recordings', status: false },
    ]);

    console.log(displayStatus);
    return (
        <>
            <RecordListener status={'onRecordingsPage'} />
            <RecordingsSection
                data={{
                    recordings: ownRecords,
                    label: 'My recordings',
                    selfName,
                    displayStatus,
                    setDisplayStatus,
                }}
            />
            <RecordingsSection
                data={{
                    recordings: [],
                    label: 'Shared recordings',
                    selfName,
                    displayStatus,
                    setDisplayStatus,
                }}
            />
        </>
    );
}

export { RecordingsPage };
