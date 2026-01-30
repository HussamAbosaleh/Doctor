import User from '../models/User.js';
import Service from '../models/Service.js'
import Appointment from '../models/Appointment.js';
import Review from '../models/Review.js';

// علاقة دكتور → خدمات (One-to-Many)
User.hasMany(Service, { foreignKey: 'doctor_id', as: 'services' });
Service.belongsTo(User, { foreignKey: 'doctor_id', as: 'doctor' });

//ليش استخدمت as ؟ عشان اعرف اعمل جلب للعلاقة بسهولة

// علاقة دكتور → حجوزات (One-to-Many)
User.hasMany(Appointment, {foreignKey: "doctor_id",as: "doctorAppointments"});
Appointment.belongsTo(User, {foreignKey: "doctor_id",as: "doctor",});

// علاقة مريض → حجوزات (One-to-Many)
User.hasMany(Appointment, {foreignKey: "patient_id",as: "patientAppointments",});
Appointment.belongsTo(User, {foreignKey: "patient_id",as: "patient",});

// علاقة خدمة → حجوزات (One-to-Many)
Service.hasMany(Appointment, {foreignKey: "service_id",});
Appointment.belongsTo(Service, {foreignKey: "service_id",});

// علاقة مراجعات → دكتور/خدمة
// User.hasMany(Review, { foreignKey: 'doctor_id', as: 'reviews' });
// Review.belongsTo(User, { foreignKey: 'doctor_id', as: 'doctor' });

//Reviews 
Review.belongsTo(Appointment,{foreignKey:"booking-id"});
Appointment.hasMany(Review,{foreignKey:"booking-id"});
User.hasMany(Review, { foreignKey: "patient_id", as: "PatientReviews" });
Review.belongsTo(User, { foreignKey: "patient_id", as: "Patient" });

// Service.hasMany(Review, { foreignKey: 'service_id', as: 'serviceReviews' });
// Review.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });

export default function initRelations() {
}