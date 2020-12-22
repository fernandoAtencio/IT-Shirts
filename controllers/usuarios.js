const Usuarios = require("./../models/Usuarios");
const Roles = require("./../models/Roles");

const crearUsuarios = async (req, res) => {
  try {
    const { nombre, email, password, roles } = req.body;

    const rolesEncontrados = await Roles.find({ nombre: { $in: roles } });

    // creando un nuevo usuario
    const usuario = new Usuarios({
      nombre,
      email,
      password: await Usuarios.encriptarPassword(password), // guardamos la password ya encriptada
      roles: rolesEncontrados.map((rol) => rol._id),
    });

    // Guardando el nuevo usuario
    const usuarioGuardado = await usuario.save();

    return res.status(200).json({
      _id: usuarioGuardado._id,
      nombre: usuarioGuardado.nombre,
      email: usuarioGuardado.email,
      roles: usuarioGuardado.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { crearUsuarios };
