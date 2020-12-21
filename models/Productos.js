const { Schema, model } = require("mongoose");

const productosSchema = new Schema(
  {
    nombre: String,
    categoria: String,
    precio: Number,
    imagen: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// Productos --> importamos un modelo basado en productosSchema 
module.exports = model('Productos', productosSchema);