import { Model, ModelCtor } from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { ICRUDModelCreator } from '../Interfaces/ICRUDModel';
// import SequelizeUser from '../database/models/SequelizeUser';
// import ModelReader from './ModelReader';

export default class ModelCreator <T extends Model> implements ICRUDModelCreator<T> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  public async create(data: Partial<T>): Promise<T> {
    const created = await this.model.create(data as MakeNullishOptional<T['_creationAttributes']>);
    return { ...created.dataValues } as T;
  }
}

// const readerModel = new ModelReader(SequelizeUser);
// readerModel.findById(1).then((teams) => {
//   console.log(teams);
// });

// const modelCreator = new ModelCreator(SequelizeUser);
// modelCreator.create({
//   username: 'John Doe', email: 'ddfdfd', role: 'teste', password: 'SDSDSD' }).then((user) => {
//   console.log(user);
// });
