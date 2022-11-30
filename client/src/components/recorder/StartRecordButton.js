import { cnRecorderButton, cnRecorderButtonPhantom } from '../classNames';
import { useDispatch } from 'react-redux';
import { startRecording } from '../../store';

function StartRecordButton(p) {
    const { phantom } = p;
    const dispatch = useDispatch();
    return (
        <>
            <button
                className={phantom ? cnRecorderButtonPhantom : cnRecorderButton}
                onClick={() => dispatch(startRecording())}
            >
                <div className="h-4 w-4 bg-red-900 rounded-full mr-4 pr-4"></div>
                Rec
            </button>
        </>
    );
}

export { StartRecordButton };
