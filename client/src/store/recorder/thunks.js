import { convertOutputTableToStrings } from '../../components/recorder/recorderFunctions';
import {
    playRecorderSound,
    convertNameToHeight,
    convertNameToOutput,
} from '../../components/sound/soundFunctions';
import { selectOutputTable, selectName } from './selectors';
import { addSound } from '../displayer';
import { apiUrl } from '../../config/constants';
import axios from 'axios';
import {
    selectToken,
    refreshSelf,
    selectProfileName,
    confirmRecordName,
    raiseListenTimer,
    selectActiveRecording,
    selectListenTime,
    selectRecord,
    selectRecordingStatus,
    selectPublicRecords,
    selectSharedRecordings,
    addRecord,
    addSharedRecord,
    setPublicRecords,
    clearListening,
} from '../';
import { appLoading, appDoneLoading, setMessage } from '../appState/slice';
import { convertStringsToOutputTable } from '../../components/recorder';

export const getPublicRecords = () => {
    return async (dispatch) => {
        const response = await axios.get(
            `${apiUrl}/recordings/getPublishedRecords`,
        );
        dispatch(setPublicRecords(response.data.records));
    };
};

export const setRecordStartName = () => {
    return async (dispatch, getState) => {
        const name = selectProfileName(getState());
        dispatch(confirmRecordName(name));
    };
};
export const editRecordName = (id, name) => {
    return async (dispatch, getState) => {
        dispatch(appLoading());
        try {
            const token = selectToken(getState());
            if (token === null) return;
            await axios.patch(
                `${apiUrl}/recordings/editName`,
                { id, name },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            dispatch(refreshSelf());
            dispatch(getPublicRecords());
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: error.response.data.message,
                    }),
                );
            } else {
                console.log(error.message);
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: error.message,
                    }),
                );
            }
            dispatch(appDoneLoading());
        }
    };
};

export const checkSoundList = (sendSound, roomId) => {
    return async (dispatch, getState) => {
        dispatch(raiseListenTimer());
        const checkRecord = () => {
            const recordId = selectActiveRecording(getState());
            const recordList = selectRecord(getState());
            const publicRecordList = selectPublicRecords(getState());
            const rawSharedRecords = selectSharedRecordings(getState());
            const sharedRecordList = rawSharedRecords.map((i) => {
                return { ...i.recording };
            });
            let record = recordList.find((i) => {
                return recordId === i.id;
            });
            if (!record) {
                record = publicRecordList.find((i) => {
                    return recordId === i.id;
                });
            }
            if (!record) {
                record = sharedRecordList.find((i) => {
                    return recordId === i.id;
                });
            }
            const outputTable = convertStringsToOutputTable(
                record.recordstrings,
            );
            outputTable.sort((i, j) => {
                return i.time - j.time;
            });
            const listenTime = selectListenTime(getState());
            const foundSounds = outputTable.filter((i) => {
                return +i.time === listenTime;
            });

            if (outputTable[outputTable.length - 1].time < listenTime)
                return 'End';
            return foundSounds;
        };

        const record = checkRecord();
        if (record === 'End') {
            dispatch(clearListening());
            return;
        }
        const recordStatus = selectRecordingStatus(getState());
        console.log(record);
        if (!record || record.length === 0) return;
        record.map((i) => {
            playRecorderSound(i.output);
            if (!sendSound) {
                dispatch(
                    addSound({
                        output: convertNameToOutput(i.output),
                        origin: 'self',
                        height: convertNameToHeight(i.output),
                    }),
                );
            }
            if (sendSound) {
                sendSound(convertNameToOutput(i.output), roomId);
            }
            if (!recordStatus) return;
            dispatch(
                addRecord({
                    soundName: i.output,
                }),
            );
        });
    };
};

export const addRecording = () => {
    return async (dispatch, getState) => {
        const outputTable = selectOutputTable(getState());
        const name = selectName(getState());
        const strings = convertOutputTableToStrings(outputTable);
        dispatch(appLoading());
        const token = selectToken(getState());
        if (token === null) return;
        try {
            await axios.post(
                `${apiUrl}/recordings/saveRecording`,
                {
                    name,
                    strings,
                },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            dispatch(refreshSelf());
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: error.response.data.message,
                    }),
                );
            } else {
                console.log(error.message);
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: error.message,
                    }),
                );
            }
            dispatch(appDoneLoading());
        }
    };
};

export const addSharedKey = (key) => {
    return async (dispatch, getState) => {
        dispatch(appLoading());
        const token = selectToken(getState());
        if (token === null) return;
        try {
            const response = await axios.post(
                `${apiUrl}/recordings/addSharedKey`,
                {
                    key,
                },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            dispatch(refreshSelf());
            dispatch(addSharedRecord(response.data.record.recording));
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: error.response.data.message,
                    }),
                );
            } else {
                console.log(error.message);
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: error.message,
                    }),
                );
            }
            dispatch(appDoneLoading());
        }
    };
};

export const deleteRecording = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(appLoading());
            const token = selectToken(getState());
            if (token === null) return;
            await axios.delete(`${apiUrl}/recordings/deleteRecording`, {
                data: { recordId: id },
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(refreshSelf());
            dispatch(getPublicRecords());
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: error.response.data.message,
                    }),
                );
            } else {
                console.log(error.message);
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: error.message,
                    }),
                );
            }
            dispatch(appDoneLoading());
        }
    };
};

export const updatePublishStatus = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(appLoading());
            const token = selectToken(getState());
            if (token === null) return;
            await axios.patch(
                `${apiUrl}/recordings/togglePublish`,
                {
                    recordId: id,
                },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            dispatch(refreshSelf());
            dispatch(getPublicRecords());
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: error.response.data.message,
                    }),
                );
            } else {
                console.log(error.message);
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: error.message,
                    }),
                );
            }
            dispatch(appDoneLoading());
        }
    };
};
