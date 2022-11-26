import React from 'react';
import { whiteLabel } from '../classNames';
import { RecordList, AddSharedRecord } from '.';

function RecordingsSection(p) {
    const { label, recordings, displayStatus, setDisplayStatus, selfName } =
        p.data;
    const handleOnClick = () => {
        const newStatus = displayStatus.map((i) => {
            if (i.label === label) return { ...i, status: !i.status };
            return i;
        });
        setDisplayStatus(newStatus);
    };
    const self = displayStatus.find((i) => {
        if (i.label === label) return true;
    });
    const { status } = self;
    const displayRecords = () => {
        if (!recordings || recordings.length === 0)
            return (
                <>
                    {shared ? <AddSharedRecord /> : ''}
                    <h1 className={whiteLabel}>
                        There are currently no {label.toLowerCase()} available
                    </h1>
                </>
            );

        return (
            <>
                {shared ? <AddSharedRecord /> : ''}
                <RecordList
                    label={label}
                    records={recordings}
                    selfName={selfName}
                />
            </>
        );
    };
    let shared = false;
    if (label === 'Shared recordings') shared = true;
    return (
        <>
            <div className={whiteLabel + ' pt-12'}>
                <h1>{label} </h1>
                <h2 className="pl-2" onClick={() => handleOnClick()}>
                    {status ? '(hide)' : '(show)'}
                </h2>
            </div>

            {status ? displayRecords() : ''}
        </>
    );
}

export { RecordingsSection };
