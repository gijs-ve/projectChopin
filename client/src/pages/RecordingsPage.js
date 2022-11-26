import { RecordListener } from '../components';
import { whiteLabel } from '../components/classNames';
function RecordingsPage() {
    return (
        <>
            <h1 className={whiteLabel}>My recordings</h1>
            <h1 className={whiteLabel}>Shared recordings</h1>
            <h1 className={whiteLabel}>Public recordings</h1>
        </>
    );
}

export { RecordingsPage };
