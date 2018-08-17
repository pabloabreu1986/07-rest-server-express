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
 *   30 Días                *
  **************************/
process.env.CAD_TOKEN = '30d' ;

 /**************************
 *   SEED_DE_AUTENTICACIÓN  *
  **************************/
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

 /**************************
 *     GOOGLE_CLIENT_ID     *
  **************************/
 process.env.CLIENT_ID = process.env.CLIENT_ID || '750164221683-djtuqs2ks4cpqe5bluap89ssokdsvk8n.apps.googleusercontent.com';

 /**************************
 *     NAME_OF_SECTION      *
 *   ===================    *
 *         Item 1           *
 *         Item 2           *
  **************************/