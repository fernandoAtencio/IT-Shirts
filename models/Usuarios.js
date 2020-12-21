const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const usuariosSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Roles", // referencia a Roles Model
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Método para cifrar el password ingresado en el registro del usuario antes de guardarlo en la base de datos
usuariosSchema.statics.encriptarPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// Método para comparar el password guardado en la base de datos con el password ingresado en el login
usuariosSchema.statics.compararPassword = async (
  password,
  passwordIngresado
) => {
  return await bcrypt.compare(password, passwordIngresado);
};

// Usuarios --> importamos un modelo basado en usuariosSchema
module.exports = model("Usuarios", usuariosSchema);
