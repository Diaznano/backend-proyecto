const bcrypt = require("bcrypt");
const { User } = require("./src/models/User");


const adminUser = {
  name: "Admin",
  email: "admin@admin.com",
  password: "Admin1234", 
  role: "Admin", 
};


async function createAdminUser() {
  try {
    
    const hashedPassword = await bcrypt.hash(adminUser.password, 10);

    
    await User.create({
      name: adminUser.name,
      email: adminUser.email,
      password: hashedPassword, 
      role: adminUser.role,
    });

    console.log("Usuario administrador creado exitosamente.");
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error);
  }
}


createAdminUser();
