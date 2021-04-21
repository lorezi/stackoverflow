import { Document, Types, Schema, Model, model } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  body: string;
  vote: number;
  createdAt: Date;
  author: Types.ObjectId;
}

const questionSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  vote: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

questionSchema.index(
  { title: "text", body: "text" },
  { weights: { title: 5, body: 3 } }
);

// Create model
export const Question: Model<IQuestion> = model("Question", questionSchema);
