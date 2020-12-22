const jwt = require("jsonwebtoken");
const Usuarios = require("../models/Usuarios");
const Roles = require("./../models/Roles");

// Para verificar que se está enviando un token
const verificarToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log(token);
    if (!token)
    return res
    .status(403)
    .json({ message: "No se ha provisto un token válido" }); // si el token no existe no se permite continuar
    try {
    //Si el token es válido, se permite el acceso a la ruta
    const tokenUsuario = jwt.verify(token, process.env.TOKEN_SECRET);
    req.idUsuario = tokenUsuario.id;
    //console.log(tokenUsuario);
    const usuario = await Usuarios.findById(req.idUsuario, { password: 0 });
    console.log(usuario);
    if (!usuario)
      return res.status(404).json({ message: "El usuario no encontrado" });
    next();
  } catch (e) {
    return res.status(401).json({ message: "No está autorizado" });
  }
};

const comprobarModerador = async (req, res, next) => {
  try {
      const usuario = await Usuarios.findById(req.idUsuario);
      const roles = await Roles.find({ _id: { $in: usuario.roles } });
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nombre === "moderador") {
          next();
          return;
        }
      }
    
      return res.status(403).json({ message: "Se requiere el rol de Moderador" });
  } catch (e) {
    console.log(e)
    return res.status(500).send({ message: error });
  }
};
const comprobarAdmin = async (req, res, next) => {
    try {
        const usuario = await Usuarios.findById(req.idUsuario);
        const roles = await Roles.find({ _id: { $in: usuario.roles } });
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].nombre === "admin") {
            next();
            return;
          }
        }
      
        return res.status(403).json({ message: "Se requiere el rol de Admin" });
       
    } catch (e) {
      console.log(e)
      return res.status(500).send({ message: error });
    }
};

module.exports = { verificarToken, comprobarModerador, comprobarAdmin };
