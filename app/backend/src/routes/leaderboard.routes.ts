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

router.get('/home', async (req: Request, res: Response) => controller.getLeaderboard(req, res));

export default router;
