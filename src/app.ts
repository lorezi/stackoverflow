import express from "express"
import homeRouter from './routes/homeRouter'
import questionRoutes from "./routes/questionRoutes";
import userRoutes from "./routes/userRoutes";
import AppError from "./utils/AppError";

const app = express()

app.enable('trust proxy')


// Body parser, reading data from the body into req.body
// middleware ===> modifies the request
// Limit the number of data we can pass into a body response
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Mounting the router as a middleware

app.use('/', homeRouter);
app.use(`/users`, userRoutes);
app.use(`/questions`, questionRoutes);

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!'`, 404));
});

// app.use(globalErrorHandler);
    
export default app



