import express from 'express';
import authToken from '../middlewares/authToken.js';
import isDoctor from '../middlewares/isDoctor.js'
import { 
  getSpecialties,
  getMyServices, 
  createService, 
  updateService, 
  deleteService,
  getAllServices, 
  getServicesBySpecialty,
  getServicesByDoctorId
} from '../controllers/serviceController.js';

const router = express.Router();

// لجميع المستخدمين (غير محمي)
//للقائمة تبع الخدمات
router.get("/specialties", getSpecialties);

// GET /api/services → كل الخدمات
router.get('/', getAllServices);

// GET /api/services/by-specialty → جلب الخدمات حسب specialty
router.get('/by-specialty', getServicesBySpecialty);


router.get('/doctor/:doctorId', getServicesByDoctorId);

// حماية الروتس للطبيب
router.use(authToken);
router.use(isDoctor);

// GET /api/services/my → جلب كل خدمات الطبيب
router.get('/my', getMyServices);

// POST /api/services → إنشاء شخدمة جديدة
router.post('/', createService);

// PUT /api/services/:id → تعديل خدمة
router.put('/:id', updateService);

// DELETE /api/services/:id → حذف خدمة
router.delete('/:id', deleteService);

export default router;
