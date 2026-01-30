import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, confirm_password, phone_number } = req.body;

    if (!first_name || !last_name || !email || !password || !confirm_password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone_number: phone_number || null,
      role: 'Patient'
    });

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role
      }
    });

  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
      return res.status(err.name === 'SequelizeUniqueConstraintError' ? 409 : 400).json({
        message: err.errors.map(e => e.message)
      });
    }

    console.error('REGISTER ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};