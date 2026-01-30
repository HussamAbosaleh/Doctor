import User from '../models/User.js';

export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: { role: 'Doctor' }, 
      attributes: [
        'id',
        'first_name',
        'last_name',
        'image',
        'specialty_slug',
        'bio'
      ]
    });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};

