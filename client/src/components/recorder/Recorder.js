import { useDispatch, useSelector } from 'react-redux';
import { cnButton } from '../classNames';

function Recorder() {
    const dispatch = useDispatch();
    return <button className={cnButton}>Start record</button>;
}

export { Recorder };
