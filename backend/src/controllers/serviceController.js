import { sequelize } from '../config/database.js';
import Service from '../models/Service.js';
import User from '../models/User.js';
import slugify from 'slugify';

//قائمة الخدمات بالهيدر
export const getSpecialties = async (req, res) => {
  try {
    const specialties = await User.findAll({
      where: { role: "Doctor" },
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('specialty_slug')), 'slug'],
        ['specialty', 'label'],
      ],
      raw : true,
    });

    res.json(specialties);
  } catch (err) {
      console.error('getSpecialties error:',err);
      res.status(500).json({ error: "Server error" });
    }
  };

// جلب كل الخدمات
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: {
        model: User,
        as: 'doctor',
        attributes: ['id', 'first_name', 'last_name']
      }
    });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// جلب كل خدمات الطبيب الحالي
export const getMyServices = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const services = await Service.findAll({
      where: { doctor_id: doctorId },
      include: {
        model: User,
        as: 'doctor',
        attributes: ['id', 'first_name', 'last_name']
      }
    });

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

//لعرض خدمات كل دكتور بصفحة الدكاترة
export const getServicesByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const services = await Service.findAll({
      where: { doctor_id: doctorId },
      attributes: [
        'id',
        'service_title',
        'service_description',
        'image'
      ]
    });

    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


// جلب حسب specialty
export const getServicesBySpecialty = async (req, res) => {
  try {
    const { specialty } = req.query;
    const services = await Service.findAll({
      where: { specialty_slug: specialty },
      include: {
        model: User,
        as: 'doctor',
        attributes: ['id', 'first_name', 'last_name']
      }
    });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// جلب كل الأطباء
export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: { role: 'Doctor' },
      attributes: ['id', 'first_name', 'last_name', 'specialty_slug', 'bio', 'image']
    });
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// إنشاء خدمة جديدة
export const createService = async (req, res) => {
  try {
    const doctor_id = req.user.id;
    const { service_title, service_description, image } = req.body;

    const doctorSpecialty = req.user.specialty;
    const doctorSpecialtySlug = slugify(doctorSpecialty, { lower: true });

    const newService = await Service.create({
      service_title,
      service_description : service_description || null,
      specialty : doctorSpecialty,
      specialty_slug : doctorSpecialtySlug,
      doctor_id,
      image
    });
    res.status(201).json(newService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// تعديل خدمة للطبيب الحالي
export const updateService = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const serviceId = req.params.id;
    const { service_title, service_description, image } = req.body;

    const service = await Service.findOne({ where: { id: serviceId, doctor_id: doctorId } });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    await service.update({ service_title, service_description : service_description || null, image });
    res.json(service);
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// حذف خدمة للطبيب الحالي
export const deleteService = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const serviceId = req.params.id;

    const service = await Service.findOne({ where: { id: serviceId, doctor_id: doctorId } });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    await service.destroy();
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ error: 'Server error' });
  }
};