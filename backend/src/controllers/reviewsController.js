import Review from "../models/Review.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

// إنشاء مراجعة
//createReview لإنشاء مراجعة جديدة من قبل المريض بعد إكمال الحجز
export const createReview = async (req, res) => {
  try {
    const { booking_id, rating, comment } = req.body;
    const patient_id = req.user.id;

  // await Appointment.findOne بنستخدمها عشان نتأكد إن الحجز موجود و مكتمل قبل إنشاء المراجعة
    const booking = await Appointment.findOne({
      where: { id: booking_id, patient_id, status: "completed" }
    });

    if (!booking)
      return res.status(400).json({ error: "Invalid booking" });

    const review = await Review.create({
      booking_id,
      doctor_id: booking.doctor_id,
      patient_id,
      rating,
      comment
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Submit failed" });
  }
};

// جلب مراجعات دكتور
export const getDoctorReviews = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const reviews = await Review.findAll({
      where: { doctor_id: doctorId },
      include: [
        { model: User, as: "Patient", attributes: ["first_name", "last_name"] }
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load reviews" });
  }
};
//include في جملة الاستعلام بنستخدمها عشان نجيب معلومات المريض المرتبط بكل مراجعة زي الاسم الأول واسم العائلة من جدول المستخدمين