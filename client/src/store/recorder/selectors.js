export const selectRecordings = () => (state) => state.recorder;
export const selectListenStatus = () => (state) => state.recorder.listening;
export const selectActiveRecord = () => (state) => state.recorder.activeRecord;
export const selectRecordStatus = () => (state) => state.recorder.recording;
export const selectRecordList = () => (state) => state.recorder.recordings;
export const selectRecord = (state) => state.recorder.recordings;
export const selectOutputTable = (state) => state.recorder.outputTable;
export const selectName = (state) => state.recorder.name;
export const selectListenTime = (state) => state.recorder.listenTimer;
