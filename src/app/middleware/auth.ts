import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { User } from "../modules/user/user.model";
import { USER_ROLE } from "../modules/user/user.constants";
import catchAsync from "../utils/catechAsync";

export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError(401, "No token provided");
    }

    const verifiedToken = jwt.verify(
      token as string,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email } = verifiedToken;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(401, "You have no access to this route");
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, "You have no access to this route");
    }

    // Attach user information to the request object
    req.user = user;

    next();
  });
};
