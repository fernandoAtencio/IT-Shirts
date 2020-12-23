# API REST – IT-Shirts 😎

Es un backend de una tienda virtual de camisetas de Tecnologías IT, realizado con NODE (express), MONGODB (mongoose) y JWT. Los usuarios se registrarán con diferentes roles, tales como admin, moderador y usuario. Esto les dará diferentes permisos para las distintas rutas, de acuerdo a su nivel de jerarquía. El admin, tendrá a disposición todos los permisos para el CRUD básico de los productos y la creación de otros usuarios admin o moderadores. No así el usuario común, que solo podrá obtener el listado de los productos ya sea a nivel general o de un producto en particular por su ID, pero no tendrá permisos para modificar productos, darlos de alta o eliminarlos, ni tampoco, por supuesto la creación de usuarios.

Instrucciones para su instalación y uso 🤓

1- Crear una carpeta donde guardar el proyecto y, dentro de esa carpeta, copiar los archivos de este repositorio e ingresar npm i en la consola para instalar los node_modules.

2- Crear un archivo .env en el directorio raíz del proyecto y agregar en él, tus variables de entorno de acuerdo a la siguiente configuración:

```
#APP
PORT = "3000" // o el puerto que uses para el server
ROLES = ["usuario", "admin", "moderador"];
TOKEN_SECRET = "tuclavesecreta"

#MAIL
MAIL_ADMIN = "tumail@mail.com"
MAIL_PASSWORD = "tupassword"

# BASE DE DATOS

MONGODB_URL: "mongodb://localhost/tuBaseDB"
```

3 - La aplicación tiene un archivo index.js donde se configuró el servidor.

4- Dentro de la carpeta utils hay dos archivos:

-db.js: Donde está la configuración de la base de datos.

-initialSetup.js: Donde está la configuración inicial de la aplicación.


5- En la carpeta postman, encontrarás un archivo en formato json. Debes instalar postman desde https://www.postman.com/downloads/. Es la aplicación que usarás para probar nuestra API-REST. Una vez instalado postman, solo debes dirigirte a file => import y eliges importar el archivo que está en la carpeta postman. Esto te importará la colección con todas las rutas de la aplicación.

6- Vamos a recorrerlas: 🚴‍♂️.

La colección consta de 3 carpetas: productos, auth y usuarios.

