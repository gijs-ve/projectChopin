import { cnRecorderButton } from '../classNames';
import { useDispatch } from 'react-redux';
import { pauseRecording } from '../../store';

function PauseRecordButton() {
    const dispatch = useDispatch();
    const handlePauseRecord = () => {
        dispatch(pauseRecording());
    };
    return (
        <button
            className={cnRecorderButton}
            onClick={() => handlePauseRecord()}
        >
            <div className="h-4 w-4 bg-red-500 rounded-full mr-4 pr-4"></div>Rec
        </button>
    );
}

export { PauseRecordButton };

//<button className={cnButton} onClick={() => dispatch(pauseRecording())}>
