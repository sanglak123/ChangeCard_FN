const { Op } = require("sequelize");

const axios = require("axios");
const CryptoJS = require("crypto-js");
const uuid = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const { Values, Users, Products, Cards, Prices } = require("../../db/models")

export const ControllCardPublic = {
    PostCard: async (req, res) => {
        const { id } = req.query;
        const { telco, idValue, code, serial } = req.body;

        try {
            const user = await Users.findOne({
                where: {
                    id: id
                }
            });
            if (user) {
                const oldProduct = await Products.findOne({
                    where: {
                        [Op.and]: [
                            { serial: serial },
                            { code: code },
                            { command: "change" }
                        ]
                    }
                });
                if (oldProduct) {
                    return res.status(400).json({ error: "Card đã tồn tại trên hệ thống!" })
                } else {
                    const card = await Cards.findOne({
                        where: {
                            telco: telco
                        }
                    });

                    const value = await Values.findOne({
                        where: {
                            id: idValue
                        }
                    })
                    const price = await Prices.findOne({
                        where: {
                            [Op.and]: [
                                { idCard: card.id },
                                { idValue: idValue }
                            ]
                        }
                    });

                    const request_id = uuid.v4({ serial: serial }).replace(/\-/g, '').toString();
                    const sign = CryptoJS.MD5(process.env.PARTNER_KEY + code + serial).toString();

                    //CallApi
                    await axios({
                        method: "POST",
                        url: process.env.DOMAIN_POSTCARD,
                        data: {
                            telco: telco,
                            code: code,
                            serial: serial,
                            amount: value.name,
                            request_id: request_id,
                            partner_id: process.env.PARTNER_ID,
                            sign: sign,
                            command: "charging"
                        }
                    }).then(async (responsive) => {
                        const newProduct = await Products.create({
                            idUser: user.id,
                            command: "change",
                            idPrice: price.id,
                            feesChange: price.feesChange,
                            code: code,
                            serial: serial,
                            sign: sign,
                            request_id: request_id,
                            status: "Pending"
                        });
                        return res.status(200).json({ Product: newProduct, mess: "Thẻ đang chờ xử lý!" })
                    }).catch((err) => {
                        return res.status(500).json(err);
                    })
                }
            } else {
                return res.status(404).json({ error: "User not found!" })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    CheckCard: async (req, res) => {
        const { id } = req.query;
        try {
            const product = await Products.findOne({
                where: {
                    id: id
                }
            });
            if (product) {
                const price = await Prices.findOne({
                    where: {
                        id: product.idPrice
                    }
                });
                const card = await Cards.findOne({
                    where: {
                        id: price.idCard
                    }
                })
                const value = await Values.findOne({
                    where: {
                        id: price.idValue
                    }
                })
                const user = await Users.findOne({ where: { id: product.idUser } });
                await axios({
                    method: "POST",
                    url: process.env.DOMAIN_POSTCARD,
                    data: {
                        telco: card.telco,
                        code: product.code,
                        serial: product.serial,
                        amount: value.name,
                        request_id: product.request_id,
                        partner_id: process.env.PARTNER_ID,
                        sign: product.sign,
                        command: "check"
                    }
                }).then(async (responsive) => {
                    const status = responsive.data.status
                    switch (status) {
                        case 1: {
                            product.receiveValue = Number(value.name) - (Number(value.name) * Number(product.feesChange)) / 100;
                            product.status = "Success"
                            await product.save();
                            //user
                            user.surplus = Number(user.surplus) + Number(product.receiveValue);
                            await user.save();
                            const productResult = await Products.findOne({
                                where: {
                                    id: product.id
                                },
                                include: [{ model: Prices, include: [{ model: Cards }, { model: Values }] }]
                            })
                            return res.status(200).json({ mess: "Thẻ thành công đúng mệnh giá!", Product: productResult, });
                        }
                        case 2: {
                            product.receiveValue = (Number(value.name) - (Number(value.name) * Number(product.feesChange)) / 100) / 2;
                            product.status = "Penanty"
                            await product.save();
                            //user
                            user.surplus = Number(user.surplus) + Number(product.receiveValue);
                            await user.save();
                            const productResult = await Products.findOne({
                                where: {
                                    id: product.id
                                }
                            })
                            return res.status(200).json({ mess: "Thẻ thành công sai mệnh giá!", Product: productResult })
                        }
                        case 3: {
                            product.status = "Error";
                            product.receiveValue = "0";
                            await product.save();
                            const productResult = await Products.findOne({
                                where: {
                                    id: product.id
                                }
                            })
                            return res.status(400).json({ error: "Thẻ lỗi!", Product: productResult });
                        }
                        case 4: {
                            await product.destroy();
                            return res.status(500).json({ error: "Hệ thống bảo trì!" })
                        }
                        case 99: {
                            return HandleCheckCard(product.id, card.id, value.id, user.id, res)
                        }
                        case 100: {
                            product.status = "Error";
                            product.receiveValue = "0";
                            await product.save();
                            const productResult = await Products.findOne({
                                where: {
                                    id: product.id
                                }
                            })
                            return res.status(400).json({ error: responsive.data.message, Product: productResult });
                        }
                        default: {
                            product.status = "Error";
                            await product.save();
                            return res.status(400).json({ error: "Thẻ lỗi!" });
                        }
                    }
                }).catch((err) => {
                    return res.status(500).json(err);
                })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};

const HandleCheckCard = async (idProduct, idCard, idValue, idUser, res) => {


    const product = await Products.findOne({
        where: {
            id: idProduct
        }
    });
    const card = await Cards.findOne({
        where: {
            id: idCard
        }
    });
    const value = await Values.findOne({
        where: {
            id: idValue
        }
    });
    const user = await Users.findOne({
        where: {
            id: idUser
        }
    })

    await axios({
        method: "POST",
        url: process.env.DOMAIN_POSTCARD,
        data: {
            telco: card.telco,
            code: product.code,
            serial: product.serial,
            amount: value.name,
            request_id: product.request_id,
            partner_id: process.env.PARTNER_ID,
            sign: product.sign,
            command: "check"
        }
    }).then(async (responsive) => {
        const status = responsive.data.status;
        switch (status) {
            case 1: {
                product.receiveValue = Number(value.name) - (Number(value.name) * Number(product.feesChange)) / 100;
                product.status = "Success"
                await product.save();
                //user
                user.surplus = Number(user.surplus) + Number(product.receiveValue);
                await user.save();
                const productResult = await Products.findOne({
                    where: {
                        id: product.id
                    }
                })
                return res.status(200).json({ mess: "Thẻ thành công đúng mệnh giá!", Product: productResult });
            }
            case 2: {
                product.receiveValue = (Number(value.name) - (Number(value.name) * Number(product.feesChange)) / 100) / 2;
                product.status = "Penanty"
                await product.save();
                //user
                user.surplus = Number(user.surplus) + Number(product.receiveValue);
                await user.save();
                const productResult = await Products.findOne({
                    where: {
                        id: product.id
                    }
                })
                return res.status(200).json({ mess: "Thẻ thành công sai mệnh giá!", Product: productResult })
            }
            case 3: {
                product.status = "Error";
                product.receiveValue = "0";
                await product.save();
                const productResult = await Products.findOne({
                    where: {
                        id: product.id
                    }
                })
                return res.status(400).json({ error: "Thẻ lỗi!", Product: productResult });
            }
            case 4: {
                await product.destroy();
                return res.status(500).json({ error: "Hệ thống bảo trì!" })
            }
            case 99: {
                await HandleCheckCard(product.id, card.id, value.id, user.id, res)
            }
            case 100: {
                product.status = "Error";
                product.receiveValue = "0";
                await product.save();
                const productResult = await Products.findOne({
                    where: {
                        id: product.id
                    }
                })
                return res.status(400).json({ error: responsive.data.message, Product: productResult });
            }
            default: {
                product.status = "Error";
                await product.save();
                const productResult = await Products.findOne({
                    where: {
                        id: product.id
                    }
                })
                return res.status(400).json({ error: "Thẻ lỗi!", Product: productResult });
            }
        }
    }).catch((err) => {
        return res.status(500).json(err);
    })
}


