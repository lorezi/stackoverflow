import { Types, Document, Schema, Model, model } from "mongoose";

export interface INotification extends Document {
  user: Types.ObjectId;
  notification: Types.ObjectId;
  createdAt: Date;
}

const notificationSchema: Schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  notification: {
    type: Types.ObjectId,
    ref: "Question",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Create model
export const Notification: Model<INotification> = model(
  "Notification",
  notificationSchema
);
