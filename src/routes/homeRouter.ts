
import {Router} from "express";
import {homeController} from '../controllers/homeController'

const homeRouter = Router()

homeRouter.route("/").get(homeController)

export default homeRouter;