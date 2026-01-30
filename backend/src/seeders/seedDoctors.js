import User from '../models/User.js';
import bcrypt from 'bcrypt';

const seedDoctors = async () => {
  try {
    const count = await User.count();
    if (count === 0) {
        const passwordHash = await bcrypt.hash('123456', 10); 
        
        await User.bulkCreate([
            {
          first_name: 'Ahmed',
          last_name: 'Al Ahmed',
          email: 'ahmed@example.com',
          password: passwordHash,
          role: 'Doctor',
          specialty: 'Orthodontics',
          specialty_slug: 'orthodontics',
          bio: 'Dr. Ahmed, specialist in braces and orthodontics.',
          image: '/images/doc1.png',
        },
        {
          first_name: 'Nour',
          last_name: 'Al Ahmed',
          email: 'nour@example.com',
          password: passwordHash,
          role: 'Doctor',
          specialty: 'Pediatric Dentistry',
          specialty_slug: 'pediatric_dentistry',
          bio: 'Dr. Nour, pediatric dentistry expert.',
          image: '/images/doc2.png',
        },
        {
          first_name: 'Ali',
          last_name: 'Al Ahmed',
          email: 'ali@example.com',
          password: passwordHash,
          role: 'Doctor',
          specialty: 'Endodontics',
          specialty_slug: 'endodontics',
          bio: 'Dr. Ali, root canal specialist.',
          image: '/images/doc3.png'
        },
        ]);
      console.log('Doctors seeded successfully!');
    }
  } catch (err) {
    console.error('Error seeding doctors:', err);
  }
};

export default seedDoctors;