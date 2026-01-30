import { Sequelize } from 'sequelize';
import { env } from './env.js';
// evn الفصل بين الاعدادات متل اسم المستخدم وكلمة المرور

export const sequelize = new Sequelize(
  env.db.name,
  env.db.user,
  env.db.password,
  {
    host: env.db.host,
    port: env.db.port, 
    dialect: env.db.dialect,
  }
);
// الفرق بين authenticate و sync ان الاولى بتتأكد اذا في اتصال بين التطبيق وقاعدة البيانات
// والتانية بتتأكد اذا النماذج متزامنة مع قاعدة البيانات

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection established successfully.');
// await sync بتتأكد اذا النماذج متزامنة مع قاعدة البيانات
// await sequelize.sync({ alter: true }) بتتأكد اذا النماذج متزامنة مع قاعدة البيانات

    await sequelize.sync({ alter: true });
    console.log('All models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to PostgreSQL database:', error.message);
  }
};
