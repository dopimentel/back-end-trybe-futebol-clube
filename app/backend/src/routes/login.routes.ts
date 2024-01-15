import { Request, Router, Response } from 'express';
import SequelizeUser from '../database/models/SequelizeUser';
import LoginController from '../controllers/ControllerLogin';
import ServiceLogin from '../services/ServiceLogin';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';

const loginService = new ServiceLogin(JWT, SequelizeUser);
const loginController = new LoginController(loginService);

const router = Router();

router.post(
  '/',
  Validations.validateLogin,

  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;
