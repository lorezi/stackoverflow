import { errorHandler } from "./controllers/errorController";
import express from "express";
import questionRoutes from "./routes/questionRoutes";
import userRoutes from "./routes/userRoutes";
import AppError from "./utils/AppError";
import cookieParser from "cookie-parser";
import expressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";

const app = express();

app.enable("trust proxy");

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from the body into req.body
// middleware ===> modifies the request
// Limit the number of data we can pass into a body response
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(expressMongoSanitize());

// Mounting the router as a middleware
app.use(`/users`, userRoutes);
app.use(`/questions`, questionRoutes);

app.all("*", (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!'`, 404));
});

app.use(errorHandler);

export default app;
