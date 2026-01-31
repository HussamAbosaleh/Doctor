import { DataTypes } from 'sequelize';
import  sequelize  from'../config/database.js';

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  service_title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  service_description: {
    type: DataTypes.TEXT
  },
  specialty: {                 
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  specialty_slug: {            
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Services',
  timestamps: true
});

export default Service;