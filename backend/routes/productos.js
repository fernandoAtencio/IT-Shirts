const express = require("express");
const router = express.Router();
const {
  obtenerProductos,
  obtenerProductosPorID,
  crearProductos,
  actualizarProductosPorID,
  borrarProductosPorID,
} = require("./../controllers/productos");

router.get("/", obtenerProductos);
router.post("/", crearProductos);
router.get("/:productosID", obtenerProductosPorID);
router.put("/:productosID", actualizarProductosPorID);
router.delete("/:productosID", borrarProductosPorID);

module.exports = router;
