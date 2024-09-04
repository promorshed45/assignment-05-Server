import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/create-user",
    UserController.createUser);
router.get("/",
    // auth("admin"),
    UserController.getAllUsers);
router.patch("/:userId",
    // auth("admin"),
    UserController.updateUserRole);

export const UserRoute = router;
