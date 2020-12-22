// módulos para configurar la app
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const pkgjson = require("./package.json");
const dotenv = require("dotenv");
dotenv.config();

// cargamos express para manejar las peticiones http
const app = express();

const corsOptions = {
  // origin: "http://localhost:3000",
}
// para poder despues comunicar este backend con el frontend. El back en un puerto de un servidor se comunica con el servidor de un front en otro puerto
app.use(cors(corsOptions));

// Para parsear las requests de content-type - application/json
app.use(bodyParser.json());
// Para parsear las requests de content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Cargar ficheros rutas
const usuarios = require("./routes/usuarios");
const auth = require("./routes/auth");
const productos = require("./routes/productos");

const { crearRol, crearAdmin } = require("./utils/initialSetup");

// Creamos los roles y el administrador por defecto
crearRol();
crearAdmin();

// Configuración
app.set("pkg", pkgjson);
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);
// para que entienda los datos en formato json
app.use(express.json());

// Middlewares
// Para roteger la aplicación de algunas vulnerabilidades web conocidas mediante el establecimiento correcto de cabeceras HTTP.
app.use(helmet());
// Cargamos morgan Para ver por consola las consultas http que van llegando al servidor
app.use(morgan("dev"));

// página Home
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenidos a IT-Shirts!",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});


// Cargamos las rutas
app.use("/api/usuarios", usuarios);
app.use("/api/auth", auth);
app.use("/api/productos", productos);

module.exports = app;
