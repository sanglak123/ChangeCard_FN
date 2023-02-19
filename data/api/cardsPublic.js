import { toast } from "react-toastify";
import { rootApi } from "./configApi";
import { ApiUsers } from "./users";

export const ApiCardsPublic = {
    PostCards: async (telco, idValue, code, serial, idUser, accessToken, dispatch, LoadingDataUserSuccess, ChangeCardSuccess, idToast) => {
        await rootApi({
            method: "POST",
            url: `/users/changecard/${idUser}`,
            headers: {
                accesstoken: accessToken
            },
            data: {
                telco, idValue, code, serial
            }
        }).then((res) => {
            toast.update(idToast, { render: res.data.mess, type: "success" });
            const Product = res?.data?.Product;
            setTimeout(async () => {
                await ApiCardsPublic.CheckCard(accessToken, Product.id, idUser, dispatch, LoadingDataUserSuccess, ChangeCardSuccess, idToast)
            }, 3000);
        }).catch((err) => {
            if (err.response) {
                toast.update(idToast, { render: err.response.data.error, type: "error", isLoading: false })
                setTimeout(() => {
                    toast.dismiss(idToast);
                }, 2000);
            } else {
                toast.update(idToast, { render: err, type: "error", isLoading: false })
                setTimeout(() => {
                    toast.dismiss(idToast);
                }, 2000);
            }
        })
    },
    CheckCard: async (accessToken, idProduct, idUser, dispatch, LoadingDataUserSuccess, ChangeCardSuccess, idToast) => {
        toast.update(idToast, { render: "Đang xử lý thẻ vui lòng chờ..." })
        await rootApi({
            method: "POST",
            url: `/users/products/${idProduct}`,
            headers: {
                accesstoken: accessToken
            }
        }).then(async (res) => {
            toast.update(idToast, { render: res.data.mess, type: "success", isLoading: false });
            dispatch(ChangeCardSuccess(res.data.Product));
            setTimeout(async () => {
                toast.dismiss(idToast);
            }, 2000);
        }).catch(async (err) => {
            if (err.response) {
                toast.update(idToast, { render: err.response.data.error, type: "error", isLoading: false });
                setTimeout(async () => {
                    dispatch(ChangeCardSuccess(err.response.data.Product))
                    toast.dismiss(idToast);
                }, 2000);
            } else {
                toast.update(idToast, { render: err, type: "error", isLoading: false });
                setTimeout(async () => {
                    dispatch(ChangeCardSuccess(err.response.data.Product));
                    toast.dismiss(idToast);
                }, 2000);
            }
        })
    },
};

