export const AdminSelector = {
    Admin: (state) => state.AdminDataSlice.Admin?.Admin,
    AccessToken: (state) => state.AdminDataSlice.Admin?.accessToken,
    Data :(state)=>state.AdminDataSlice.Data
}