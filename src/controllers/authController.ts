import { Types } from "mongoose";
import { CookieOptions, NextFunction, Response, Request } from "express";
import { IUser, User } from "../models/userModel";
import * as jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import * as dotenv from "dotenv";
import catchAsync from "../utils/catchAsync";

dotenv.config({ path: __dirname + "/.env" });

const signToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
};

const createSendToken = (
  user: IUser,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user._id);
  const cookieExpiration = +process.env.JWT_COOKIE_EXPIRES_IN!;

  const cookieOptions: CookieOptions = {
    // Converting the expiration time to milliseconds
    expires: new Date(Date.now() + cookieExpiration * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const newUser: IUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    //  Create and send token
    createSendToken(newUser, 201, req, res);
  }
);
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;
    // 1. Check if username and password exist
    if (!username || !password) {
      return next(new AppError("Please provide username and password", 400));
    }

    // 2. Check if user exists and password is correct
    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect username and password", 401));
    }

    // 3. If everything is ok, send token to client
    createSendToken(user, 200, req, res);
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1. Get token and check if it's there
    let token;
    let isAuthenticated = false;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      isAuthenticated = true;
    } else if (req.cookies) {
      token = req.cookies["jwt"];
      isAuthenticated = true;
    }

    if (!isAuthenticated) {
      return next(
        new AppError("You are not log in! Please log in to get access", 401)
      );
    }

    // 2. Verification token
    const secret = process.env.JWT_SECRET!;
    const decoded = <any>jwt.verify(token, secret);

    // 3. Check if user still exists
    const loggedUser = await User.findById(decoded.id);

    // 4. Grant access to protected routes
    res.user = loggedUser;
    next();
  }
);
