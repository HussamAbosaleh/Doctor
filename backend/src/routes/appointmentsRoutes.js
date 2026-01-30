import express from "express";
import { getAvailableAppointments, bookAppointment, getMyAppointments, updateAppointmentStatus,getMyCompletedBookings } from "../controllers/appointmentsController.js";
import authToken from "../middlewares/authToken.js"; 


const router = express.Router();

// جلب الأوقات المتاحة
router.get("/available", authToken, getAvailableAppointments);

// حجز موعد
router.post("/", authToken, bookAppointment);


// جلب مواعيد المرضى لصفحة الطبيب
router.get('/my', authToken, getMyAppointments)
// تغيير حالة موعد المريض من قبل الطبيب
router.put('/:id/status', authToken, updateAppointmentStatus)

router.get("/my/completed", authToken, getMyCompletedBookings);

export default router;
