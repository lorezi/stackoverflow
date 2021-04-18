import { INotification } from "./../models/notificationModel";
import { Types } from "mongoose";
import { IAnswer } from "./../models/answerModel";
import { ISubscription, Subscription } from "./../models/subscriptionModel";
import { Notification } from "../models/notificationModel";
import io from ".";

const getSubscribers = async (id: Types.ObjectId): Promise<ISubscription[]> => {
  const subscriptions = await Subscription.find({ question: id });
  return subscriptions;
};

const createNotification = async (data: INotification) => {
  const newNotification = await Notification.create({
    user: data.user,
    notification: data.notification,
  });
  return newNotification;
};

const notify = async (channel: string) => {
  io.on("connection", () => {
    io.to(channel).emit("notification", "New answer");
  });
};

export const notifyUsers = async (reply: IAnswer): Promise<void> => {
  const subscribers = await getSubscribers(reply.question);
  subscribers.map((el: ISubscription) => {
    const data: any = {
      user: el.subscriber,
      notification: el.question,
    };
    createNotification(data);
    notify(el.channel);
  });
};

export const subscription = (channel: string): void => {
  io.on("connection", (socket) => {
    socket.join(channel);
  });
};
