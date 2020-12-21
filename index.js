// iniciamos el servidor
const app = require("./app");
const mongoose = require("./utils/db");

app.listen(3000);
console.log("El servidor está escuchando en el puerto", 3000);
