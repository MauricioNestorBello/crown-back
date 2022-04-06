

const validateJWT = require('./validate-jwt'); 
const validateFields = require('./validate-fields');
const fileValidate = require('./file-validate');

module.exports = {
    ...validateJWT,
    ...validateFields,
    ...fileValidate
}