import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const User = sequelize.define('User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 50],
      },
      set(value) {
        this.setDataValue('first_name', value.trim());
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 50],
      },
      set(value) {
        this.setDataValue('last_name', value.trim());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'unique_email',
        msg: 'The specified email address is already in use',
      },
      validate: {
        isEmail: true,
        notEmpty: true,
      },
      set(value) {
        this.setDataValue('email', value.toLowerCase().trim());
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^01[5-7]\d{8,10}$/,
          msg: 'Invalid phone number',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM('Doctor', 'Patient'),
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    specialty_slug: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
  },
  {
    tableName: 'Users',
    timestamps: true,
  }
);

export default User;
