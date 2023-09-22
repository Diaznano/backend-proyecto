// userValidation.js
const { UserRole } = require("../models/User");
const { UserErrors } = require("./errorsMessage");

function validateUserFields(name, email, password, role) {
  const errors = [];
  if (!name) {
    errors.push(UserErrors.NameRequired);
  }
  if (!email) {
    errors.push(UserErrors.EmailRequired);
  }
  if (!password) {
    errors.push(UserErrors.PasswordRequired);
  }

  if (!Object.values(UserRole).includes(role)) {
    errors.push(UserErrors.RoleWorng);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push(UserErrors.EmailInvalid);
  }

  if (password?.length < 6) {
    errors.push(UserErrors.PasswordInvalid);
  }

  return errors;
}

module.exports = {
  validateUserFields,
};
