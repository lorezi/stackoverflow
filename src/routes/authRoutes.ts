import { Router } from "express";
import { login, signup, logout } from "../controllers/authController";

const authRoutes = Router();

authRoutes.route("/signup").post(signup);
authRoutes.route("/login").post(login);
authRoutes.route("/logout").get(logout);

export default authRoutes;
