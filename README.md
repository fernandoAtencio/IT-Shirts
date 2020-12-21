# API REST – IT-Shirts 😎

Es un backend de una tienda virtual de camisetas de Tecnologías IT, realizado con NODE (express), MONGODB (mongoose) y JWT para autenticar usuarios y definir diferentes roles como admin, moderador y usuario con autorizaciones y permisos para las diferentes rutas, de acuerdo a su nivel de jerarquía. El admin, tendrá a disposición todos los permisos para el CRUD básico de los productos. No así el usuario, que solo podrá obtener el listado de los productos ya sea a nivel general o de un producto en particular pero no tendrá permisos para modificar productos, darlos de alta o eliminarlos. 

Instrucciones para su instalación y uso 🤓

1- crear una carpeta donde guardar el proyecto y dentro de esa carpeta copiar los archivos de este repositorio e ingresar npm i en la consola para instalar los node_modules.

2- Crear un archivo .env en el directorio raíz del proyecto y agregar en él, tus variables de entorno de acuerdo a la siguiente configuración:

USER=localhost
PASSWORD=""
DBNAME=api_rest_blog
TOKEN_SECRET=tuclavesecreta



_La API utiliza mongodb por lo que deberás establecer la conexión con este motor de base de datos dentro del fichero index.js encontrarás lo que necesitas._

## Recursos de la API REST 🔧

_A continuación se listarán todos los endpoints de la API REST con json de ejemplo tanto de petición como de respuesta. Se sigue el lineamiento REST siendo utilizados los métodos GET, POST, PUT Y DELETE._

## Nuevo usuario 🤓

_Para crear un **nuevo usuario** enviar un json a http://localhost:3900/api/user/register_

_Ejemplo de petición por método **POST**:_

```
{
	"name": "Miguel Perez"
	"email": "miguel@perez.com",
	"password": "123456"
}

```

_Respuesta de ejemplo:_

```

{
    "status": "success",
    "userId": "5fd44b35dfef725854533185"
}

```
_*Si el correo ya existe devuelve un error informando la situación._

## Login 🔑

_Para loguearse y obtener jwt enviar un json a http://localhost:3900/api/user/login_

_Ejemplo de petición por método **POST**:_

```

{
	"email": "tucorreo@gmail.com",
	"password": "123456"
}

```

_Respuesta de ejemplo:_

```

{
    "error": null,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVpcyBBbGJhbmVzZSIsImlkIjoiNWY5OWQ0MmM0N2QwNDQ0ZWI4Yzc0Yzc3IiwiaWF0IjoxNjA3NzQ0OTk1fQ.a6UROFsVBLAEF01TvgKQqqIuSsIXNmb52Vlb0sNhycc"
    }
}

```

_*El token está configurado con una expiración de 1 hora._

## Crear artículo 📋

_Para crear un nuevo artículo enviar un json a http://localhost:3900/api/article/save_


_Esta ruta es protegida por lo que deberás enviar en los headers con la clave **Authorization** el JWT obtenido en el login:_
_Ejemplo de petición por método **POST**:_

```

{
    "title":"Hola es un nuevo articulo de prueba",
    "content": "Contenido de prueba desde postman"
}

```

_Respuesta de ejemplo:_

```

{
    "status": "success",
    "article": {
        "_id": "5fd43f17721de75a30ffda82",
        "date": "2020-12-12T03:55:03.098Z",
        "title": "Hola es un nuevo articulo de prueba",
        "content": "Contenido de prueba desde postman",
        "image": null,
        "__v": 0
    }
}

```

## Editar artículo ✍

_Para editar un artículo enviar un json a http://localhost:3900/api/article/id_


_Esta ruta es protegida por lo que deberás enviar en los headers con la clave **Authorization** el JWT obtenido en el login:_
_Ejemplo de petición por método **PUT**:_

```

{
    "title":"Estoy editando el articulo",
    "content": "Contenido de prueba del articulo editado desde postman"
}

```

_Respuesta de ejemplo:_

```

{
    "status": "success",
    "article": {
        "_id": "5fb5322883b8700be4d9877c",
        "date": "2020-11-18T14:39:36.078Z",
        "title": "Editando el articulo 1",
        "content": "Contenido de prueba desde postman",
        "image": "64uG0At57wP1F-_YKvl5jW-f.jpeg",
        "__v": 0
    }
}

```

## Borrar un artículo ❌

_Para eliminar un artículo enviar petición a http://localhost:3900/api/article/id_


_Esta ruta es protegida por lo que deberás enviar en los headers con la clave **Authorization** el JWT obtenido en el login:_
_Petición por método **DELETE**:_

_Respuesta de ejemplo:_

```

{
    "status": "success",
    "message": "El articulo: 5fb5322883b8700be4d9877c ha sido eliminado."
}

```
_*Se debe pasar el id del artículo que se quiere eliminar._

## Listar todos los artículos 📋📋

_Para listar todos los artículos enviar petición a http://localhost:3900/api/articles_

_Petición por método **GET**:_

_Respuesta de ejemplo:_

```

{
    "status": "success",
    "articles": [
        {
            "_id": "5fb5322883b8700be4d9877c",
            "date": "2020-11-18T14:39:36.078Z",
            "title": "Nuevo articulo de prueba",
            "content": "Hola espero que te guste mi blog",
            "image": "null",
            "__v": 0
        },
        {
            "_id": "5fb530f283b8700be4d98778",
            "date": "2020-11-18T14:34:26.173Z",
            "title": "Ahora si funciona todo bien",
            "content": "Probando subir articulos!!",
            "image": null",
            "__v": 0
        },
    ]
}

```

## Listar un artículo en particular 📋

_Para listar todos los artículos enviar petición a http://localhost:3900/api/article/id_

_Petición por método **GET**:_

_Respuesta de ejemplo:_

```

{
    "status": "success",
    "article": {
        "_id": "5fb530f283b8700be4d98778",
        "date": "2020-11-18T14:34:26.173Z",
        "title": "Ahora si funciona todo bien",
        "content": "Probando subir articulos!!",
        "image": "null",
        "__v": 0
    }
}


```
_*Se debe pasar el id del artículo que se busca._

## Buscar artículos 🔍

_Para buscar artículos enviar petición a http://localhost:3900/api/search?data=string_

_Petición por método **GET**:_

_Respuesta de ejemplo:_

```

{
    "status": "success",
    "articles": [
        {
            "_id": "5fd43f17721de75a30ffda82",
            "date": "2020-12-12T03:55:03.098Z",
            "title": "Hola es un nuevo articulo de prueba",
            "content": "Contenido de prueba desde postman",
            "image": null,
            "__v": 0
        }
    ]
}


```
_*Se debe pasar el query string de búsqueda por la URL._

## Construido con 🛠️

* [Node](https://nodejs.org/es/) 
* [Express](https://expressjs.com/es/)
* [MongoDB](https://www.mongodb.com/es)
* [Mongoose](https://mongoosejs.com/)

## Versionado 📌

* 1.0.0

## Autores ✒️

* **Luis Albanese** - *Desarrollo y documentación* - [lumacode](https://github.com/lumacode)

## Expresiones de Gratitud 🎁

* Gracias a Franco Di Leo por sus clases y a toda la comunidad porque siempre comparten el conocimiento. 
* Agradecimiento especial a Daniel Rinaldi porque fue el primero que me introdujo en el mundo API REST.
