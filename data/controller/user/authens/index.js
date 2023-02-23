import { RefreshTokens, Users } from "data/db/models";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import { CreateAccessToken, CreateRefreshToken } from "data/token";

export const UserControllerAuthen = {
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
                        user.pass = null;
                        user.pass2 = null;
                        return res.status(200).json({ User: user, accessToken: newAccessToken, mess: "Login success!" });
                    } else {
                        await RefreshTokens.create({
                            idUser: user.id,
                            refreshToken: newRefreshToken
                        });
                        user.pass = null;
                        user.pass2 = null;
                        return res.status(200).json({ User: user, accessToken: newAccessToken, mess: "Login success!" });
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
}