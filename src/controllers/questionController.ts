import { Subscription } from "../models/subscriptionModel";
import { Answer } from "./../models/answerModel";
import { Vote } from "./../models/voteModel";
import { Request, Response, NextFunction } from "express";
import { IQuestion, Question } from "../models/questionModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { notifyUsers, subscription } from "../sockets/socketHelpers";

export const getQuestions = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const data = await Question.find({}).populate({
      path: "author",
      select: ["firstName", "lastName", "username", "email"],
    });

    res.status(200).json({
      status: "success",
      data,
    });
  }
);

export const createQuestion = catchAsync(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const newQuestion: IQuestion = await Question.create({
      title: req.body.title,
      body: req.body.body,
      author: res.user?._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        data: newQuestion,
      },
    });
  }
);

export const getQuestion = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const question = await Question.findById(id).populate({
      path: "author",
      select: ["firstName", "lastName", "username", "email"],
    });

    if (!question) {
      return next(new AppError(`No doc found with the ID: ${id}`, 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: question,
      },
    });
  }
);

export const upVote = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return next(new AppError(`No doc found with the ID: ${id}`, 404));
    }
    question.vote += 1;
    question.updatedAt = new Date(Date.now());
    question.save();

    await Vote.create({
      user: res.user?.id,
      question: id,
      type: "up",
    });

    res.status(200).json({
      status: "success",
      data: {
        data: question,
      },
    });
  }
);

export const downVote = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return next(new AppError(`No doc found with the ID: ${id}`, 404));
    }
    question.vote -= 1;
    question.updatedAt = new Date(Date.now());
    question.save();

    await Vote.create({
      user: res.user?.id,
      question: id,
      type: "down",
    });

    res.status(200).json({
      status: "success",
      data: {
        data: question,
      },
    });
  }
);

export const answer = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return next(new AppError(`No doc found with the ID: ${id}`, 404));
    }

    const reply = await Answer.create({
      answer: req.body.answer,
      user: res.user?.id,
      question: id,
    });

    // notify users
    notifyUsers(reply);

    res.status(201).json({
      status: "success",
      data: {
        data: reply,
      },
    });
  }
);

export const subscribe = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return next(new AppError(`No doc found with the ID: ${id}`, 404));
    }

    const newSubscription = await Subscription.create({
      subscriber: res.user?.id,
      question: id,
      channel: `channel-${id}`,
    });

    // notify subscription
    subscription(`channel-${id}`);

    res.status(201).json({
      status: "success",
      data: {
        data: newSubscription,
      },
    });
  }
);
