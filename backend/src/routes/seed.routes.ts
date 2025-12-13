import express from 'express';
import { seedDatabase } from '../controllers/seed.controller';

const router = express.Router();

router.get('/seed', seedDatabase);

export default router;
