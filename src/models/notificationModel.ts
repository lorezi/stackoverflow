import { Types, Document, Schema, Model, model } from "mongoose";


export interface INotification extends Document{
    user: Types.ObjectId,
    notification: Types.ObjectId
}

const notificationSchema: Schema = new Schema({
    user: {
        type:Types.ObjectId,
        ref: 'User',
        required: true,
    },
    notification:{
        type:Types.ObjectId,
        ref: 'Question',
        required: true
    }
})



// Create model
export const Notification: Model<INotification> = model('Notification', notificationSchema)