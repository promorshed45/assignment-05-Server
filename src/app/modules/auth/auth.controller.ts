import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catechAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const createUser = catchAsync(async (req, res) => {
    const result = await AuthServices.createUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  });

  const loginUser = catchAsync(async (req, res) => {
    const { user, accessToken, refreshToken } = await AuthServices.loginUser(req.body);
  
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      token: accessToken,
      data: user
    });
  });

  
  export const authControllers = {
    createUser,
    loginUser
  };