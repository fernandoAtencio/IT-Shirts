const express = require("express");
const router = express.Router();
const {
  comprobarUsuariosDuplicados,
} = require("./../middlewares/comprobarRegistro");
const { verificarToken, comprobarAdmin } = require("./../middlewares/authjwt");

const { crearUsuarios } = require("../controllers/usuarios");

router.post(
  "/",
  [verificarToken, comprobarAdmin, comprobarUsuariosDuplicados],
  crearUsuarios
);

module.exports = router;
