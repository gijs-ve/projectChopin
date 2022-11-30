import { cnRecorderButton, cnRecorderButtonPhantom } from '../classNames';
import { PlayIcon } from '@heroicons/react/24/outline';

function PlayRecordButton(p) {
    const { phantom } = p;
    return (
        <button
            className={phantom ? cnRecorderButtonPhantom : cnRecorderButton}
        >
            <PlayIcon className="flex-shrink-0 h-6 w-6 mr-2 fill-green-600" />{' '}
            Play
        </button>
    );
}

export { PlayRecordButton };
