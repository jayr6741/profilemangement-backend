const Response = require("../helper/errHandler");
const userModel = require("../model/userModel");
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body
    const getData = await userModel.findOne({ email: email })
  
    if (!getData) {
        const obj = {
            res,
            status: 401,
            message: "pleash Register user"
        }
        return Response.Error(obj)
    }
    else {
        var bytes = CryptoJS.AES.decrypt(getData.password, process.env.SECRECT_KEY);
        var decrypt = bytes.toString(CryptoJS.enc.Utf8);
        if (password === decrypt) {
            var encrypt = CryptoJS.AES.encrypt(getData.id, process.env.SECRECT_KEY).toString();
            const token = jwt.sign({
                userId: encrypt,
                role: getData.role
            }, process.env.SECRECT_KEY, { expiresIn: '1h' });
            const obj = {
                res,
                status: 200,
                message: "login successFully",
                data: token
            }
            return Response.success(obj)
        }
        else {
            const obj = {
                res,
                status: 201,
                message: "invalid password"
            }
            return Response.Error(obj)
        }
    }
}
module.exports = login