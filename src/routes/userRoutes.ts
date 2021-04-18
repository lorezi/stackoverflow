
import {Router} from "express";
import { login, signup } from "../controllers/authController";

const userRoutes = Router()

userRoutes.route("/signup").post(signup)
userRoutes.route("/login").post(login)


export default userRoutes;