import { stopRecording } from '../../store';
import { cnButton } from '../classNames';
import { useDispatch } from 'react-redux';

function StopRecordButton() {
    const dispatch = useDispatch();
    return (
        <button className={cnButton} onClick={() => dispatch(stopRecording())}>
            Stop recording
        </button>
    );
}

export { StopRecordButton };
