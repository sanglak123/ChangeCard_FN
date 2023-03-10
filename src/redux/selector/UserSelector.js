export const UserSelector = {
    User: (state) => state.UserSlice.User.User,
    AccessToken: (state) => state.UserSlice.User.accessToken,
    BankOfUsers: (state) => state.UserSlice.BankOfUsers,
    Store: (state) => state.UserSlice.Store,
    DataUser: (state) => state.UserSlice.DataUser,
    Products: (state) => state.UserSlice.Products,
    Payments: (state) => state.UserSlice.Payments
}