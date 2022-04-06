const { Router } = require('express');
const { check } = require('express-validator');
const { getCategories, getCategoriesID, createCategories, updateCategories, deleteCategories } = require('../controllers/categories.controller');
const { existCategorieById } = require('../helpers');
const { validateJWT, validateFields } = require('../middlewares');




const router = Router();

//Obtener todas las categorias 
router.get('/', getCategories);

//Obtener una categoria por id
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existCategorieById ),
    validateFields
], getCategoriesID);

//Crear categoria - privado
router.post('/',[
    validateJWT,
    check('title','El titulo es obligatorio').not().isEmpty(),
    validateFields
],createCategories);

//Actualizar
router.put('/:id',[
    validateJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existCategorieById ),
    check('title','El titulo es obligatorio').not().isEmpty(),
    validateFields
], updateCategories)

//Borrar
router.delete('/:id',[
    validateJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existCategorieById ),
    validateFields
], deleteCategories)



module.exports = router;
