const express = require("express");
const router = express.Router();
const { login, registro } = require("./../controllers/auth");
const {
  comprobarUsuariosDuplicados,
  comprobarRolExistente,
} = require("./../middlewares/comprobarRegistro");

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post("/login", login);
router.post(
  "/registro",
  [comprobarUsuariosDuplicados, comprobarRolExistente],
  registro
);
module.exports = router;
