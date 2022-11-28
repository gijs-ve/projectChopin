import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { selectToken } from '../user/';
import { appLoading, appDoneLoading, setMessage } from '../appState/';
import { refreshSelf } from '../user/';
import {
    drumLength,
    pianoLength,
    convertHotkeysToString,
} from '../../components/settings';

export const addPreset = () => {
    return async (dispatch, getState) => {
        dispatch(appLoading());
        const token = selectToken(getState());
        if (token === null) return;
        try {
            await axios.post(`${apiUrl}/hotkeys/newPreset`, '', {
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

export const editPreset = (id, preset) => {
    return async (dispatch, getState) => {
        dispatch(appLoading());
        try {
            const drumString = convertHotkeysToString(preset.drum);
            const pianoString = convertHotkeysToString(preset.piano);
            if (
                pianoString.length !== pianoLength ||
                drumString.length !== drumLength
            ) {
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: 'Invalid save attempt',
                    }),
                );
                return;
            }
            const token = selectToken(getState());
            if (token === null) return;
            await axios.patch(
                `${apiUrl}/hotkeys/editPreset`,
                { id, drumString, pianoString },
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

export const editPresetKeySlots = (id, preset) => {
    return async (dispatch, getState) => {
        dispatch(appLoading());
        try {
            const drumString = convertHotkeysToString(preset.drum);
            const pianoString = convertHotkeysToString(preset.piano);
            if (
                pianoString.length !== pianoLength ||
                drumString.length !== drumLength
            ) {
                dispatch(
                    setMessage({
                        variant: 'danger',
                        dismissable: true,
                        text: 'Invalid save attempt',
                    }),
                );
                return;
            }
            const token = selectToken(getState());
            if (token === null) return;
            await axios.patch(
                `${apiUrl}/hotkeys/editPreset`,
                { id, drumString, pianoString },
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

export const editSettings = (settings) => {
    return async (dispatch) => {
        dispatch(appLoading());
        try {
            const response = await axios.post(`${apiUrl}/settings/edit`, {
                settings,
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
                        text: error.response.data.message,
                    }),
                );
            }
            dispatch(appDoneLoading());
        }
    };
};
