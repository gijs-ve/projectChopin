export const selectRecordings = () => (state) => state.recorder;
export const selectRecordStatus = () => (state) => state.recorder.recording;
export const selectOutputTable = (state) => state.recorder.outputTable;
export const selectName = (state) => state.recorder.name;
