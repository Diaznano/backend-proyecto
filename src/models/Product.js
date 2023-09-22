const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");

const Category = {
  HARDWARE: "Hardware",
  SOFTWARE: "Software",
  PERIFERICOS: "Periféricos",
  ACCESORIOS: "Accesorios",
};

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(Object.values(Category)),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

module.exports = { Product, Category };
