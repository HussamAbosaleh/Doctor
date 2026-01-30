// لجلب الاوقات المتاحة
import { Op } from "sequelize";
import Appointment from "../models/Appointment.js";
import Service from "../models/Service.js";
import User from "../models/User.js";

// دوام الدكاترة
const START_HOUR = 9;
const END_HOUR = 17;

// ماهي generateTimeSlots? هي دالة لتوليد أوقات الحجز المتاحة بين دوام الدكاترة

// helper: توليد أوقات الحجز حسب دوام الدكتور
const generateTimeSlots = () => {
  const slots = [];
  for (let h = START_HOUR; h < END_HOUR; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
  }
  return slots;
};
//  ماهي getAvailableAppointments ? هي دالة لجلب الأوقات المتاحة للحجز لدكتور معين وخدمة معينة

// GET /appointments/available?doctor_id=1&service_id=2
export const getAvailableAppointments = async (req, res) => {
  try {
    const { doctor_id, service_id } = req.query;

    if (!doctor_id || !service_id) {
      return res.status(400).json({ error: "Doctor and service are required" });
    }

    // جدول الحجز موجود مسبقاً
    // نحصل على كل الحجوزات القادمة لنفس الدكتور والخدمة
    const appointments = await Appointment.findAll({
      where: {
        doctor_id,
        [Op.or]: [
          { doctor_id },
          { service_id }
        ],
        appointment_date: { [Op.gte]: new Date() }, // من اليوم فصاعداً
      },
    });

    // ليش استخدمتا وماهي Op.gte ؟
    // استخدمتا عشان اجيب الحجوزات اللي تاريخها اكبر من او يساوي تاريخ اليوم
    // Op.gte معناها "Greater Than or Equal" يعني "أكبر من أو يساوي"


    // ننظم الحجوزات حسب التاريخ والوقت
    const bookedMap = {}; // { '2026-01-26': ['09:00','10:00'] }
    appointments.forEach((a) => {
      const date = new Date(a.appointment_date).toISOString().split("T")[0];
      if (!bookedMap[date]) bookedMap[date] = [];
      bookedMap[date].push(a.appointment_time);
    });

     //  ليش استخدمتا وماهي bookedMap ? تحويل الحجوزات الى خريطة ليسهل الوصول اليها
    const available = [];
    // لنفترض 30 يوم قادم فقط للعرض
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];

      const slots = generateTimeSlots().filter(
        (time) => !bookedMap[dateStr]?.includes(time)
      );

      if (slots.length) {
        available.push({ date: dateStr, times: slots });
      }
    }

    return res.json(available);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//لانشاء الحجز
// POST /appointments
// body: { doctor_id, service_id, appointment_date, appointment_time }
// patient_id من التوكن
export const bookAppointment = async (req, res) => {
  try {
    const { doctor_id, service_id, appointment_date, appointment_time } = req.body;
    const patient_id = req.user.id;
    // ليش استخدمتا وماهي patient_id ? عشان اخذ معرف المريض من التوكن اللي هو مسجل دخول

    if (!doctor_id || !service_id || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: "All fields are required" });
    }
// ليش استخدمتا وماهي findOne ? عشان نتحقق اذا الوقت اللي بدو يحجزه المريض متاح او لا

    // نتحقق من التوافر مرة ثانية (أمان)
    const existing = await Appointment.findOne({
      where: {
        [Op.or]: [
          { doctor_id, appointment_date, appointment_time },
          { service_id, appointment_date, appointment_time }
        ],
      },
    });

    if (existing) {
      return res.status(400).json({ error: "This slot is already booked" });
    }
  
    const appointment = await Appointment.create({
      doctor_id,
      patient_id,
      service_id,
      appointment_date,
      appointment_time,
      status: "pending",
    });

    return res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// جلب حجوزات الدكتور
export const getMyAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const appointments = await Appointment.findAll({
      where: { doctor_id: doctorId },
      include: [
        {
          model: User,
          as: "patient",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Service,
          attributes: ["id", "service_title"],
        },
      ],
      order: [["appointment_date", "ASC"]],
    });

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// تعديل حالة الحجز
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const doctorId = req.user.id;

    const appointment = await Appointment.findOne({
      where: { id, doctor_id: doctorId },
    });

    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    res.json({ message: "Appointment status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update appointment" });
  }

};
// جلب حجوزات المريض المكتملة
export const getMyCompletedBookings = async (req, res) => {
  try {
    const patientId = req.user.id;

    const bookings = await Appointment.findAll({
      where: {
        patient_id: patientId,
        status: "completed"
      },
      include: [
        {
          model: User,
          as: "doctor",
          attributes: ["id", "first_name", "last_name"]
        },
        {
          model: Service,
          attributes: ["id", "service_title"]
        }
      ],
      order: [["appointment_date", "DESC"]],
    });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};