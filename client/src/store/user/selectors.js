export const selectToken = (state) => state.user.token;
export const selectUser = (state) => state.user.profile;
export const selectProfileName = (state) => state.user.profile.name;
export const selectSharedRecordings = (state) =>
    state.user.profile.sharedrecordings;
export const selectUserColor = (state) => state.user.profile.userSettings.color;
