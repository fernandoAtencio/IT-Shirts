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

const obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuarios.find();
    res.json(usuarios);
  };
  const obtenerUsuariosPorID = async (req, res) => {
    const { usuariosID } = req.params;
    const usuario = await Usuarios.findById(usuariosID);
    res.status(200).json(usuario);

  }
const actualizarUsuariosPorID = async (req, res) => {
  const { usuariosID } = req.params;
  const usuarioActualizado = await Usuarios.findByIdAndUpdate(
    usuariosID,
    req.body,
    { new: true }
  );
  res.status(200).json(usuarioActualizado);
};
const borrarUsuariosPorID = async (req, res) => {
  const { usuariosID } = req.params;
  await Usuarios.findByIdAndDelete(usuariosID);
  res.status(200).json();
};




module.exports = { crearUsuarios, obtenerUsuarios, obtenerUsuariosPorID, actualizarUsuariosPorID, borrarUsuariosPorID };
