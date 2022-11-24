import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSoundList, selectListenStatus } from '../../store';

function RecordListenHandler() {
    const dispatch = useDispatch();
    const listenStatus = useSelector(selectListenStatus());
    useEffect(() => {
        const interval = setInterval(() => {
            if (listenStatus) {
                dispatch(checkSoundList());
            }
        }, 10);
        return () => clearInterval(interval);
    }, [listenStatus]);
    return;
}

export { RecordListenHandler };
