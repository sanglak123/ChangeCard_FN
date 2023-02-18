import { ControllerClients } from "data/controller/client"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Edit & Delete bank of user" })
    } else if (req.method === "PUT") {
        await ControllerClients.Banks.Edit(req, res)
    } else if (req.method === "DELETE") {
        await ControllerClients.Banks.Delete(req, res)
    }
}