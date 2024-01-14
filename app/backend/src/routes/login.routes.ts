import { Request, Router, Response } from 'express';
import SequelizeUser from '../database/models/SequelizeUser';
import LoginController from '../controllers/ControllerLogin';
import ServiceLogin from '../services/ServiceLogin';
import JWT from '../utils/JWT';

const loginService = new ServiceLogin(JWT, SequelizeUser);
const loginController = new LoginController(loginService);

const router = Router();

router.post('/', (req: Request, res: Response) => loginController.login(req, res));

export default router;
