import { ControllerClients } from "data/controller/client";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await ControllerClients.Authen.Logout(req, res);
    }
}