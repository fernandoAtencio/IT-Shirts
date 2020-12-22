const express = require("express");
const router = express.Router();
const { verificarToken, comprobarModerador, comprobarAdmin } = require("./../middlewares/authjwt");

const {
  obtenerProductos,
  obtenerProductosPorID,
  crearProductos,
  actualizarProductosPorID,
  borrarProductosPorID,
} = require("./../controllers/productos");

router.get("/", obtenerProductos);
router.post("/", [verificarToken, comprobarAdmin], crearProductos);
router.get("/:productosID", obtenerProductosPorID);
router.put("/:productosID", [verificarToken, comprobarModerador, comprobarAdmin], actualizarProductosPorID);
router.delete("/:productosID", [verificarToken, comprobarAdmin], borrarProductosPorID);

module.exports = router;
