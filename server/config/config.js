/**
 * Port
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * Entorno
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Base de Datos
 */
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/db_cafe';

// let urlDB;

//     if (process.env.NODE_ENV === 'dev') {
//         urlDB = 'mongodb://localhost:27017/db_cafe';
//     } else {
//         urlDB = process.env.MONGO_URI;
//     }

// process.env.MONGO_URL = urlDB;

