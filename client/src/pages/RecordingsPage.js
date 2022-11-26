import { RecordingsSection, RecordListener } from '../components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectRecordList,
    selectProfileName,
    selectPublicRecords,
    selectSharedRecordings,
    getPublicRecords,
} from '../store';
function RecordingsPage() {
    const ownRecords = useSelector(selectRecordList());
    const publicRecords = useSelector(selectPublicRecords);
    const rawSharedRecords = useSelector(selectSharedRecordings);
    const sharedRecords = rawSharedRecords.map((i) => {
        return { ...i.recording };
    });
    const selfName = useSelector(selectProfileName);
    const [displayStatus, setDisplayStatus] = useState([
        { label: 'My recordings', status: false },
        { label: 'Shared recordings', status: false },
        { label: 'Public recordings', status: true },
    ]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPublicRecords());
    }, []);
    console.log(sharedRecords);
    console.log(ownRecords);
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
                    recordings: sharedRecords,
                    label: 'Shared recordings',
                    selfName,
                    displayStatus,
                    setDisplayStatus,
                }}
            />
            <RecordingsSection
                data={{
                    recordings: publicRecords,
                    label: 'Public recordings',
                    selfName,
                    displayStatus,
                    setDisplayStatus,
                }}
            />
        </>
    );
}

export { RecordingsPage };
