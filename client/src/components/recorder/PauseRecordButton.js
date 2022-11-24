import { cnButton } from '../classNames';
import { useDispatch } from 'react-redux';
import { pauseRecording } from '../../store';

function PauseRecordButton() {
    const dispatch = useDispatch();
    return (
        <button className={cnButton} onClick={() => dispatch(pauseRecording())}>
            Pause
        </button>
    );
}

export { PauseRecordButton };
