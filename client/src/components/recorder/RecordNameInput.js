import { useState, useEffect } from 'react';
import { cnButton } from '../classNames';
import { useDispatch, useSelector } from 'react-redux';
import { confirmRecordName, selectProfileName } from '../../store';

function RecordNameInput() {
    const [recordName, setRecordName] = useState('');
    const name = useSelector(selectProfileName);
    const dispatch = useDispatch();
    useEffect(() => {
        setRecordName(`${name}'s recording`);
    }, []);
    return (
        <>
            <input
                type="text"
                className="ml-12"
                value={recordName}
                onChange={(e) => setRecordName(e.target.value)}
            />
            <button
                className={cnButton}
                onClick={() => dispatch(confirmRecordName(recordName))}
            >
                Set name
            </button>
        </>
    );
}
export { RecordNameInput };
