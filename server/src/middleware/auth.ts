import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }

    const decoded = payload as JwtPayload;
    req.user = { username: decoded.username };
    return next();
  });
  return;
};