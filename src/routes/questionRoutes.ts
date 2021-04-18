import { protect } from "./../controllers/authController";
import {
  answer,
  createQuestion,
  downVote,
  getQuestion,
  subscribe,
  upVote,
} from "./../controllers/questionController";

import { Router } from "express";
import { getQuestions } from "../controllers/questionController";

const questionRoutes = Router();

questionRoutes.use(protect);

questionRoutes.route("/").get(getQuestions).post(createQuestion);
questionRoutes.route("/:id").get(getQuestion);
questionRoutes.route("/:id/up-vote").patch(upVote);
questionRoutes.route("/:id/down-vote").patch(downVote);
questionRoutes.route("/:id/reply").post(answer);
questionRoutes.route("/:id/subscribe").post(subscribe);

export default questionRoutes;
