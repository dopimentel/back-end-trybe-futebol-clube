import { Request, Router, Response } from 'express';
import SequelizeMatch from '../database/models/SequelizeMatch';
import ReaderModel from '../models/ModelReader';
import ReaderService from '../services/ServiceReader';
import ReaderController from '../controllers/ControllerReader';

const matchesReaderModel = new ReaderModel(SequelizeMatch);
const matchesReaderService = new ReaderService(matchesReaderModel, 'Match');
const matchesReaderController = new ReaderController(matchesReaderService);

const router = Router();

router.get('/', (req: Request, res: Response) => matchesReaderController.getAll(req, res));

export default router;
