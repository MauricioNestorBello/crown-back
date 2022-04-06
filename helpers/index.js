

 const generarJWT = require('./generar-jwt');
 const googleVerify = require('./google-verify');
 const categorieValidate = require('./categorie-validate');
 const uploadFile = require('./upload-file');

 module.exports = {
     ...generarJWT,
     ...googleVerify,
     ...categorieValidate,
     ...uploadFile
 }