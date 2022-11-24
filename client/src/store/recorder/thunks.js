import { convertOutputTableToStrings } from '../../components/recorder/recorderFunctions';
export const addRecording = (outputTable) => {
    return async (dispatch, getState) => {
        console.log(convertOutputTableToStrings(outputTable));
    };
};
