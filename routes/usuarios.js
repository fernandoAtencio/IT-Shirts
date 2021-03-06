const express = require("express");
const router = express.Router();

const {
  crearUsuarios,
  obtenerUsuarios,
  obtenerUsuariosPorID,
  actualizarUsuariosPorID,
  borrarUsuariosPorID,
} = require("../controllers/usuarios");
const {
  comprobarUsuariosDuplicados,
  comprobarRolExistente,
} = require("./../middlewares/comprobarRegistro");
const { verificarToken, comprobarAdmin } = require("./../middlewares/authjwt");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/",
  [verificarToken, comprobarAdmin, comprobarUsuariosDuplicados, comprobarRolExistente],
  crearUsuarios
);
router.get("/", [verificarToken, comprobarAdmin], obtenerUsuarios);
router.get(
  "/:usuariosID",
  [verificarToken, comprobarAdmin],
  obtenerUsuariosPorID
);
router.put(
  "/:usuariosID",
  [verificarToken, comprobarAdmin, comprobarRolExistente],
  actualizarUsuariosPorID
);
router.delete(
  "/:usuariosID",
  [verificarToken, comprobarAdmin],
  borrarUsuariosPorID
);

module.exports = router;
