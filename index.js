const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

// servidor de express
const app = express();

const { PORT } = process.env;

//Base de datos
dbConnection();

// CORS
app.use(cors({}));

// directorio publico
app.use(express.static("public"));
app.use(express.json());
// Rutas

// todo: auth
app.use("/api/auth", require("./routes/auth"));

// todo: CRUD
app.use("/api/events", require("./routes/events"));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
