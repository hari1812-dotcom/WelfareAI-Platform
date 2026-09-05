import { Router } from 'express';
import { recommendSchemes, getAllSchemes } from '../controllers/schemeController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/recommend', authenticate, recommendSchemes);
router.get('/', authenticate, getAllSchemes);

export default router;
