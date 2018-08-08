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

/**
 * Vencimiento del Token
 * 60 segundos
 * 60 minutos
 * 24 horas
 * 30 días
 */
process.env.CAD_TOKEN = 60 * 60 * 24 * 30;

/**
 * SEED de Autenticación
 */
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';


