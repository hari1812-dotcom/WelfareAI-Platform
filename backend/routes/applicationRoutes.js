import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createApplication,
  listApplications,
  updateApplicationBenefit,
} from '../controllers/applicationController.js';

const router = Router();

router.use(authenticate);
router.get('/', listApplications);
router.post('/', createApplication);
router.patch('/:schemeId/benefit', updateApplicationBenefit);

export default router;
