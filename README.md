# Express REST Server

[![N|Solid](https://www.idqweb.com/wp-content/uploads/2016/08/cabecera-nodejs-express.png)](https://nodesource.com/products/nsolid)

Implementación de un serividor REST con Express+NodeJS+MongoDB, tiene implementación para almacenar y gestionar de forma CRUD, usuarios y productos. Además tiene implementado el registro y logueo usando la API de Google. Permite persolalizar y almacenar localmente las imagenes de usuarios y productos.

# Endponts.!

### Usuario

- POST: Crear Usuario
- PUT: Usuario
- POST: Login
- GET: Usuarios
- DELETE: Usuario
- POST: Login Google
- GET: Usuario By Id

### Categoría

- Crear Categoria
- PUT: Categoría
- GET: Categorías
- GET: Categoría por Nombre
- DELETE: Categoría
- GET: Categoría By Id

### Productos

- POST: Crear Proucto
- PUT: Producto
- GET: Productos
- DELETE: Producto
- GET: Producto By Id
- GET: producto por Nombre

### Imagen

- PUT: Upload usuarios (Sube imagen de usuario, si tiene la susutituye en BD)
- PUT: Upload productos (Sube imagen de producto, si tiene la susutituye en BD)
- GET: Imagen (usuarios/id?token=token_jwt)
- GET: Imagen (productos/id?token=token_jwt)

### Instalar paquetes

Se requiere [Node.js](https://nodejs.org/) v8+ to run.

Instalar las dependencias y correr el servidor.

```sh
$ cd ruta/del/proyecto
$ npm install
$ npm run start
```

En desarrollo para instalar dependencias y dependencias de desarrollo (devDependencies) y correr el servidor.
For production environments...

```sh
$ npm install
$ npm install --dev
$ npm run dev
```

### Por hacer..!!

- Pruebas Unitarias
- Docker

## License

MIT

**No reinventar la rueda!**
