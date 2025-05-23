const Response = require("../helper/errHandler");
const userModel = require("../model/userModel");

const profile = async (req, res) => {
  try {
    if (!req.file) {
      return Response.Error({
        res,
        status: 400,
        message: "No file uploaded",
      });
    }

    const imageFilename = req.file.filename;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      { image: imageFilename },
      { new: true }
    );

    if (!updatedUser) {
      return Response.Error({
        res,
        status: 404,
        message: "Profile not found",
      });
    }

    return Response.success({
      res,
      status: 200,
      message: "Profile updated",
      data: updatedUser,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};

module.exports = profile;
