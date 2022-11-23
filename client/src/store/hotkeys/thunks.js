import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { selectToken } from '../user/';
import { appLoading, appDoneLoading, setMessage } from '../appState/';
import { refreshSelf } from '../user/';

export const addPreset = (name) => {
    return async (dispatch, getState) => {
        dispatch(appLoading());
        const token = selectToken(getState());
        if (token === null) return;
        try {
            await axios.post(
                `${apiUrl}/hotkeys/newPreset`,
                {
                    name,
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
