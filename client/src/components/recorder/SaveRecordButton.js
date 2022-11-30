import { cnRecorderButton, cnRecorderButtonPhantom } from '../classNames';
import { useDispatch } from 'react-redux';
import { addRecording } from '../../store';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

function SaveRecordButton(p) {
    const { phantom } = p;
    const dispatch = useDispatch();
    return (
        <button
            className={phantom ? cnRecorderButtonPhantom : cnRecorderButton}
            onClick={() => (phantom ? null : dispatch(addRecording()))}
        >
            <ArrowDownTrayIcon className="flex-shrink-0 h-6 w-6 mr-4 " /> Save
        </button>
    );
}

export { SaveRecordButton };
