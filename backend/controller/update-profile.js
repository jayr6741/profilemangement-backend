const Response = require("../helper/errHandler")
const userModel = require("../model/userModel")
const profile = async (req, res) => {
    try {
        const getprofile = await userModel.findByIdAndUpdate({ _id: req.userId }, req.file, { new: true })
        if (!getprofile) {
            const obj = {
                res,
                status: 402,
                message: "profile not found"
            }
            return Response.Error(obj)
        }
        const obj = {
            res,
            status: 200,
            message: "update profile",
            data: getprofile
        }
        return Response.success(obj)
    } catch (error) {
        const obj = {
            res,
            status: 500,
            message: error.stack
        }
        return Response.Error(obj)
    }
}
module.exports = profile