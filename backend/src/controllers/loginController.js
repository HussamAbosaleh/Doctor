import jwt from 'jsonwebtoken';
import { secret, expiresIn } from '../config/jwt.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
//bcryptليش نستخدمها؟لأنها بتساعدنا نحفظ الباسورد بشكل مشفر في الداتابيز بدل ما نخزنه نص عادي
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
// بنبحث عن اليوزر في الداتابيز بناءً على الايميل المدخل
    const user = await User.findOne({ where: { email } });
    const isMatch = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
// لو اليوزر موجود وكلمة السر صحيحة، بننشئ توكن جديد باستخدام jsonwebtoken
    const token = jwt.sign(
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
      },
      secret,
      { expiresIn }
    );

    res.json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR: ", error);
    res.status(500).json({ message: 'Server error' });
  }
};