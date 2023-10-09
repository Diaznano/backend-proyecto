const { User, UserRole } = require("../models/User");
const bcrypt = require("bcrypt");
const { validateUserFields } = require("../utils/userValidation");
const { GenericErrors, UserErrors } = require("../utils/errorsMessage");

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  let roleUser = role;
  if (!role) roleUser = UserRole.CLIENT;
  const validationErrors = validateUserFields({ name, email, password, role: roleUser });
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword, role: roleUser });
    delete newUser.dataValues.password;
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: GenericErrors.ServerError });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: GenericErrors.ServerError });
  }
};


exports.updateUser = async (req, res) => {
  const userId = req.params.id; 
  const { name, email, role, isActive } = req.body;
  let roleUser = role;
  if (!role) roleUser = UserRole.CLIENT;
  
  const validationErrors = validateUserFields({ name, email, role: roleUser, isUpdate: true });
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const user = await User.findByPk(userId, { attributes: { exclude: ["password"] } });

    if (!user) {
      return res.status(404).json({ message: UserErrors.UserNotFound });
    }

    
    user.name = name;
    user.email = email;
    user.role = roleUser;
    if (isActive !== null) {
      user.isActive = isActive;
    }
    console.log(user);
    
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: GenericErrors.ServerError });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: UserErrors.UserNotFound });
    }

    await user.destroy();

    res.json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ message: GenericErrors.ServerError });
  }
};
