import { toast } from "react-toastify"
import { rootApi } from "./configApi"

export const ApiUsers = {
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
        },
        LoadingDataUser: async (idUser, dispatch, LoadingDataUserSuccess) => {
            await rootApi({
                method: "GET",
                url: `/users/${idUser}`
            }).then((res) => {
                dispatch(LoadingDataUserSuccess(res.data))
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
                toast.success(res?.data?.mess)
                dispatch(LoginSuccess(res?.data));
                router.replace("/");
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
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
                toast.success(res.data.mess)
                dispatch(DataSuccess(res.data));
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Logout: async (dispatch, LogoutUserSuccess, router) => {
            await rootApi({
                method: "GET",
                url: "/users/authen/logout",
            }).then((res) => {
                toast.success("Logout success!");
                dispatch(LogoutUserSuccess());
                router.replace("/")
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
     BankOfUser: {
        Add: async (idBank, number, owner, branch, idUser) => {
            await rootApi({
                method: "POST",
                url: "/users/banks",
                data: { idBank, number, owner, branch, idUser }
            }).then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.mess);
                }

            }).catch((err) => {
                if (err.response) {
                    toast.success("Error")
                } else {
                    toast.error(err);
                }
            })
        },
        Edit: async (idBank, number, owner, branch, idUser) => {
            await rootApi({
                method: "PUT",
                url: `/users/banks/${idBank}`,
                data: { number, owner, branch, idUser }
            }).then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.mess);
                }
            }).catch((err) => {
                if (err.response) {
                    toast.success("Error")
                } else {
                    toast.error(err);
                }
            })
        },
        Delete: async (idBank, idUser) => {
            await rootApi({
                method: "DELETE",
                url: `/users/banks/${idBank}`,
                data: { idUser }
            }).then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.mess);
                }
            }).catch((err) => {
                if (err.response) {
                    toast.success("Error")
                } else {
                    toast.error(err);
                }
            })
        }
    }
};

