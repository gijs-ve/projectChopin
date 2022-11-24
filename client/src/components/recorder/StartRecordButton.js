import { cnButton } from '../classNames';
import { useDispatch } from 'react-redux';
import { startRecording } from '../../store';

function StartRecordButton() {
    const dispatch = useDispatch();
    return (
        <button className={cnButton} onClick={() => dispatch(startRecording())}>
            Start record
        </button>
    );
}

export { StartRecordButton };
