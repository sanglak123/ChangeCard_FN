import { ControllerClients } from "data/controller/client"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Add bank of user" })
    } else if (req.method === "POST") {
        await ControllerClients.Banks.Add(req, res)
    }
}