import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { selectToken } from './selectors';
import { appLoading, appDoneLoading, setMessage } from '../appState/slice';
import { showMessageWithTimeout } from '../appState/thunks';
import { loginSuccess, logOut, tokenStillValid } from './slice';
import { setPresets, changeActivePresets } from '../hotkeys';
import { setRecordings } from '../recorder/slice';

export const signUp = (name, password) => {
    return async (dispatch) => {
        dispatch(appLoading());
        try {
            const response = await axios.post(`${apiUrl}/auth/signup`, {
                name,
                password,
            });

            dispatch(
                loginSuccess({
                    token: response.data.token,
                    user: response.data.user,
                }),
            );
            dispatch(
                showMessageWithTimeout('success', true, 'account created'),
            );
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

export const login = (name, password) => {
    return async (dispatch) => {
        dispatch(appLoading());
        try {
            const response = await axios.post(
                `${apiUrl}/auth/login`,
                {
                    name,
                    password,
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods':
                            'GET, POST, PUT, DELETE',
                    },
                },
            );

            dispatch(
                loginSuccess({
                    token: response.data.token,
                    user: response.data.user,
                }),
            );
            dispatch(
                showMessageWithTimeout('success', false, 'welcome back!', 1500),
            );
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

export const refreshSelf = () => {
    return async (dispatch, getState) => {
        const token = selectToken(getState());
        if (token === null) return;
        dispatch(appLoading());
        try {
            const response = await axios.get(`${apiUrl}/auth/self`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                },
            });
            dispatch(tokenStillValid({ user: response.data }));
            dispatch(setPresets(response.data.presets));
            dispatch(setRecordings(response.data.recordings));
            dispatch(
                changeActivePresets(response.data.userSettings.activePresets),
            );
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.message);
            } else {
                console.log(error);
            }
            dispatch(logOut());
            dispatch(appDoneLoading());
        }
    };
};
