import app from './app.js';
import { env } from './config/env.js';


import initRelations from './config/relation.js';
import seedServices from './seeders/seedServices.js';
import seedDoctors from './seeders/seedDoctors.js';


import User from './models/User.js';
import Service from './models/Service.js';

initRelations();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
};

startServer();
