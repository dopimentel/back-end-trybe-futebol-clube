import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send('GET /matches');
});

export default router;
