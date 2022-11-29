import { cnRecorderButton } from '../classNames';
import { useDispatch } from 'react-redux';
import { addRecording } from '../../store';

function SaveRecordButton() {
    const dispatch = useDispatch();
    return (
        <button
            className={cnRecorderButton}
            onClick={() => dispatch(addRecording())}
        >
            Save Recording
        </button>
    );
}

export { SaveRecordButton };
