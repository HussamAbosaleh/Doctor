export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Appointments", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    doctor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    patient_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    service_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Services",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    appointment_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    appointment_time: {
      type: Sequelize.TIME,
      allowNull: false,
    },

    status: {
      type: Sequelize.ENUM(
        "pending",
        "cancelled",
        "confirmed",
        "completed"
      ),
      allowNull: false,
      defaultValue: "pending",
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("Appointments");
}