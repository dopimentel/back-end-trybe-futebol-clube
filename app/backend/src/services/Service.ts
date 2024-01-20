import { IOptions } from '../Interfaces/IOptions';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { ICRUDModel, ID } from '../Interfaces/ICRUDModel';

export default class Service<T> {
  constructor(
    protected model: ICRUDModel<T>,
    protected item: string = 'Item',
  ) {}

  public async getAll(options?: IOptions<T>): Promise<ServiceResponse<T[]>> {
    const data = await this.model.findAll(options);
    return { status: 'SUCCESSFUL', data };
  }

  public async getById(id: ID): Promise<ServiceResponse<T>> {
    const data = await this.model.findById(id);
    if (!data) {
      return {
        status: 'NOT_FOUND',
        data: { message: `${this.item} with id ${id} not found` },
      };
    }
    return { status: 'SUCCESSFUL', data } as ServiceResponse<T>;
  }

  public async finishMatch(id: ID): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.model.findById(id);
    if (!match) {
      return {
        status: 'NOT_FOUND',
        data: { message: `${this.item} with id ${id} not found` },
      };
    }
    await this.model.update(id, { inProgress: false } as unknown as Partial<T>);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async update(
    id: ID,
    data: Partial<T>,
  ): Promise<ServiceResponse<T>> {
    const item = await this.model.findById(id);
    if (!item) {
      return {
        status: 'NOT_FOUND',
        data: { message: `${this.item} with id ${id} not found` },
      };
    }
    const updated = await this.model.update(id, data);
    if (!updated) {
      return {
        status: 'NOT_FOUND',
        data: { message: `${this.item} with id ${id} not found` },
      };
    }
    return { status: 'SUCCESSFUL', data: updated } as ServiceResponse<T>;
  }

  public async createMatch(data: Partial<T>): Promise<ServiceResponse<T>> {
    try {
      const match = {
        ...data,
        inProgress: true,
      };
      const created = await this.model.create(match as unknown as T);
      return { status: 'CREATED', data: created } as ServiceResponse<T>;
    } catch (err) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }
  }
}
