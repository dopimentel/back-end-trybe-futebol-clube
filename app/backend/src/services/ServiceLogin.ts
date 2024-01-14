import * as bcrypt from 'bcryptjs';
import { Attributes, Model, ModelCtor, WhereAttributeHashValue } from 'sequelize';
// import SequelizeTeam from '../database/models/SequelizeTeam';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { IToken, ILogin, IUser } from '../Interfaces/IEntities';
import CustomError from '../utils/CustomError';

export default class LoginService<T extends Model> {
  protected model: ModelCtor<T>;
  constructor(protected jwtService = JWT, model: ModelCtor<T>) {
    this.model = model;
  }

  public async login(login: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.model
      .findOne({ where: { email: login.email } as WhereAttributeHashValue<Attributes<T>[string]> });
    if (!user || !bcrypt.compareSync(login.password, user.toJSON().password)) {
      throw new CustomError('Invalid email or password', 401);
    }
    const { email, role } = user.toJSON() as IUser;
    const token = this.jwtService.sign({ email, role });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}

// const readerService = new ReaderService(new ModelReader(SequelizeTeam));
// readerService.getAll().then((teams) => {
//   console.log(teams);
// });
