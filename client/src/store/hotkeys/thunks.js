import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { selectToken } from '../user/selectors';
import { appLoading, appDoneLoading, setMessage } from '../appState/slice';

export const addPreset = (name) => {
    return async (dispatch, getState) => {
        dispatch(appLoading());
        const token = selectToken(getState());
        if (token === null) return;
        try {
            const response = await axios.post(
                `${apiUrl}/hotkeys/newPreset`,
                {
                    name,
                },
                { headers: { Authorization: `Bearer ${token}` } },
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
