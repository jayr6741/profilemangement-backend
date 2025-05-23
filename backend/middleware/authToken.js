const Response = require("../helper/errHandler");
const userModel = require("../model/userModel");
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const authToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        let checktoken = token.split(" ")[0]
        if (checktoken !== "Bearer") {
            const obj = {
                res,
                status: 401,
                message: error.stack
            }
            return Response.Error(obj)
        }
        token = token.split(' ')[1]
        jwt.verify(token, process.env.SECRECT_KEY, function (err, decoded) {
            if (err) {
                const obj = {
                    res,
                    status: 401,
                    message: err.stack
                }
                return Response.Error(obj)
            }
            else {
                var bytes = CryptoJS.AES.decrypt(decoded.userId,process.env.SECRECT_KEY);
                var decrypt = bytes.toString(CryptoJS.enc.Utf8);
                req.userId=decrypt
                req.role=decrypt.role
                
            }
            next()
        });
    } catch (error) {
        const obj = {
            res,
            status: 500,
            message: error
        }
        return Response.Error(obj)
    }

}
module.exports = authToken