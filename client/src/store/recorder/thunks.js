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
    addRecord,
} from '../';
import { appLoading, appDoneLoading, setMessage } from '../appState/slice';
import { convertStringsToOutputTable } from '../../components/recorder';

export const setRecordStartName = () => {
    return async (dispatch, getState) => {
        const name = selectProfileName(getState());
        dispatch(confirmRecordName(name));
    };
};

export const checkSoundList = () => {
    return async (dispatch, getState) => {
        dispatch(raiseListenTimer());
        const checkRecord = () => {
            //CHANGE TO THE FOLLOWING: SELECTOR + [RECORDING] HAS TO BE REFERING TO ACTIVE RECORD
            const recordId = selectActiveRecording(getState());
            const recordList = selectRecord(getState());
            console.log(recordId);
            const record = recordList.find((i) => {
                console.log(i);
                return recordId === i.id;
            });
            console.log(record);
            const outputTable = convertStringsToOutputTable(
                record.recordstrings,
            );
            const listenTime = selectListenTime(getState());
            const foundSounds = outputTable.filter((i) => {
                return +i.time === listenTime;
            });

            return foundSounds;
        };

        const record = checkRecord();
        const recordStatus = selectRecordingStatus(getState());
        if (!record || record.length === 0) return;
        record.map((i) => {
            playRecorderSound(i.output);
            dispatch(
                addSound({
                    output: convertNameToOutput(i.output),
                    origin: 'self',
                    height: convertNameToHeight(i.output),
                }),
            );
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
