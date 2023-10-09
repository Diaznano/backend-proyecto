const UserErrors = {
  UserNotFound: "Usuario no encontrado.",
  InvalidCredentials: "Credenciales inválidas.",
  InvalidRole: "Rol de usuario no válido",
  NameRequired: "El campo 'name' es obligatorio.",
  EmailRequired: "El campo 'email' es obligatorio.",
  PasswordRequired: "El campo 'password' es obligatorio.",
  RoleWorng: "Rol de usuario no válido.",
  EmailInvalid: "Formato de correo electrónico inválido.",
  PasswordInvalid: "La contraseña debe tener al menos 6 caracteres.",
  MissingCredentials: "Los datos son incorrectos",
  UserDisabled: "Usuario desactivado.",
};

const ProductErrors = {
  ProductRequired: "Todos los campos son obligatorios.",
  NumberPositive: "El precio debe ser un número positivo.",
  CategoryInvalid: "Categoría no válida.",
  StockPositive: "El stock debe ser un número no negativo.",
  ProductNotFound: "Producto no encontrado",
};

const DataBaseErrors = {
  DatabaseError: "Error de la base de datos.",
};

const GenericErrors = {
  ValidationError: "Error de validación.",
  RolDenied: "Acceso no autorizado.",
  ServerError: "Error interno del servidor"
};

const TokenErrors = {
  TokenNotFound: "Token de autenticación no proporcionado",
  TokenInvalid: "Token de autenticación no válido",
};

module.exports = { UserErrors, DataBaseErrors, GenericErrors, TokenErrors, ProductErrors };
