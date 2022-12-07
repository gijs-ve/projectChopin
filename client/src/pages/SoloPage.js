import {
    Displayer,
    Recorder,
    SoundPlayer,
    RecordListener,
} from '../components';

function SoloPage() {
    return (
        <div>
            <div className="py-4 border-4 border-b-0 border-stone-800 rounded-t-xl bg-stone-700 flex flex-wrap">
                <SoundPlayer status={'active'} />
                <RecordListener status={'onInstrumentPage'} />
            </div>
            <Displayer />
            <div className="py-4 border-4 border-t-0 border-stone-800 rounded-b-xl bg-stone-700 flex flex-wrap">
                <Recorder />
            </div>
        </div>
    );
}
export { SoloPage };
