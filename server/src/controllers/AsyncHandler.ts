import { Request, Response, NextFunction } from 'express';

export const AsyncHandler = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(next);
    };
};
