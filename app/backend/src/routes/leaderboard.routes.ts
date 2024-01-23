import { Request, Router, Response } from 'express';

import SequelizeMatch from '../database/models/SequelizeMatch';
import CRUDModel from '../models/CRUDModel';

import ModelLeaderboard from '../models/ModelLeaderboard';
import ServiceLeaderboard from '../services/ServiceLeaderboard';
import ControllerLeaderboard from '../controllers/ControllerLeaderboard';

const router = Router();

const modelCRUD = new CRUDModel(SequelizeMatch);
const model = new ModelLeaderboard<SequelizeMatch>(modelCRUD);
const service = new ServiceLeaderboard(model);
const controller = new ControllerLeaderboard(service);
const controllerHome = new ControllerLeaderboard(service, 'homeTeamId');
const controllerAway = new ControllerLeaderboard(service, 'awayTeamId');

router.get('/', async (req: Request, res: Response) => controller.getGlobalLeaderboard(req, res));
router.get('/home', async (req: Request, res: Response) => controllerHome.getLeaderboard(req, res));
router.get('/away', async (req: Request, res: Response) => controllerAway.getLeaderboard(req, res));

export default router;
