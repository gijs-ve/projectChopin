import { cnButton } from '../classNames';
import { useDispatch } from 'react-redux';
import { startRecording } from '../../store';

function ResumeRecordButton() {
    const dispatch = useDispatch();
    return (
        <>
            <button
                className={cnButton}
                onClick={() => dispatch(startRecording())}
            >
                Resume recording
            </button>
        </>
    );
}

export { ResumeRecordButton };
