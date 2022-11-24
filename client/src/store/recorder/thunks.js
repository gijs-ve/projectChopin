import { convertOutputTableToStrings } from '../../components/recorder/recorderFunctions';
import { selectOutputTable, selectName } from './selectors';
import { apiUrl } from '../../config/constants';
import axios from 'axios';
import {
    selectToken,
    refreshSelf,
    selectProfileName,
    confirmRecordName,
} from '../';
import { appLoading, appDoneLoading, setMessage } from '../appState/slice';

export const setRecordStartName = () => {
    return async (dispatch, getState) => {
        const name = selectProfileName(getState());
        dispatch(confirmRecordName(name));
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
