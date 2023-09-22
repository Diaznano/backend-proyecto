const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");
const { UserErrors } = require("../utils/errorsMessage");

const UserRole = {
  ADMIN: "Admin",
  OWNER: "Owner",
  CLIENT: "Client",
};

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: UserRole.CLIENT,
      validate: {
        isIn: {
          args: [Object.values(UserRole)],
          msg: UserErrors.InvalidRole,
        },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

module.exports = { User, UserRole };
