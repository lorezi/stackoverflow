import app from "./app";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! 😢 Shutting down...");
  process.exit(1);
});

dotenv.config({ path: __dirname + "/.env" });

const DB: string = process.env.DATABASE!;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful 😘"));

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`Server is listening on port ${port} 🤝`)
);

// To handle async exception
process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION! Shutting down gracefully");
  server.close(() => {
    process.exit(1);
  });
});

// Sigterm handling
process.on("SIGTERM", (err) => {
  console.log(err);
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});
