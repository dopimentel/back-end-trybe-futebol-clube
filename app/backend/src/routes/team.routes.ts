import { Request, Router, Response } from 'express';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ReaderModel from '../models/ModelReader';
import ReaderService from '../services/ServiceReader';
import ReaderController from '../controllers/ControllerReader';
import SequelizeUser from '../database/models/SequelizeUser';
import LoginController from '../controllers/ControllerLogin';
import ServiceLogin from '../services/ServiceLogin';
import JWT from '../utils/JWT';

const teamsReaderModel = new ReaderModel(SequelizeTeam);
const teamsReaderService = new ReaderService(teamsReaderModel, 'Team');
const teamsReaderController = new ReaderController(teamsReaderService);

const loginService = new ServiceLogin(JWT, SequelizeUser);
const loginController = new LoginController(loginService);

const router = Router();

router.get('/', (req: Request, res: Response) => teamsReaderController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => teamsReaderController.getById(req, res));
router.post('/login', (req: Request, res: Response) => loginController.login(req, res));

export default router;
