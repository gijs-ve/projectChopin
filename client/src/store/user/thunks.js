import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { selectToken } from './selectors';
import { appLoading, appDoneLoading, setMessage } from '../appState/slice';
import { showMessageWithTimeout } from '../appState/thunks';
import { loginSuccess, logOut, tokenStillValid } from './slice';
import { setPresets } from '../hotkeys';

export const signUp = (name, password) => {
    return async (dispatch, getState) => {
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
    return async (dispatch, getState) => {
        dispatch(appLoading());
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
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
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data.presets);
            // token is still valid
            dispatch(tokenStillValid({ user: response.data }));
            dispatch(setPresets(response.data.presets));
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.message);
            } else {
                console.log(error);
            }
            // if we get a 4xx or 5xx response,
            // get rid of the token by logging out
            dispatch(logOut());
            dispatch(appDoneLoading());
        }
    };
};
