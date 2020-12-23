const express = require("express");
const router = express.Router();

const { crearUsuarios } = require("../controllers/usuarios");
const {
  comprobarUsuariosDuplicados,
  comprobarRolExistente,
} = require("./../middlewares/comprobarRegistro");
const { verificarToken, comprobarAdmin } = require("./../middlewares/authjwt");

//const { registro } = require("../controllers/auth");
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/",
  [verificarToken, comprobarAdmin, comprobarUsuariosDuplicados],
  crearUsuarios
);

module.exports = router;
