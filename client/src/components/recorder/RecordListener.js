import { useSelector, useDispatch } from 'react-redux';
import { toggleListening, selectListenStatus } from '../../store';
import { cnButton } from '../classNames';
import { StopRecordButton, PlayRecordButton } from '.';
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
                    <RecordSelection />
                    <div onClick={() => dispatch(toggleListening())}>
                        {listenStatus ? (
                            <StopRecordButton
                                onClick={() => dispatch(toggleListening())}
                            />
                        ) : (
                            <PlayRecordButton />
                        )}
                    </div>

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
