import { ControllerClients } from "data/controller/client"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.statú(200).json({ mess: "Post card" })
    } else if (req.method === "POST") {
        await ControllerClients.Cards.PostCard(req, res)
    }
}