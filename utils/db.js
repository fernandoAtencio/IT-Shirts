const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/itShirtsDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("La base de datos está conectada"))
  .catch((error) => console.log(error));
