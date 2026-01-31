import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    appointment_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "cancelled",
        "confirmed",
        "completed"
      ),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    tableName: "Appointments",
    timestamps: true,
  }
);

export default Appointment;
