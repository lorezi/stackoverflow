import { Document, Types, Schema, Model, model } from "mongoose";

export interface IAnswer extends Document {
  answer: string;
  user: Types.ObjectId;
  question: Types.ObjectId;
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
});

answerSchema.index({ answer: "text" });

answerSchema.query.searchAnswer = function (body) {
  const regex = new RegExp(body, "ig");
  return this.find({
    answer: { $regex: regex },
  });
};

export const Answer: Model<IAnswer> = model("Answer", answerSchema);
