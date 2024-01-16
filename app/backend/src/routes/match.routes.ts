import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validations';
import SequelizeMatch from '../database/models/SequelizeMatch';
import ReaderModel from '../models/ModelReader';
import ReaderService from '../services/ServiceReader';
import ReaderController from '../controllers/ControllerReader';
import SequelizeTeam from '../database/models/SequelizeTeam';

const allMatches = {
  include: [
    {
      model: SequelizeTeam,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      model: SequelizeTeam,
      as: 'awayTeam',
      attributes: ['teamName'],
    },
  ],
};

const matchesReaderModel = new ReaderModel(SequelizeMatch);
const matchesReaderService = new ReaderService(matchesReaderModel, 'Match');
const matchesReaderController = new ReaderController(matchesReaderService, allMatches);

const router = Router();

router.get('/', (req: Request, res: Response) => matchesReaderController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => matchesReaderController.getById(req, res));
router.post(
  '/',
  Validations.auth,
  Validations.validateMatch,
  (req: Request, res: Response) => matchesReaderController.create(req, res),
);
router.patch(
  '/:id',
  Validations.auth,
  (req: Request, res: Response) => matchesReaderController.update(req, res),
);
router.patch(
  '/:id/finish',
  Validations.auth,
  (req: Request, res: Response) => matchesReaderController.finishMatch(req, res),
);

export default router;
