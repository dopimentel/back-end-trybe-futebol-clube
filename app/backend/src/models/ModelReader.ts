import { Model, ModelCtor } from 'sequelize';
// import SequelizeTeam from '../database/models/SequelizeTeam';
import { ICRUDModelReader, ID } from '../Interfaces/ICRUDModel';

export default class ModelReader <T extends Model> implements ICRUDModelReader<T> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  public async findAll(): Promise<T[]> {
    const data = (await this.model.findAll()).map(({ dataValues }) => ({ ...dataValues }));
    return data as T[];
  }

  public async findById(id: ID): Promise<T | null> {
    const data = await this.model.findByPk(id);
    return data ? { ...data.dataValues } as T : null;
  }
}
// const teamModel = new ModelReader(SequelizeTeam);
// teamModel.findById(1).then((teams) => {
//   console.log(teams);
// });
