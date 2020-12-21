// para iniciar a los usuarios con un rol usuario por defecto

const Roles = require("./../models/Roles");

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

module.exports = { crearRol };
