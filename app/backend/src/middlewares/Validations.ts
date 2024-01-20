import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';
import { Payload } from '../Interfaces/IEntities';

export interface IAuthRequest extends Request {
  user?: Payload;
}

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

  static async auth(req: IAuthRequest, res: Response, next: NextFunction):
  Promise<Response | void> {
    if (!req.headers.authorization) return res.status(401).json({ message: 'Token not found' });
    const token = Validations.extractToken(req.headers.authorization);
    const decoded = JWT.verify(token) as Payload | string;
    if (decoded === TOKEN_NOT_VALID) {
      return res.status(401).json({ message: TOKEN_NOT_VALID });
    }
    req.user = decoded as Payload;

    next();
  }

  static validateMatch(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}

export default Validations;
