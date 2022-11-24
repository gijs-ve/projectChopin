import { cnButton } from '../classNames';
import { useDispatch } from 'react-redux';
import { startRecording } from '../../store';

function SaveRecordButton() {
    return <button className={cnButton}>Save Recording</button>;
}

export { SaveRecordButton };
