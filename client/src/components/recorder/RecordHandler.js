import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { raiseInterval, selectRecordStatus } from '../../store';

function RecordHandler() {
    const dispatch = useDispatch();
    const recordStatus = useSelector(selectRecordStatus());
    useEffect(() => {
        const interval = setInterval(() => {
            if (recordStatus) {
                dispatch(raiseInterval());
            }
        }, 10);
        return () => clearInterval(interval);
    }, [recordStatus]);
    return;
}

export { RecordHandler };
