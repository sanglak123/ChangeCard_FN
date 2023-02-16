import { ControllerClients } from "data/controller/client"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Register user" })
    } else if (req.method === "POST") {
        await ControllerClients.Authen.Register(req, res)
    }
}