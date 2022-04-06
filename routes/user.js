const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/user.controller');

const router = Router();


router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    check('password','La contraseña debe de ser de mas de 6 caracteres').isLength({min:6}),
    validateFields
],usersPost);

router.delete('/:id',[
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validateFields
], usersDelete);


module.exports = router;