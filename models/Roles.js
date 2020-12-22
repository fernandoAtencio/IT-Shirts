const { Schema, model } = require("mongoose");



const rolesSchema = new Schema(
  {
    nombre: String,
  },
  {
    versionKey: false,
  }
);
// Usuarios --> importamos un modelo basado en usuariosSchema
module.exports = model("Roles", rolesSchema);
