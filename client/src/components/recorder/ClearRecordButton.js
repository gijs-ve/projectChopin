import { stopRecording } from '../../store';
import { cnRecorderButton, cnRecorderButtonPhantom } from '../classNames';
import { useDispatch } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/outline';

function ClearRecordButton(p) {
    const { phantom } = p;
    const dispatch = useDispatch();
    return (
        <button
            className={phantom ? cnRecorderButtonPhantom : cnRecorderButton}
            onClick={() => (phantom ? null : dispatch(stopRecording()))}
        >
            <TrashIcon className="flex-shrink-0 h-6 w-6 mr-2 fill-gray-400" />{' '}
            Clear
        </button>
    );
}

export { ClearRecordButton };
