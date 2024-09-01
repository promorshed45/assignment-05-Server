/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import jwt from "jsonwebtoken";
import { isPasswordMatched } from "./auth.util";


// Creates a new user into database
const createUserIntoDB = async (payload: TUser) => {

  // Check if this user exists in the database
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new Error("User already exists");
  }

  const newUser = await User.create(payload);
  return newUser;
};

// Login User with email & password use jwt token
const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Password not matched");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  const { password, ...userData } = user.toObject();

  return {
    accessToken,
    refreshToken,
    user: userData
  };
};



export const AuthServices = {
  createUserIntoDB,
  loginUser,
};