import express from 'express';
const router = express.Router();

import {
  getAllServices,
  getSpecialties,
  getServicesBySpeciality,
  getServicesByDoctorId,
  getMyServices,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

import authToken from '../middlewares/authToken.js';
import isDoctor from '../middlewares/isDoctor.js';



// 🌍 routes عامة
router.get('/', getAllServices);
router.get('/specialities', getSpecialties);
router.get('/by-speciality', getServicesBySpeciality);
router.get('/doctor/:doctorId', getServicesByDoctorId);

// 🔐 routes محمية
router.use(authToken);
router.use(isDoctor);

router.get('/my', getMyServices);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
