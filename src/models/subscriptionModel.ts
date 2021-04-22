import { Types, Schema, Model, model, Date } from "mongoose";
import { Document } from "mongoose";

export interface ISubscription extends Document {
  subscriber: Types.ObjectId;
  question: Types.ObjectId;
  channel: string;
  createdAt: Date;
}

const subscriptionSchema: Schema = new Schema({
  subscriber: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: Types.ObjectId,
    ref: "Question",
    required: true,
  },
  channel: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Subscription: Model<ISubscription> = model(
  "Subscription",
  subscriptionSchema
);
