import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catechAsync";
import { USER_ROLE } from "../modules/user/user.constants";
import config from "../config";

interface JwtPayloadWithId extends JwtPayload {
    _id: string;
}

const authBooking = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if (!accessToken) {
            throw new AppError(401, "No token provided",);
        }

        const decoded = jwt.verify(accessToken, config.jwt_access_secret as string) as JwtPayloadWithId;
        if (!decoded._id) {
            return res.status(401).json({ success: false, message: 'Invalid token.' });
        }
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid token.' });
        }
        req.user = user;
        next();

    });
};

export default authBooking;