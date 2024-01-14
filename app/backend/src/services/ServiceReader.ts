import { Model } from 'sequelize';
// import SequelizeTeam from '../database/models/SequelizeTeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ModelReader from '../models/ModelReader';
import { ID } from '../Interfaces/ICRUDModel';

export default class ReaderService<T extends Model> {
  constructor(protected modelReader: ModelReader<T>, protected item: string = 'Item') { }

  public async getAll(): Promise<ServiceResponse<T[]>> {
    const data = await this.modelReader.findAll();
    return { status: 'SUCCESSFUL', data };
  }

  public async getById(id: ID): Promise<ServiceResponse<T>> {
    const data = await this.modelReader.findById(id);
    if (!data) {
      return { status: 'NOT_FOUND', data: { message: `${this.item} with id ${id} not found` } };
    }
    return { status: 'SUCCESSFUL', data } as ServiceResponse<T>;
  }
}

// const readerService = new ReaderService(new ModelReader(SequelizeTeam));
// readerService.getAll().then((teams) => {
//   console.log(teams);
// });
