import { toast } from "react-toastify"
import { rootApi } from "./configApi"

export const ApiAdmins = {
    Cards: {
        Add: async () => {
            await rootApi({
                method: "POST",
                url: "/admin/prices/update"
            }).then((res) => {
                toast.success(res.data.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Delete: async (idCard) => {
            await rootApi({
                method: "DELETE",
                url: `/admin/cards/${idCard}`
            }).then((res) => {
                toast.success(res.data.mess);
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Edit: async (idCard, telco, photo, change) => {
            const formData = new FormData();
            formData.append("photo", photo);
            formData.append("telco", telco);
            formData.append("change", change);
            await rootApi({
                method: "PUT",
                url: `/admin/cards/${idCard}`,
                data: formData
            }).then((res) => {
                toast.success(res.data.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                    console.log(err.response.data.error)
                } else {
                    toast.error(err);
                    console.log(err)
                }
            })
        },
    },
    Prices: {
        Update: async () => {
            await rootApi({
                method: "PUT",
                url: "/admin/prices/update"
            }).then((res) => {
                toast.success(res.data.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        EditFeesBuy: async (idPrice, feesBuy) => {
            await rootApi({
                method: "PUT",
                url: `/admin/prices/${idPrice}`,
                data: {
                    feesBuy: feesBuy
                }
            }).then((res) => {
                dispatch(UpdateFeesBuySuccess({ id: idPrice, feesBuy: feesBuy }))
                toast.success(res.data.mess);
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Add: async (idCard, idValue, feesChange, feesBuy) => {
            await rootApi({
                method: "POST",
                url: "/admin/prices",
                data: {
                    idCard, idValue, feesChange, feesBuy
                }
            }).then((res) => {
                toast.success(res.data.mess);
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
        Login: async (dispatch, LoginAdminSuccess, userName, pass, key, router, accessToken) => {
            await rootApi({
                method: "POST",
                url: "/admin/authen/login",
                data: { userName, pass, key },
                headers: {
                    accesstoken: accessToken
                }
            }).then((res) => {
                toast.success(res.data.mess);
                dispatch(LoginAdminSuccess(res.data));
                router.replace("/admin/dashboard")
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Register: async (userName, pass, phone, email, key) => {
            await rootApi({
                method: "POST",
                url: "/admin/authen/register",
                data: { userName, pass, phone, email, key }
            }).then((res) => {
                toast.success(res.data.mess);
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Logout: async (dispatch, LogoutAdminSuccess, router, accessToken) => {
            await rootApi({
                method: "POST",
                url: "/admin/authen/logout",
                headers: {
                    accesstoken: accessToken
                }
            }).then((res) => {
                toast.success("Logout success!");
                dispatch(LogoutAdminSuccess());
                router.replace("/")
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        EditProfile: async (id, displayName, fullName, phone, adress, photo, email, dispatch, EditProfileSuccess) => {
            const formData = new FormData();
            formData.append("photo", photo);
            formData.append("displayName", displayName);
            formData.append("fullName", fullName);
            formData.append("phone", phone);
            formData.append("adress", adress);
            formData.append("email", email);
            await rootApi({
                method: "PUT",
                url: `/admin/${id}`,
                data: formData
            }).then((res) => {
                toast.success(res.data.mess);
                dispatch(EditProfileSuccess(res.data.Admin))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Data: {
        GetAll: async (dispatch, LoadingDataAdmin) => {
            await rootApi({
                method: "GET",
                url: "/admin/data",
            }).then((res) => {
                dispatch(LoadingDataAdmin(res.data))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Banks: {
        Add: async (name, sign) => {
            await rootApi({
                method: "POST",
                url: "/admin/banks",
                data: { name, sign }
            }).then((res) => {
                toast.success(res.data.mess);
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Edit: async (name, sign, id) => {
            await rootApi({
                method: "PUT",
                url: `/admin/banks/${id}`,
                data: { name, sign }
            }).then((res) => {
                toast.success(res.data.mess);
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Delete: async (id) => {
            await rootApi({
                method: "DELETE",
                url: `/admin/banks/${id}`,
            }).then((res) => {
                toast.success(res.data.mess);
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

