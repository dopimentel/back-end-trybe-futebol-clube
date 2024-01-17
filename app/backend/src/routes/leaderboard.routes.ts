import { Request, Router, Response } from 'express';
import SequelizeMatch from '../database/models/SequelizeMatch';
import ReaderModel from '../models/ModelReader';
import ServiceLeadboard from '../services/ServiceLeadboard';

// const allMatches = {
//   include: [
//     {
//       model: SequelizeTeam,
//       as: 'homeTeam',
//       attributes: ['teamName'],
//     },
//     {
//       model: SequelizeTeam,
//       as: 'awayTeam',
//       attributes: ['teamName'],
//     },
//   ],
// };

// const matchesReaderModel = new ReaderModel(SequelizeMatch);
// const matchesReaderService = new ReaderService(matchesReaderModel, 'Match');
// const matchesReaderController = new ReaderController(matchesReaderService, allMatches);

const leadboard = new ServiceLeadboard(new ReaderModel(SequelizeMatch));
// const lead = leadboard.getAllTeamsMatches();
const router = Router();

router.get('/home', async (req: Request, res: Response) => {
  const result = await leadboard.getAll();
  res.status(200).json(result);
});

export default router;
