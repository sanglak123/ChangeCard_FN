export const UserSelector = {
    User: (state) => state.UserSlice.User.User,
    AccessToken: (state) => state.UserSlice.User.accessToken,
    Store: (state) => state.UserSlice.Store,
}