const Response = require("../helper/errHandler");
const userModel = require("../model/userModel");
var CryptoJS = require("crypto-js");
const register = async (req, res) => {
    const { email, password } = req.body
    const getData = await userModel.findOne({ email: email })
    if (getData) {
        const obj = {
            res,
            status: 409,
            message: "user already register"
        }
        return Response.Error(obj)
    }
    var encrypt = CryptoJS.AES.encrypt(password, process.env.SECRECT_KEY).toString();
    req.body.password = encrypt
    const saveData = await userModel.create(req.body)
    const obj = {
        res,
        status: 200,
        message: "user successFully register",
        data: saveData
    }
    return Response.success(obj)
}
module.exports = register