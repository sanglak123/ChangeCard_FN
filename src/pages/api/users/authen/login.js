import { ControllerClients } from "data/controller/client"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Login users" })
    } else if (req.method === "POST") {
        await ControllerClients.Authen.Login(req, res)
    }
}