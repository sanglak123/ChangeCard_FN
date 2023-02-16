import { ControllAdmin } from "data/controller/admin";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await ControllAdmin.Data.GetAll(req, res)
    }
}