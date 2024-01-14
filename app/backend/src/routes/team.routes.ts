import { Request, Router, Response } from 'express';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ReaderModel from '../models/ModelReader';
import ReaderService from '../services/ServiceReader';
import ReaderController from '../controllers/ReaderController';

const teamsReaderModel = new ReaderModel(SequelizeTeam);
const teamsReaderService = new ReaderService(teamsReaderModel, 'Team');
const teamsReaderController = new ReaderController(teamsReaderService);

const router = Router();

router.get('/', (req: Request, res: Response) => teamsReaderController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => teamsReaderController.getById(req, res));

export default router;
