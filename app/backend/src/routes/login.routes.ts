import { Request, Router, Response } from 'express';
import ControllerLogin from '../controllers/ControllerLogin';
import Validations from '../middlewares/Validations';

const router = Router();
const controller = new ControllerLogin();

router.post('/', Validations
  .validateLogin, (req: Request, res: Response) => controller.login(req, res));

router.get('/role', Validations
  .auth, (req: Request, res: Response) => controller.role(req, res));

export default router;
