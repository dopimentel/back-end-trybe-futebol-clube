import { Attributes, FindOptions, Model, ModelCtor, WhereOptions } from 'sequelize';
import { ICRUDModelReader, ID } from '../Interfaces/ICRUDModel';

export default class ModelReader <T extends Model> implements ICRUDModelReader<T> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  public async findAll(options?: FindOptions<Attributes<T>> | undefined): Promise<T[]> {
    const data = (await this.model
      .findAll(options)).map(({ dataValues }) => ({ ...dataValues }));
    return data as T[];
  }

  public async findById(id: ID): Promise<T | null> {
    const data = await this.model.findByPk(id);
    return data ? { ...data.dataValues } as T : null;
  }

  public async findByEmail(email: string): Promise<T | null> {
    const data = await this.model
      .findOne({ where: { email } as unknown as WhereOptions<Attributes<T>> });
    return data ? { ...data.dataValues } as T : null;
  }
}
// const teamModel = new ModelReader(SequelizeTeam);
// teamModel.findById(1).then((teams) => {
//   console.log(teams);
// });
