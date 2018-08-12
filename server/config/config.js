 /**************************
 *           PORT           *
  **************************/
process.env.PORT = process.env.PORT || 3000;

 /**************************
 *         ENTORNO          *
  **************************/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

 /**************************
 *      BASE_DE_DATOS       *
  **************************/
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/db_cafe';

 /**************************
 *  VENCIMIENTO_DEL_TOKEN   *
 *  =====================   *
 *   60 segundos            *
 *   60 minutos             *
 *   24 horas               *
 *   30 días                *
  **************************/
process.env.CAD_TOKEN = 60 * 60 * 24 * 30;

 /**************************
 *   SEED_DE_AUTENTICACIÓN  *
  **************************/
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

 /**************************
 *     NAME_OF_SECTION      *
 *   ===================    *
 *         Item 1           *
 *         Item 2           *
  **************************/


