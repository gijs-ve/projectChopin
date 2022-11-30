import { stopRecording } from '../../store';
import { cnRecorderButton, cnRecorderButtonPhantom } from '../classNames';
import { useDispatch } from 'react-redux';
import { StopIcon } from '@heroicons/react/24/outline';

function ClearRecordButton(p) {
    const { phantom } = p;
    const dispatch = useDispatch();
    return (
        <button
            className={phantom ? cnRecorderButtonPhantom : cnRecorderButton}
            onClick={() => (phantom ? null : dispatch(stopRecording()))}
        >
            <StopIcon className="flex-shrink-0 h-6 w-6 mr-4 fill-red-600" />{' '}
            Clear
        </button>
    );
}

export { ClearRecordButton };
