import { useState, useEffect } from 'react';
import { cnButton } from '../classNames';
import { useDispatch, useSelector } from 'react-redux';
import { confirmRecordName, selectProfileName, selectName } from '../../store';

function RecordNameInput(p) {
    const { phantom } = p;
    const name = useSelector(selectProfileName);
    const recordName = useSelector(selectName);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!phantom) {
            dispatch(confirmRecordName(`${name}'s recording`));
            return;
        }
        dispatch(confirmRecordName(``));
    }, []);
    return (
        <>
            <input
                type="text"
                className={
                    phantom
                        ? 'ml-4 h-1/2 self-center bg-gray-400'
                        : 'ml-4 h-1/2 self-center'
                }
                value={recordName}
                onChange={(e) =>
                    phantom ? null : dispatch(confirmRecordName(e.target.value))
                }
            />
            {/* <button
                className={cnButton}
                onClick={() => dispatch(confirmRecordName(recordName))}
            >
                Set name
            </button> */}
        </>
    );
}
export { RecordNameInput };
