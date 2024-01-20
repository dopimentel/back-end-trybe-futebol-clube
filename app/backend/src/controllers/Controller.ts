import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import ServiceReader from '../services/Service';
import { IOptions } from '../Interfaces/IOptions';

export default class Controller<T> {
  constructor(
    private serviceReader: ServiceReader <T>,
    protected options?: IOptions<T>,
  ) { }

  public async getAll(req: Request, res: Response) {
    if (req.query.inProgress) {
      const { inProgress } = req.query;
      const filter = {
        ...this.options,
        where: { inProgress: inProgress === 'true' },
      } as unknown as IOptions<T>;
      const serviceResponse = await this.serviceReader
        .getAll(filter);

      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    const serviceResponse = await this.serviceReader
      .getAll(this.options as IOptions<T>);

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.serviceReader.getById(Number(id));

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.serviceReader.finishMatch(Number(id));

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.serviceReader.update(Number(id), req.body);

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async create(req: Request, res: Response) {
    const serviceResponse = await this.serviceReader.createMatch(req.body);

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

// if (req.query.inProgress) {
//       console.log(req.query.inProgress);
//       console.log(req.query.inProgress === 'true');
//       const { inProgress } = req.query;
//       this.options = {
//         where: { inProgress: inProgress === 'true' } as unknown as WhereOptions<Attributes<T>>,
//       };
//   const serviceResponse = await this.serviceReader
//     .getAll(this.options);

//   return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
// }
