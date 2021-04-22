import { Document, Types, Schema, Model, model, Date } from "mongoose";

export interface IVote extends Document {
  user: Types.ObjectId;
  question: Types.ObjectId;
  type: string;
  createdAt: Date;
}

const voteSchema: Schema = new Schema({
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
  type: {
    type: String,
    enum: ["up", "down"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Create model
export const Vote: Model<IVote> = model("Vote", voteSchema);
