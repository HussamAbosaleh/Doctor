import User from '../models/User';

//getMyServices هي دالة لجلب كل الخدمات الخاصة بالدكتور المسجل دخول
exports.getMyServices = async (req, res) => {
  try {
    const doctorId = req.user.id; 
//getMyServices ليش استخدمتا وماهي req.user.id ? عشان اخذ معرف الدكتور من التوكن اللي هو مسجل دخول  
    const services = await Service.findAll({
      where: { doctor_id: doctorId }
    });
//findAll هي دالة لجلب كل السجلات اللي بتطابق الشرط المعطى و لان الطبيب يمكن ان يكون عنده اكثر من خدمة
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
 //res.json(services) ليش استخدمتا وماهي res.json ? عشان نرسل البيانات المسترجعة من قاعدة البيانات الى العميل بصيغة JSON