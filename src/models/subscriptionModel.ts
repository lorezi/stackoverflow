import { Types, Schema, Model, model } from 'mongoose';
import { Document } from 'mongoose';


export interface ISubscription extends Document {
    subscriber: Types.ObjectId,
    question: Types.ObjectId,
    channel: string,
    isActive: boolean
}

const subscriptionSchema:Schema = new Schema({
    subscriber: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: { 
        type:Types.ObjectId,
        ref: 'Question',
        required: true
    },
    channel: {
        type: String,
        required: true,
    },
    isActive: {
        type:Boolean,
        default: true
    }
})

export const Subscription: Model<ISubscription> = model('Subscription', subscriptionSchema)