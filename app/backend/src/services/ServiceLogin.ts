import * as bcrypt from 'bcryptjs';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { IToken, ILogin, IUser } from '../Interfaces/IEntities';
import CustomError from '../utils/CustomError';
import CRUDModel from '../models/CRUDModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class ServiceLogin {
  constructor(protected jwtService = JWT, protected model = new CRUDModel(SequelizeUser)) {
  }

  public async login(login: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.model.findByEmail(login.email) as unknown as IUser;
    if (!user || !bcrypt.compareSync(login.password, user.password)) {
      throw new CustomError('Invalid email or password', 401);
    }
    const { email, role } = user;
    const payload = { email, role };
    const token = this.jwtService.sign(payload);
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async role(email: string): Promise<ServiceResponse<ServiceMessage>> {
    const user = await this.model.findByEmail(email) as unknown as IUser;
    if (!user) {
      throw new CustomError('Token must be a valid token', 401);
    }
    const { role } = user;
    return { status: 'SUCCESSFUL', data: { role } };
  }
}
