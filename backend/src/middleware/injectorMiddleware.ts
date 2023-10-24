// backend/middleware/injectorMiddleware.ts
import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';

const injectorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.container = container; // Inject the container into the request
    next();
};

export default injectorMiddleware;