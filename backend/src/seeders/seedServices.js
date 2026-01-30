import Service from '../models/Service.js';

const servicesData = [
  // Orthodontics
  { service_title: 'Traditional Braces', service_description: 'Correct teeth alignment with fixed braces', specialty: 'Orthodontics', specialty_slug: 'orthodontics', image: '/images/4.png', doctor_id: 1 },
  { service_title: 'Clear Aligners', service_description: 'Correct teeth using transparent aligners', specialty: 'Orthodontics', specialty_slug: 'orthodontics', image: '/images/5.png', doctor_id: 1 },
  { service_title: 'Accelerated Braces', service_description: 'Fast-track orthodontic solutions', specialty: 'Orthodontics', specialty_slug: 'orthodontics', image: '/images/6.png', doctor_id: 1 },

  // Pediatric Dentistry
  { service_title: 'Child Checkup', service_description: 'Routine checkup for children and early decay detection', specialty: 'Pediatric Dentistry', specialty_slug: 'pediatric_dentistry', image: '/images/7.png', doctor_id: 2 },
  { service_title: 'Local Anesthesia', service_description: 'Safe anesthesia for children during treatment', specialty: 'Pediatric Dentistry', specialty_slug: 'pediatric_dentistry', image: '/images/8.png', doctor_id: 2 },
  { service_title: 'Cavity Treatment', service_description: 'Decay removal and treatment for primary teeth', specialty: 'Pediatric Dentistry', specialty_slug: 'pediatric_dentistry', image: '/images/9.png', doctor_id: 2 },

  // Teeth Cleaning
  { service_title: 'Standard Cleaning', service_description: 'Comprehensive cleaning and plaque removal', specialty: 'Endodontics', specialty_slug: 'endodontics', image: '/images/1.png', doctor_id: 3 },
  { service_title: 'Teeth Polishing', service_description: 'Polishing teeth to remove surface stains', specialty: 'Endodontics', specialty_slug: 'endodontics', image: '/images/2.png', doctor_id: 3 },
  { service_title: 'Routine Checkup', service_description: 'Regular checkup and early problem detection', specialty: 'Endodontics', specialty_slug: 'endodontics', image: '/images/3.png', doctor_id: 3 },
];

const seedServices = async () => {
  try {
    const count = await Service.count();

    if (count > 0) {
      console.log("Services already seeded");
      return;
    }

      await Service.bulkCreate(servicesData); 
      console.log("Services seeded successfully!");
    }catch (err) {
    console.error('Error seeding services:', err);
    }
};

export default seedServices;