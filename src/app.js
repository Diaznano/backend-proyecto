const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./config/database");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Base de datos conectada y modelos sincronizados.");
  })
  .catch((error) => {
    console.error("Error al conectar y sincronizar la base de datos:", error);
  });

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  const error = new Error("Ruta no encontrada");
  res.status(404).json({ error: error.message });
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
