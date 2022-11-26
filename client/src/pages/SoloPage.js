import {
    Displayer,
    Recorder,
    SoundPlayer,
    RecordListener,
} from '../components';

function SoloPage() {
    return (
        <div>
            <SoundPlayer status={'active'} />

            <Displayer />
            <div className="flex flex-wrap">
                <Recorder />
                <RecordListener />
            </div>
        </div>
    );
}
export { SoloPage };
