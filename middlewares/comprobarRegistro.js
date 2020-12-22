const Usuarios = require("./../models/Usuarios");



const comprobarRolExistente = (req, res, next) => {
  const { roles } = req.body;
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!process.env.ROLES.includes(roles[i])) {
        return res.status(400).json({
          message: `El Rol ${roles[i]} no existe`,
        });
      }
    }
  }

  next();
};

const comprobarUsuariosDuplicados = async (req, res, next) => {
    try {
      const {nombre, email} = req.body;  
      const usuario = await Usuarios.findOne({ nombre });
      if (usuario)
        return res.status(400).json({ message: "El usuario ya existe" });
      const emailUsuario = await Usuarios.findOne({ email });
      if (emailUsuario)
        return res.status(400).json({ message: "El email ya existe" });
      next();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

module.exports = { comprobarRolExistente, comprobarUsuariosDuplicados };
