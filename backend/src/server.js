import app from './app.js';
import { env } from './config/env.js';
import { testConnection } from './config/database.js';

import initRelations from './config/relation.js';
import seedServices from './seeders/seedServices.js';
import seedDoctors from './seeders/seedDoctors.js';


import User from './models/User.js';
import Service from './models/Service.js';

initRelations();

const PORT = env.port;
const startServer = async () => {
  await testConnection();

  await seedDoctors();
  await seedServices(); 

  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
};

startServer();
