import { Request, Response, NextFunction } from 'express';


export const homeController = (_req:Request, res:Response, _next:NextFunction) => {
   
    res.status(200).json({message: "Express with typescript setup 😀"})
}