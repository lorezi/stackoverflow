import { Document, Types, Schema, Model, model } from "mongoose";

export interface IAnswer extends Document {
  answer: string;
  user: Types.ObjectId;
  question: Types.ObjectId;
  createdAt: Date;
}

const answerSchema: Schema = new Schema({
  answer: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: Types.ObjectId,
    ref: "Question",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

answerSchema.index({ answer: "text" });

export const Answer: Model<IAnswer> = model("Answer", answerSchema);
