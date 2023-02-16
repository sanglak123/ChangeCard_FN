import { ControllerClients } from "data/controller/client";

export default async function ApiData(req, res) {
    if (req.method === "GET") {
        await ControllerClients.Data.LoadingData(req, res);
    }
}