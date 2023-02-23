import { toast } from "react-toastify";
import { rootApi } from "../configApi";

export const UserDataApi = {
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
}