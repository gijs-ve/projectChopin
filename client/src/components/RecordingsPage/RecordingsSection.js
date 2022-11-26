import React from 'react';
import { whiteLabel } from '../classNames';
import { RecordList } from './';

function RecordingsSection(p) {
    const { label, recordings, displayStatus, setDisplayStatus } = p.data;
    const handleOnClick = () => {
        const newStatus = displayStatus.map((i) => {
            if (i.label === label) return { ...i, status: !i.status };
        });
        setDisplayStatus(newStatus);
    };
    const self = displayStatus.find((i) => {
        if (i.label === label) return true;
    });
    const { status } = self;

    const displayRecords = () => {};

    return (
        <>
            <div className={whiteLabel}>
                <h1>{label} </h1>
                <h2 className="pl-2" onClick={() => handleOnClick()}>
                    {!status ? '(show)' : '(hide)'}
                </h2>
            </div>
            {!status ? displayRecords() : ''}
        </>
    );
}

export { RecordingsSection };
