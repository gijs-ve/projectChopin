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
                <RecordListener status={'onInstrumentPage'} />
            </div>
        </div>
    );
}
export { SoloPage };
