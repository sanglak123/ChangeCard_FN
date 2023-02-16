const { toast } = require("react-toastify");
const { rootApi } = require("./configApi");

const ApiClients = {
    Data: {
        LoadingData: async (dispatch, LoadingDataSuccess) => {
            await rootApi({
                method: "GET",
                url: "/data"
            }).then((res) => {
                dispatch(LoadingDataSuccess(res.data))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Authen: {
        Login: async (userName, pass, dispatch, LoginSuccess, router) => {
            await rootApi({
                method: "POST",
                url: "/users/authen/login",
                data: { userName, pass }
            }).then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.mess);
                    dispatch(LoginSuccess(res.data));
                    router.replace("/")
                }

            }).catch((err) => {
                if (err.response) {
                    toast.success("Error")
                } else {
                    toast.error(err);
                }
            })
        },
        Register: async (userName, pass, phone, email) => {
            await rootApi({
                method: "POST",
                url: "/users/authen/register",
                data: { userName, pass, phone, email }
            }).then((res) => {
                dispatch(DataSuccess(res.data));
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Logout: async (dispatch, LogoutUserSuccess) => {
            await rootApi({
                method: "GET",
                url: "/users/authen/logout",
            }).then((res) => {
                toast.success("Logout success!");
                dispatch(LogoutUserSuccess())
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    }
};

module.exports = {
    ApiClients
}