- Carpeta auth
  tiene 2 endpoints

      a-Login
          Método: POST
          URL: http://localhost:3000/api/auth/login
          Headers:
              Key: Content-Type
              Value: application-json
          Body: raw
              {
              "email": "ejemplo@mail.com",
              "password": "password"
              }
          Ejemplo de respuesta: (Si es correcto, devuelve un token (Expiran en 24 hs), caso contrario devuelve "usuario no encontrado o password incorrecto)
              {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTEyNGYxNDYzYmQ4NDY0MDVkNTJkNiIsImlhdCI6MTYwODY3ODQxMywiZXhwIjoxNjA4NzY0ODEzfQ.IIDpd7KU-Tnms3atnhtbcfqnifLjKSn6AVCcbyhZDXk"
              }

      b-Registro
              Método: POST
              URL: http://localhost:3000/api/auth/registro
              Headers:
                  Key: Content-Type
                  Value: application-json
              Body: raw
                  {
                  "nombre": "Nombre de Usuario",
                  "email": "ejemplo@mail.com",
                  "password": "password"
                  }
              Ejemplo de respuesta: (Si es correcto devuelve un token (Expiran en 24 hs). En caso de que el usuario ya exista, devuelve "El usuario ya existe" o "el email ya existe" y, si ingresamos un rol incorrecto (por ej: superadmin), devuelve "el rol superadmin no existe" )
                  {
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTEyNGYxNDYzYmQ4NDY0MDVkNTJkNiIsImlhdCI6MTYwODY3ODQxMywiZXhwIjoxNjA4NzY0ODEzfQ.IIDpd7KU-Tnms3atnhtbcfqnifLjKSn6AVCcbyhZDXk"
                  }

- Carpeta Productos
  tiene 5 endpoints

      a-Obtener todos los productos
          Método: GET
          URL: http://localhost:3000/api/productos
          Headers: none

          Body: none

          Ejemplo de respuesta: (Devuelve un arreglo de objetos con todos los productos de la base de datos. Cualquier usuario puede usar esta ruta)
              [
                  {
                      "_id": "5fdfb7a19f36f5483863038b",
                      "nombre": "remera javascript",
                      "categoria": "Remeras",
                      "precio": 800,
                      "imagen": "https://srv.latostadora.com/designall.dll/javascript--i:13562388259801356232017092618;h:320;s:H_A18;k:fdec2accac112f7b7a1e0e298ee3bff5;p:1.jpg",
                      "createdAt": "2020-12-20T20:44:17.318Z",
                      "updatedAt": "2020-12-20T20:44:17.318Z"
                  },

                  {
                      "_id": "5fe13aba7f6f482e404edf47",
                      "nombre": "remera AngularJs",
                      "categoria": "Remeras",
                      "precio": 790,
                      "imagen": "https://ih1.redbubble.net/image.562283154.6444/ssrco,classic_tee,mens,101010:01c5ca27c6,front_alt,square_product,600x600.u3.jpg",
                      "createdAt": "2020-12-22T00:15:54.385Z",
                      "updatedAt": "2020-12-22T00:15:54.385Z"
                  }
              ]

      b-Obtener un producto por ID
          Método: GET
          URL: http://localhost:3000/api/productos/5fdfbbaff6d34c36d0286ee1 (este número es el ID del producto)
          Headers: none

          Body: none

          Ejemplo de respuesta: (Devuelve el objeto identificado en el ID del producto. Cualquier usuario puede usar esta ruta)
                  {
                      "_id": "5fdfbbaff6d34c36d0286ee1",
                      "nombre": "remera NodeJs",
                      "categoria": "Remeras",
                      "precio": 900,
                      "imagen": "https://srv.latostadora.com/designall.dll/nodejs--i:1356237832350135623201709261;s:H_A1;w:700;h:520;k:59f48bca7205337384103116ee45289b.jpg",
                      "createdAt": "2020-12-20T21:01:35.242Z",
                      "updatedAt": "2020-12-21T04:24:52.511Z"
                  }

      c-Crear un Producto
              Método: POST
              URL: http://localhost:3000/api/productos
              Headers:
                  Key: Content-Type
                  Value: application-json
                  Key: x-access-token
                  Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTI3NjUyOGUyMWRjMGUxMDhhNmI2YyIsImlhdCI6MTYwODY3Njk0NiwiZXhwIjoxNjA4NzYzMzQ2fQ.VNcUne16wH9RhJdxP4vYgJDkos41X5MzBuh947PLAuw (el token de un admin)
              Body: raw
                  {
                      "nombre": "remera AngularJs",
                      "categoria": "Remeras",
                      "precio": 790,
                      "imagen": "https://ih1.redbubble.net/image.562283154.6444/ssrco,classic_tee,mens,101010:01c5ca27c6,front_alt,square_product,600x600.u3.jpg" (url de una imagen)
                  }
              Ejemplo de respuesta: (Si el token provisto es de un admin y es correcto, devuelve el objeto creado. Si no, recibirás estas respuestas según corresponda: "No se ha provisto un token válido", "no está autorizado", "se requiere el rol de admin" )
                  {
                      "_id": "5fe27c130e8d6a30b425bde3",
                      "nombre": "remera AngularJs",
                      "categoria": "Remeras",
                      "precio": 790,
                      "imagen": "https://ih1.redbubble.net/image.562283154.6444/ssrco,classic_tee,mens,101010:01c5ca27c6,front_alt,square_product,600x600.u3.jpg",
                      "createdAt": "2020-12-22T23:06:59.247Z",
                      "updatedAt": "2020-12-22T23:06:59.247Z"
                  }

       d-Modificar un Producto por ID
              Método: PUT
              URL: http://localhost:3000/api/productos/5fdfbbaff6d34c36d0286ee1 (este número es el ID del producto)
              Headers:
                  Key: x-access-token
                  Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTI3NjUyOGUyMWRjMGUxMDhhNmI2YyIsImlhdCI6MTYwODY3Njk0NiwiZXhwIjoxNjA4NzYzMzQ2fQ.VNcUne16wH9RhJdxP4vYgJDkos41X5MzBuh947PLAuw (el token de un admin)
              Body: raw
                  {
                      "precio": 850
                  }
              Ejemplo de respuesta: (Si el token provisto es de un admin y es correcto, devuelve el objeto modificado. Si no, recibirás estas respuestas según corresponda: "No se ha provisto un token válido", "no está autorizado", "se requiere el rol de admin" )
                  {
                      "_id": "5fdfbbaff6d34c36d0286ee1",
                      "nombre": "remera AngularJs",
                      "categoria": "Remeras",
                      "precio": 850,
                      "imagen": "https://ih1.redbubble.net/image.562283154.6444/ssrco,classic_tee,mens,101010:01c5ca27c6,front_alt,square_product,600x600.u3.jpg",
                      "createdAt": "2020-12-22T23:06:59.247Z",
                      "updatedAt": "2020-12-22T23:06:59.247Z"
                  }

      e-Eliminar un Producto por ID
                  Método: DELETE
                  URL: http://localhost:3000/api/productos/5fdfbbaff6d34c36d0286ee1 (este número es el ID del producto)
                  Headers:
                      Key: x-access-token
                      Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTI3NjUyOGUyMWRjMGUxMDhhNmI2YyIsImlhdCI6MTYwODY3Njk0NiwiZXhwIjoxNjA4NzYzMzQ2fQ.VNcUne16wH9RhJdxP4vYgJDkos41X5MzBuh947PLAuw (el token de un admin)
                  Body: none

                  Ejemplo de respuesta: (Si el token provisto es de un admin y es correcto, elimina el producto devolviendo un status(200). Si no, recibirás estas respuestas según corresponda: "No se ha provisto un token válido", "no está autorizado", "se requiere el rol de admin" )


- Carpeta Productos
  tiene 1 endpoint

      b-Crear un nuevo Usuario
                  Método: POST
                  URL: http://localhost:3000/api/usuarios
                  Headers:
                      Key: Content-Type
                      Value: application-json
                      Key: x-access-token
                      Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTI3NjUyOGUyMWRjMGUxMDhhNmI2YyIsImlhdCI6MTYwODY3Njk0NiwiZXhwIjoxNjA4NzYzMzQ2fQ.VNcUne16wH9RhJdxP4vYgJDkos41X5MzBuh947PLAuw (el token de un admin)
                  Body: raw
                      {
                      "nombre": "Nombre de Usuario",
                      "email": "ejemplo@mail.com",
                      "password": "password",
                      "roles": "admin"
                      }
                  Ejemplo de respuesta: (Si el token provisto es de un admin y es correcto, devuelve un objeto del nuevo usuario. Si no, recibirás estas respuestas según corresponda: "No se ha provisto un token válido", "no está autorizado", "se requiere el rol de admin", "El usuario o email ya existen", "El rol xxxxx no existe"  )
                     {
                          "_id": "5fe27bf00e8d6a30b425bde1",
                          "nombre": "Fede",
                          "email": "feder@gmail.com",
                          "roles": [
                              "5fe1102d0ce9f81d188f1e8a"
                          ]
                      }

7- Construido con 🔧

- [Node](https://nodejs.org/es/)
- [Express](https://expressjs.com/es/)
- [MongoDB](https://www.mongodb.com/es)
- [Mongoose](https://mongoosejs.com/)

8- Versión 📍

- 1.0.0

9- Autores 🦾

Fernando Atencio, Matías Olmos y Valentín Carneros

10 - Agradecimientos 🤝

Al curso de PWI de UTN, al profe Franco Di Leo, a Jon y a todos los compañeros que han compartido sus experiencias y su tiempo con generosidad. A nuestras familias que nos aguantaron horas y horas enfrente de una máquina sin reproches.
