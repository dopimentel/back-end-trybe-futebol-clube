import { ICRUDModelReader } from '../Interfaces';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class SequelizeModel<T extends ICRUDModelReader<T>> {
  protected model: SequelizeTeam;
  constructor(model: SequelizeTeam) {
    this.model = SequelizeTeam;
  }
  this.model = SequelizeTeam;

  async findAll(): Promise<T[]> {
    const entities = (await this.model.findAll()).map(({ dataValues }) => ({ ...dataValues }));
    return entities;
  }

  async findById(id) {
    const entity = await this.model.findByPk(id);
    return entity ? { ...entity.dataValues } : null;
  }
}

// export default class SequelizeModel {
// }
