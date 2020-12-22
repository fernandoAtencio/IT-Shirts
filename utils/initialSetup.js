const Usuarios = require("./../models/Usuarios");
const Roles = require("./../models/Roles");
const bcrypt = require("bcryptjs");

// para iniciar a los usuarios con un rol usuario por defecto
const crearRol = async () => {
  try {
    // Contador de roles
    const contador = await Roles.estimatedDocumentCount();

    // comprobar si existen roles
    if (contador > 0) return;

    // Crear los roles por defecto
    const valores = await Promise.all([
      new Roles({ nombre: "usuario" }).save(),
      new Roles({ nombre: "moderador" }).save(),
      new Roles({ nombre: "admin" }).save(),
    ]);

    console.log(valores);
  } catch (e) {
    console.error(e);
  }
};
// para crear un Admin por defecto
const crearAdmin = async () => {
    // verificar si ya existe un admin
    const usuario = await Usuarios.findOne({ email: process.env.MAIL_ADMIN });
    // obtener el id de roles
    const roles = await Roles.find({ nombre: { $in: ["admin", "moderador"] } });
  
    if (!usuario) {
      // crear un usuario administrador
      await Usuarios.create({
        nombre: "admin",
        email: process.env.MAIL_ADMIN,
        password: await bcrypt.hash(process.env.MAIL_PASSWORD, 10),
        roles: roles.map((rol) => rol._id),
      });
      console.log('Administrador creado!')
    }
  };

module.exports = { crearRol, crearAdmin };
