import { cnButton } from '../classNames';
import { useDispatch } from 'react-redux';
import { startRecording } from '../../store';

function StartRecordButton(p) {
    const dispatch = useDispatch();
    const { outputTable } = p;
    const Button = () => {
        if (!outputTable || outputTable.length === 0) {
            return (
                <>
                    <button
                        className={cnButton}
                        onClick={() => dispatch(startRecording())}
                    >
                        Start record
                    </button>
                </>
            );
        }
        return (
            <>
                <button
                    className={cnButton}
                    onClick={() => dispatch(startRecording())}
                >
                    Resume record
                </button>
            </>
        );
    };
    return <Button />;
}

export { StartRecordButton };
