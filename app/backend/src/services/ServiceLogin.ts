import * as bcrypt from 'bcryptjs';
import { Attributes, Model, ModelCtor, WhereAttributeHashValue } from 'sequelize';
// import SequelizeTeam from '../database/models/SequelizeTeam';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { ID } from '../Interfaces/ICRUDModel';
import JWT from '../utils/JWT';
import { IToken, ILogin } from '../Interfaces/IEntities';
import CustomError from '../utils/CustomError';

export default class LoginService<T extends Model> {
  protected model: ModelCtor<T>;
  constructor(protected jwtService = JWT, model: ModelCtor<T>) {
    this.model = model;
  }

  public async login(login: ILogin): Promise<ServiceMessage | IToken> {
    const { email, password } = login;
    const user = await this.model
      .findOne({ where: { email } as WhereAttributeHashValue<Attributes<T>[string]> });
    if (!user || !bcrypt.compareSync(password, user.toJSON().password)) {
      throw new CustomError('Ivalid email or password', 401);
    }
  }
}

// const readerService = new ReaderService(new ModelReader(SequelizeTeam));
// readerService.getAll().then((teams) => {
//   console.log(teams);
// });
