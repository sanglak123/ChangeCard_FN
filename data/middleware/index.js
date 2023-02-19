const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const CheckAdmin = (req, res, next) => {
    try {
        const { accesstoken } = req.headers;
        jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY, async (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Not logged in!" })
            } else {
                if (user.admin === true) {
                    next();
                } else {
                    return res.status(403).json({ error: "no access to information!" })
                }
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

const CheckLogin = (req, res, next) => {
    try {
        const { accesstoken } = req.headers;
        jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY, async (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Not logged in!" })
            } else {
                next();
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    CheckAdmin, CheckLogin
}