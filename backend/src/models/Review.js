import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Review = sequelize.define("Review", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  booking_id: { type: DataTypes.INTEGER, allowNull: false },

  doctor_id: { type: DataTypes.INTEGER, allowNull: false },

  patient_id: { type: DataTypes.INTEGER, allowNull: false },

  rating: { type: DataTypes.INTEGER, allowNull: false },

  comment: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: "Reviews",
  timestamps: true,
});

export default Review;