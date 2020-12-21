const Productos = require("./../models/Productos");

const crearProductos = async (req, res) => {
  const { nombre, categoria, precio, imagen } = req.body;
  const nuevoProducto = new Productos({ nombre, categoria, precio, imagen });
  const productoGuardado = await nuevoProducto.save();
  res.status(201).json(productoGuardado);
};

const obtenerProductos = async (req, res) => {
  const productos = await Productos.find();
  res.json(productos);
};
const obtenerProductosPorID = async (req, res) => {
  const { productosID } = req.params;
  const producto = await Productos.findById(productosID);
  res.status(200).json(producto);
};
const actualizarProductosPorID = async (req, res) => {
  const { productosID } = req.params;
  const productoActualizado = await Productos.findByIdAndUpdate(
    productosID,
    req.body,
    { new: true }
  );
  res.status(200).json(productoActualizado);
};
const borrarProductosPorID = async (req, res) => {
  const { productosID } = req.params;
  await Productos.findByIdAndDelete(productosID);
  res.status(204).json();
};

module.exports = {
  crearProductos,
  obtenerProductos,
  obtenerProductosPorID,
  actualizarProductosPorID,
  borrarProductosPorID,
};
