import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSoundList, selectListenStatus } from '../../store';

function RecordListenHandler(p) {
    const dispatch = useDispatch();
    const { status, sendSound, roomId } = p;
    const listenStatus = useSelector(selectListenStatus());
    useEffect(() => {
        const interval = setInterval(() => {
            if (listenStatus && status !== 'multiplayer') {
                console.log('test');
                dispatch(checkSoundList());
            }
            if (listenStatus && status === 'multiplayer') {
                dispatch(checkSoundList(sendSound, roomId));
            }
        }, 10);
        return () => clearInterval(interval);
    }, [listenStatus]);
    return;
}

export { RecordListenHandler };
