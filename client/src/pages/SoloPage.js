import {
    Displayer,
    Recorder,
    SoundPlayer,
    RecordListener,
} from '../components';

function SoloPage() {
    return (
        <div>
            <SoundPlayer />
            <div className="flex flex-wrap">
                <Recorder />
                <RecordListener />
            </div>
            <Displayer />
        </div>
    );
}
export { SoloPage };
