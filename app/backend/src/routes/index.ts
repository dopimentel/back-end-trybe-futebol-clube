import { Router } from 'express';
import teamRouter from './team.routes';
import loginRouter from './login.routes';
import matchRouter from './match.routes';

const router = Router();
router.use('/matches', matchRouter);
router.use('/login', loginRouter);
router.use('/teams', teamRouter);
export default router;
