import { RecordingsSection } from '../components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRecordList } from '../store';
function RecordingsPage() {
    const ownRecords = useSelector(selectRecordList());
    const [displayStatus, setDisplayStatus] = useState([
        { label: 'My recordings', status: false },
    ]);

    console.log(displayStatus);
    return (
        <>
            <RecordingsSection
                data={{
                    recordings: ownRecords,
                    label: 'My recordings',
                    displayStatus,
                    setDisplayStatus,
                }}
            />
        </>
    );
}

export { RecordingsPage };
