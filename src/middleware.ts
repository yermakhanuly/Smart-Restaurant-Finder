import { Request, Response, NextFunction } from 'express';

// Extend Request type
declare global {
  namespace Express {
    interface Request {
      user?: { patientId: string };
    }
  }
}

export const mockAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  req.user = { patientId: token };

  next();
};
