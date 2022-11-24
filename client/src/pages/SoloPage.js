import {
    Displayer,
    Recorder,
    SoundPlayer,
    RecordListener,
} from '../components';

function SoloPage() {
    return (
        <div>
            <Recorder />
            <Displayer />
            <RecordListener />
            <SoundPlayer />
        </div>
    );
}
export { SoloPage };
