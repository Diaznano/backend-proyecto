const { User, UserRole } = require("../models/User");
const bcrypt = require("bcrypt");
const { validateUserFields } = require("../utils/userValidation");
const { GenericErrors } = require("../utils/errorsMessage");

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  let roleUser = role;
  if (!role) roleUser = UserRole.CLIENT;
  const validationErrors = validateUserFields(name, email, password, roleUser);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword, roleUser });
    delete newUser.dataValues.password;
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: GenericErrors.ServerError });
  }
};
