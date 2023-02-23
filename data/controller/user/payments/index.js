import { BankOfUsers, Banks, Payments, Users } from "data/db/models";
import { Op } from "sequelize";

export const UserControllerPayments = {
    Refill: {
        Create: async (req, res) => {
            const { id } = req.query;
            const { amount, idbankOfUser, idBankPublic } = req.body;

            const baseURL = req.protocol + '://' + req.get('host');
            const pathImage = baseURL + '/img/refill/' + req.file.filename;
            try {
                const user = await Users.findOne({
                    where: {
                        id: id
                    }
                });
                if (user) {
                    const bankUser = await BankOfUsers.findOne({
                        where: {
                            id: idbankOfUser
                        }
                    });
                    if (bankUser) {
                        const newRefill = await Payments.create({
                            idUser: user.id,
                            idbankOfUser: idbankOfUser,
                            img: pathImage,
                            command: "refill"
                        });
                        return res.status(201).json({ mess: "Create Refill success!", Refill: newRefill })
                    }
                } else {
                    return res.status(404).json({ error: "User not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Bank: {
        Add: async (req, res) => {
            const { idBank, number, owner, branch, idUser } = req.body;

            try {
                const user = await Users.findOne({
                    where: {
                        id: idUser
                    }
                });
                if (user) {
                    const oldBank = await BankOfUsers.findOne({
                        where: {
                            [Op.and]: [
                                { idBank: idBank },
                                { number: number }
                            ]
                        }
                    });
                    if (oldBank) {
                        return res.status(400).json({ error: "Ngân hàng đã tồn tại trên hệ thống!" })
                    } else {

                        const newBank = await BankOfUsers.create({
                            idBank: idBank,
                            idUser: idUser,
                            number: number,
                            owner: owner,
                            branch: branch
                        }, {
                            include: [{ model: Banks }]
                        });
                        const bankResult = await BankOfUsers.findOne({
                            where: {
                                id: newBank.id
                            },
                            include: [{ model: Banks }]
                        })
                        return res.status(201).json({ mess: "Thêm mới thành công!", Bank: bankResult })
                    }
                } else {
                    return res.status(404).json({ error: "User not found!" });
                }

            } catch (error) {
                return res.status(500).json(error);
            }

        },
        Delete: async (req, res) => {

        },
        Edit: async (req, res) => {

        }
    }
}