import { Attributes, FindOptions, Model, ModelCtor, WhereOptions } from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { ICRUDModel, ID } from '../Interfaces/ICRUDModel';

export default class ModelReader <T extends Model> implements ICRUDModel<T> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  delete(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.model.destroy({ where: { id } as unknown as WhereOptions<Attributes<T>> })
        .then((deleted) => resolve(deleted))
        .catch((err) => reject(err));
    });
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

  public async update(id: ID, data: Partial<Attributes<T>>): Promise<T | null> {
    const updated = await this.model.update(
      data as Partial<Attributes<T>>,
      { where: { id } as unknown as WhereOptions<Attributes<T>> },
    );
    if (updated[0] === 0) return null;
    const newData = await this.model.findByPk(id);
    return newData ? { ...newData.dataValues } as T : null;
  }

  public async create(data: Partial<T>): Promise<T> {
    const created = await this.model.create(data as unknown as MakeNullishOptional<T>); // MakeNullishOptional<T['_creationAttributes']>
    return { ...created.dataValues } as T;
  }
}
// const teamModel = new ModelReader(SequelizeTeam);
// teamModel.findById(1).then((teams) => {
//   console.log(teams);
// });
