import { toast } from "react-toastify";
import { rootApi } from "../configApi";

export const UserPaymentsApi = {
    BankOfUser: {
        Add: async (idBank, number, owner, branch, idUser, dispatch, AddBankOfUserSuccess, AccessToken) => {
            await rootApi({
                method: "POST",
                url: "/users/banks",
                headers: {
                    accesstoken: AccessToken
                },
                data: { idBank, number, owner, branch, idUser }
            }).then((res) => {
                toast.success(res.data.mess);
                dispatch(AddBankOfUserSuccess(res.data.Bank));
                console.log(res.data.Bank)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
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
                    toast.error(err.response.data.error);
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
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    }
}