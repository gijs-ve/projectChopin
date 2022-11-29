import { stopRecording } from '../../store';
import { cnRecorderButton } from '../classNames';
import { useDispatch } from 'react-redux';
import { StopIcon } from '@heroicons/react/24/outline';

function StopRecordButton() {
    const dispatch = useDispatch();
    return (
        <button
            className={cnRecorderButton}
            onClick={() => dispatch(stopRecording())}
        >
            <StopIcon
                onClick={() => dispatch(stopRecording())}
                className="flex-shrink-0 h-6 w-6 fill-red-400"
            />{' '}
        </button>
    );
}

export { StopRecordButton };
