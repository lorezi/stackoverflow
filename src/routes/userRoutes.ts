import { Router } from "express";
import { login, signup, logout } from "../controllers/authController";

const userRoutes = Router();

userRoutes.route("/signup").post(signup);
userRoutes.route("/login").post(login);
userRoutes.route("/logout").get(logout);

export default userRoutes;
