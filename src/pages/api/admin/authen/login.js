import { ControllAdmin } from "data/controller/admin"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Admin login..." })
    } else if (req.method === "POST") {
        await ControllAdmin.Authen.Login(req, res);
    }
}