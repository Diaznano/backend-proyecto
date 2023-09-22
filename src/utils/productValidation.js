// utils/productValidation.js
const { Category } = require("../models/Product");
const { ProductErrors } = require("./errorsMessage");

function validateProductFields(name, description, price, category, stock) {
  const errors = [];

  if (!name || !description || !price || !category || stock === undefined) {
    errors.push(ProductErrors.ProductRequired);
  }

  if (isNaN(price) || price <= 0) {
    errors.push(ProductErrors.NumberPositive);
  }

  if (!Object.values(Category).includes(category)) {
    errors.push(ProductErrors.CategoryInvalid);
  }

  if (isNaN(stock) || stock < 0) {
    errors.push(ProductErrors.StockPositive);
  }

  return errors;
}

module.exports = { validateProductFields };
