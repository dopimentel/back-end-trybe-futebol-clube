import { Request, Router, Response } from 'express';
import SequelizeUser from '../database/models/SequelizeUser';
import LoginController from '../controllers/ControllerLogin';
import LoginService from '../services/ServiceLogin';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';
import ReaderModel from '../models/ModelReader';

const loginModel = new ReaderModel(SequelizeUser);
const loginService = new LoginService(JWT, loginModel);
const loginController = new LoginController(loginService);

const router = Router();

router.post('/', Validations
  .validateLogin, (req: Request, res: Response) => loginController.login(req, res));

router.get('/role', Validations
  .auth, (req: Request, res: Response) => loginController.role(req, res));

export default router;
