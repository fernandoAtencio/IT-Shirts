// iniciamos el servidor
const app = require("./app");
require("./utils/db");

app.listen(app.get("port"));
console.log("El servidor está corriendo en el puerto", app.get("port"));
