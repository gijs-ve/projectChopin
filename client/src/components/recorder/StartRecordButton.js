import { cnRecorderButton } from '../classNames';
import { useDispatch } from 'react-redux';
import { startRecording } from '../../store';
import { StopIcon } from '@heroicons/react/24/outline';

function StartRecordButton() {
    const dispatch = useDispatch();
    return (
        <>
            <button
                className={cnRecorderButton}
                onClick={() => dispatch(startRecording())}
            >
                Start record
            </button>
        </>
    );
}

export { StartRecordButton };
