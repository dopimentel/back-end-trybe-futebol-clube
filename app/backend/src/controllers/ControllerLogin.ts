import { Request, Response } from 'express';
import { Payload } from '../Interfaces/IEntities';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import ServiceLogin from '../services/ServiceLogin';
import { IAuthRequest } from '../middlewares/Validations';

export default class ControllerLogin {
  constructor(
    private serviceLogin = new ServiceLogin(),
  ) { }

  public async login(req: Request, res: Response) {
    const serviceResponse = await this.serviceLogin.login(req.body);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async role(req: IAuthRequest, res: Response) {
    const { email } = req.user as Payload;
    const serviceResponse = await this.serviceLogin.role(email);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
