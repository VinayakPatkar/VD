import { NextFunction,Request,Response } from "express";
export const notFound = ( req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        success: false,
        message: "API URL does not exist"
    });
};

export const developmentError = ( error: Error, req: Request, res: Response, next: NextFunction ) => {
    error.stack = error.stack || '';
    const errorDetails = {
        message: error.message,
        status: error.status,
        stackHighlighted: error.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi,'<mark>$&</mark>')
    }
    return res.status(500).json({
        success: false,
        message: error.message,
        error: error
    })
}
export const productionError = ( error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
        success: false,
        message: error.message,
        error: error
    })
}