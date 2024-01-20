import { Request, Router, Response } from 'express';
import SequelizeTeam from '../database/models/SequelizeTeam';
import CRUDModel from '../models/CRUDModel';
import Service from '../services/Service';
import Controller from '../controllers/Controller';

const model = new CRUDModel(SequelizeTeam);
const service = new Service(model, 'Team');
const controller = new Controller(service);

const router = Router();

router.get('/', (req: Request, res: Response) => controller.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => controller.getById(req, res));

export default router;
