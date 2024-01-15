import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

const TOKEN_NOT_VALID = 'Token must be a valid token';
class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static extractToken(bearerToken: string): string {
    return bearerToken.split(' ')[1];
  }

  static async auth(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    if (!req.headers.authorization) return res.status(401).json({ message: 'Token not found' });
    const token = Validations.extractToken(req.headers.authorization);
    const decoded = await JWT.verify(token);
    if (decoded === TOKEN_NOT_VALID) {
      return res.status(401).json({ message: TOKEN_NOT_VALID });
    }

    req.body.user = decoded;

    next();
  }
}

export default Validations;
