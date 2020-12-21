const Usuarios = require("./../models/Usuarios");
const config = require("./../utils/config");
const jwt = require("jsonwebtoken");
const Roles = require("../models/Roles");

const login = async (req, res) => {
  const { email, password } = req.body;
  const usuarioEncontrado = await Usuarios.findOne({ email }).populate(
    "roles"
  ); // para que devuelva el objeto entero de roles
  if (!usuarioEncontrado)
    return res.status(400).json({ message: "Usuario no encontrado" });

  const verificarPassword = await Usuarios.compararPassword(
    password,
    usuarioEncontrado.password
  );
  if (!verificarPassword)
    return res
      .status(401)
      .json({ token: null, message: "Password incorrecto" });

  const token = await jwt.sign({ id: usuarioEncontrado._id }, config.SECRET, {
    expiresIn: 86400, // en 24 horas
  });
  console.log(usuarioEncontrado);
  res.json({ token });
};

const registro = async (req, res) => {
  // Obteniendo las propiedades del Body
  const { nombre, email, password, roles } = req.body;
  // creando el objeto Usuario
  const nuevoUsuario = new Usuarios({
    nombre,
    email,
    password: await Usuarios.encriptarPassword(password), // guardamos la password ya encriptada
  });
  // Comprobamos si existen roles para el nuevo usuario
  if (roles) {
    const encontrarRoles = await Roles.find({ nombre: { $in: roles } });
    nuevoUsuario.roles = encontrarRoles.map((rol) => rol._id);
    // Si no existen, le asignamos por defecto el rol de usuario
  } else {
    const rol = await Roles.findOne({ nombre: "usuario" });
    nuevoUsuario.roles = [rol._id];
  }

  // Guardando el objeto Usuario en Mongo
  const usuarioGuardado = await nuevoUsuario.save();
  console.log(usuarioGuardado);

  // Generando un token
  const token = jwt.sign({ id: usuarioGuardado._id }, config.SECRET, {
    expiresIn: 86400, // expira en 24 Hs
  });

  res.status(200).json({ token });
};

module.exports = {
  login,
  registro,
};
