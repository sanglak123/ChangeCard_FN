import { UserControllerAuthen } from "data/controller/user/authens";
import nextConnect from "next-connect";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res
            .status(501)
            .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.get((req, res) => {
    return res.status(200).json({ mess: "User Buy Card" })
});

apiRoute.post(UserControllerAuthen.Login)

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};