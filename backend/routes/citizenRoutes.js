import { Router } from 'express';
import {
  registerCitizen,
  getCitizens,
  getCitizenById,
  updateCitizen,
  deleteCitizen,
} from '../controllers/citizenController.js';

const router = Router();

router.post('/', registerCitizen);
router.get('/', getCitizens);
router.get('/:id', getCitizenById);
router.put('/:id', updateCitizen);
router.delete('/:id', deleteCitizen);

export default router;
