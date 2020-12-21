// módulos para configurar la app
const express = require("express");
const morgan = require("morgan");

// cargamos express para manejar las peticiones http
const app = express();

// Cargamos morgan Para ver por consola las consultas http que van llegando al servidor
app.use(morgan("dev"));

// para que entienda los datos en formato json
app.use(express.json());

//Cargar ficheros rutas
const usuarios = require("./routes/usuarios");
const auth = require("./routes/auth");
const productos = require("./routes/productos");

app.get("/", (req, res) => {
  res.json("bienvenido");
});

// Cargamos las rutas
app.use("/usuarios", usuarios);
app.use("/auth", auth);
app.use("/productos", productos);

module.exports = app;
