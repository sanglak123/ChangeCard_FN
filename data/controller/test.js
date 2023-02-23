import { Users } from "data/db/models";

export const TestController = {
    GetAllUser: async (req, res) => {
        try {
            const list = await Users.findAll();
            return res.status(200).json({ Users: list })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}