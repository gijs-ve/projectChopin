export const selectRecordings = () => (state) => state.recorder;
export const selectRecordStatus = () => (state) => state.recorder.recording;
export const selectRecordList = () => (state) => state.recorder.recordings;
export const selectOutputTable = (state) => state.recorder.outputTable;
export const selectName = (state) => state.recorder.name;
