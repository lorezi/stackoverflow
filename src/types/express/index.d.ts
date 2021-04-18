import { IUser } from '../../models/userModel';

declare module 'express-serve-static-core' {
    export interface Response {
        user?: IUser | null
    }

    export interface Request {
        user?: IUser | null
    }
}