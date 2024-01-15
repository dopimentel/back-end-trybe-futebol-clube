import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  // static extractToken(bearerToken: string): string {
  //   return bearerToken.split(' ')[1];
  // }

  static async auth(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    // const token = Validations.extractToken(req.headers.authorization || '');
    const token = req.headers.authorization;

    if (!token) {
      return res.status(404).json({ message: 'Token not found' });
    }
    const decoded = await JWT.verify(token);
    if (decoded === 'Token must be a valid token') {
      return res.status(401).json({ message: decoded });
    }
    req.body.user = decoded as { email: string, role: string };

    next();
  }

  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const requiredKeys = ['email', 'password', 'name'];
    const notFoundKey = requiredKeys.find((key) => !(key in user));
    if (notFoundKey) {
      return res.status(400).json({ message: `${notFoundKey} is required` });
    }

    next();
  }
}

export default Validations;
