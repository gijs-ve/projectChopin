import { useSelector, useDispatch } from 'react-redux';
import { convertStringsToOutputTable } from '.';
import {
    selectRecordList,
    toggleListening,
    selectListenStatus,
    setActiveRecord,
} from '../../store';
import { cnButton } from '../classNames';
import { RecordListenHandler } from './RecordListenerHandler';
import { RecordSelection } from './RecordSelection';

function RecordListener() {
    const dispatch = useDispatch();
    const listenStatus = useSelector(selectListenStatus());

    return (
        <>
            <button
                className={cnButton}
                onClick={() => dispatch(toggleListening())}
            >
                {listenStatus ? 'Stop recording' : 'Play recording'}
            </button>

            <RecordSelection />
            <RecordListenHandler />
        </>
    );
}
export { RecordListener };
