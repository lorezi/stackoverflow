import { Document, Types, Schema, Model, model } from "mongoose";

export interface IVote extends Document {
  user: Types.ObjectId;
  question: Types.ObjectId;
  type: string;
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
});

// Create model
export const Vote: Model<IVote> = model("Vote", voteSchema);
