import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validations';
import SequelizeMatch from '../database/models/SequelizeMatch';
import CRUDModel from '../models/CRUDModel';
import ReaderService from '../services/Service';
import Controller from '../controllers/Controller';
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

const matchesReaderModel = new CRUDModel(SequelizeMatch);
const matchesReaderService = new ReaderService(matchesReaderModel, 'Match');
const matchesReaderController = new Controller(matchesReaderService, allMatches);

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
