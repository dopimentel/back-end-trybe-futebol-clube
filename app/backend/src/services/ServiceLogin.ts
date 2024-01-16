import * as bcrypt from 'bcryptjs';
import { Model } from 'sequelize';
// import SequelizeTeam from '../database/models/SequelizeTeam';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { IToken, ILogin, IUser } from '../Interfaces/IEntities';
import CustomError from '../utils/CustomError';
import ModelReader from '../models/ModelReader';

export default class LoginService<T extends Model> {
  constructor(protected jwtService = JWT, protected modelReader: ModelReader<T>) {
  }

  public async login(login: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.modelReader.findByEmail(login.email) as unknown as IUser;
    if (!user || !bcrypt.compareSync(login.password, user.password)) {
    // if (!user || login.password !== user.password) {
      throw new CustomError('Invalid email or password', 401);
    }
    const { email, role } = user;
    const payload = { email, role };
    const token = this.jwtService.sign(payload);
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async role(email: string): Promise<ServiceResponse<ServiceMessage | IUser>> {
    const user = await this.modelReader.findByEmail(email) as unknown as IUser;
    if (!user) {
      throw new CustomError('Token must be a valid token', 401);
    }
    const { role } = user;
    return { status: 'SUCCESSFUL', data: { role } };
  }
}

// const readerService = new ReaderService(new ModelReader(SequelizeTeam));
// readerService.getAll().then((teams) => {
//   console.log(teams);
// });
