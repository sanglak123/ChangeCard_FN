const { Prices, Cards, Values, Users, RefreshTokens, TypeCards, Banks, Imgs, Products } = require("../../db/models");
const bcryptjs = require("bcryptjs");
const { CreateAccessToken, CreateRefreshToken } = require("data/token");
const { Op } = require("sequelize");
const axios = require("axios");
const uuid = require("uuid");
const CryptoJS = require("crypto-js");

export const ControllerClients = {
    Data: {
        LoadingData: async (req, res) => {
            try {
                const listPrices = await Prices.findAll({
                    include: [{ model: Cards }, { model: Values }]
                });

                const listTypeCards = await TypeCards.findAll();

                const listCards = await Cards.findAll({
                    include: [{ model: TypeCards }, { model: Imgs }]
                });

                const listValues = await Values.findAll();

                const listBanks = await Banks.findAll();
                return res.status(200).json(
                    {
                        Prices: listPrices,
                        TypeCards: listTypeCards,
                        Cards: listCards,
                        Values: listValues,
                        Banks: listBanks
                    })
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Authen: {
        Login: async (req, res) => {
            const { userName, pass } = req.body;
            try {
                const user = await Users.findOne({
                    where: {
                        userName: userName
                    }
                });
                if (user) {
                    if (bcryptjs.compareSync(pass, user.pass)) {
                        const newAccessToken = CreateAccessToken(user);
                        const newRefreshToken = CreateRefreshToken(user);

                        const oldRefreshToken = await RefreshTokens.findOne({
                            where: {
                                idUser: user.id
                            }
                        });
                        if (oldRefreshToken) {
                            oldRefreshToken.refreshToken = newRefreshToken;
                            await oldRefreshToken.save();
                            res.cookie("refreshToken", newRefreshToken, {
                                httpOnly: true,
                                secure: true,
                                path: "/",
                                sameSite: "strict",
                                maxAge: 60 * 1000 * 60 * 24
                            });
                            return res.status(200).json({ User: user, accessToken: newAccessToken, mess: "Login success" });
                        } else {
                            await RefreshTokens.create({
                                idUser: user.id,
                                refreshToken: newRefreshToken
                            });
                            return res.status(200).json({ User: user, accessToken: newAccessToken, mess: "Login success" });
                        }
                    } else {
                        return res.status(404).json({ error: "Pass wrong!" })
                    }

                } else {
                    return res.status(404).json({ error: "User not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Register: async (req, res) => {
            const { userName, pass, phone, email } = req.body;
            try {
                if (userName !== "" || pass !== "") {
                    const oldUser = await Users.findOne({
                        where: {
                            userName: userName
                        }
                    });
                    if (oldUser) {
                        return res.status(400).json({ error: "User already exits!" })
                    } else {
                        const salt = bcryptjs.genSaltSync(10);
                        const newPass = bcryptjs.hashSync(pass, salt);
                        await Users.create({
                            userName: userName,
                            pass: newPass,
                            email: email,
                            phone: phone
                        });
                        return res.status(201).json({ mess: "Register success" })
                    }
                } else {
                    return res.status(400).json({ error: "No data" })
                }

            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Logout: async (req, res) => {
            try {
                res.clearCookie("refreshToken");
                return res.end();
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Cards: {
        PostCard: async (req, res) => {
            const { idCard, code, serial, idValue, idUser } = req.body;
            try {
                const user = await Users.findOne({
                    where: {
                        id: idUser
                    }
                });
                if (user) {
                    const card = await Cards.findOne({
                        where: {
                            id: idCard
                        }
                    });
                    if (card) {
                        const value = await Values.findOne({
                            where: {
                                id: idValue
                            }
                        });
                        if (value) {
                            const oldProduct = await Products.findOne({
                                where: {
                                    [Op.and]: [
                                        { code: code },
                                        { serial: serial }
                                    ]
                                }
                            });
                            if (oldProduct) {
                                return res.status(400).json({ error: "Card already exits!" })
                            } else {
                                const price = await Prices.findOne({
                                    where: {
                                        idCard: card.id
                                    }
                                });
                                if (price) {
                                    //Tạo mới Product
                                    const newProduct = await Products.create({
                                        idUser: idUser,
                                        command: "change",
                                        idPrice: price.id,
                                        code: code,
                                        serial: serial,
                                        status: "Pending"
                                    });
                                    return res.status(201).json({ mess: "Thẻ đang xử lý!", Product: newProduct })
                                    // //Call Api
                                    // const request_id = uuid.v4({ serial: serial }).replace(/\-/g, '').toString();
                                    // const sign = CryptoJS.MD5(process.env.PARTNER_KEY + code + serial).toString();
                                    // await axios({
                                    //     method: "POST",
                                    //     url: process.env.DOMAIN_POSTCARD,
                                    //     data: {
                                    //         telco: card.telco,
                                    //         code: code,
                                    //         serial: serial,
                                    //         amount: value.name,
                                    //         request_id: request_id,
                                    //         partner_id: process.env.PARTNER_ID,
                                    //         sign: sign,
                                    //         command: "charging"
                                    //     }
                                    // }).then((responsive) => {
                                    //     return res.status(200).json({ status: responsive.data.status, mess: "Thẻ đang được xử lý vui lòng chờ trong giây lát" })
                                    // }).catch((err) => {
                                    //     return res.status(500).json(err)
                                    // })
                                } else {
                                    return res.status(404).json({ error: "Price not found!" })
                                }
                            }
                        } else {
                            return res.status(404).json({ error: "Value not found!" })
                        }
                    } else {
                        return res.status(404).json({ error: "Card not found!" })
                    }
                } else {
                    return res.status(404).json({ error: "User not found!" })
                }

            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
};

export const CheckCard = async (req, res) => {
    const { telco, code, seri, value, idUser } = req.body;
    try {
        const client = await Users.findOne({
            where: {
                id: idUser
            }
        });

        const postcard = await PostCards.findOne({
            where: {
                [Op.and]: [
                    { idUser: client.id },
                    { code: code },
                    { seri: seri }
                ]
            }
        });

        if (postcard.message === "Wait") {
            await axios({
                method: "POST",
                url: process.env.DOMAIN_POSTCARD,
                data: {
                    telco: telco,
                    code: code,
                    serial: seri,
                    amount: value,
                    request_id: postcard.request_id,
                    partner_id: process.env.PARTNER_ID,
                    sign: postcard.sign,
                    command: "check"
                }
            }).then(async (responsive) => {

                switch (responsive.data.status) {
                    case 1: {
                        client.surplus = Number(client.surplus) + Number(postcard.amount);
                        await client.save();
                        postcard.message = "Success";
                        postcard.status = 1;
                        await postcard.save();
                        return res.status(200).json({ status: 1, mess: "Đổi thẻ thành công!", PostCard: postcard })
                    }
                    case 2: {
                        client.surplus = client.surplus + (amount / 2);
                        await client.save();
                        postcard.message = "Penanty";
                        postcard.status = 2;
                        postcard.amount = postcard.amount / 2;
                        await postcard.save();
                        return res.status(200).json({ status: 2, mess: "Đổi thẻ thành công - Sai mệnh giá", PostCard: postcard })
                    }
                    case 3: {
                        postcard.message = "Error";
                        postcard.status = 3;
                        postcard.amount = 0;
                        await postcard.save();
                        return res.status(200).json({ status: 3, mess: "Thẻ lỗi" })
                    }
                    case 4: {
                        postcard.destroy();
                        return res.status(200).json({ status: 4, mess: "Hệ thống bảo trì" })
                    }
                    case 99: {
                        return res.status(200).json({ status: 99 })
                    }
                    default: {
                        postcard.message = "Error";
                        postcard.status = 3;
                        postcard.amount = 0;
                        await postcard.save();
                        return res.status(400).json({ error: "Thẻ lỗi" })
                    }
                }
            }).catch((err) => {
                return res.status(500).json(err)
            })
        } else {
            return res.status(404).json({ error: "Card không tồn tại trên hệ thống!" })
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}
