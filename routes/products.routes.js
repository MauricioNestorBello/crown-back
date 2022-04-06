const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProductsByCategorie, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products.controller');
const { existCategorieById, existProductById } = require('../helpers');
const { validateJWT, validateFields } = require('../middlewares');




const router = Router();

//Obtener todos los productos 
router.get('/', getProducts);

//Obtener todos los productos por categoria 
router.get('/categorie/:categorie',[
    check('categorie').custom( existCategorieById ),
    validateFields
],getProductsByCategorie);

//Obtener un producto por id
router.get('/:id',[
    check('id').custom(existProductById),
    validateFields
],getProductById)

//Obtener una categoria por id
router.get('/:id',);

//Crear categoria - privado
router.post('/',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('categorie','categorie no es un id de mongo valido').isMongoId(),
    check('categorie').custom( existCategorieById ),
    validateFields
],createProduct);

//Actualizar
router.put('/:id',[
    validateJWT,
    check('id').custom( existProductById ),
    check('price').not().isEmpty(),
    validateFields
],updateProduct)

//Borrar
router.delete('/:id',[
    validateJWT,
    check('id').custom( existProductById ),
    validateFields
], deleteProduct)



module.exports = router;
