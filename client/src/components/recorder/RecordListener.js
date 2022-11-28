import { useSelector, useDispatch } from 'react-redux';
import {
    selectRecordList,
    toggleListening,
    selectListenStatus,
    setActiveRecord,
} from '../../store';
import { cnButton } from '../classNames';
import { RecordListenHandler } from './RecordListenerHandler';
import { RecordSelection } from './RecordSelection';

function RecordListener(p) {
    const dispatch = useDispatch();
    const listenStatus = useSelector(selectListenStatus());
    const { status, sendSound, roomId } = p;
    const displayRecordListener = () => {
        if (status === 'onInstrumentPage' || status === 'multiplayer') {
            return (
                <>
                    <button
                        className={cnButton}
                        onClick={() => dispatch(toggleListening())}
                    >
                        {listenStatus ? 'Stop recording' : 'Play recording'}
                    </button>

                    <RecordSelection />
                    <RecordListenHandler
                        sendSound={sendSound}
                        status={status}
                        roomId={roomId}
                    />
                </>
            );
        }
        if (status === 'onRecordingsPage') {
            return (
                <>
                    <RecordListenHandler status={status} />
                </>
            );
        }
    };
    return <>{displayRecordListener()}</>;
}
export { RecordListener };
