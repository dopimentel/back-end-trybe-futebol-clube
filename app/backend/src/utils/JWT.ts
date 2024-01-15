import { Secret, sign, SignOptions, verify } from 'jsonwebtoken';

type Payload = {
  email: string,
  role: string,
};
export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || '';

  private static jwtConfig: SignOptions = {
    expiresIn: '10d',
    algorithm: 'HS256',
  };

  static sign(payload: Payload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  static verify(token: string): Payload | string {
    try {
      return verify(token, this.secret) as Payload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
