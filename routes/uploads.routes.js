const { Router } = require('express');
const { check } = require('express-validator');
const { filesUpload, getImg, updateCollectionImgCloudinary } = require('../controllers/uploads.controller');
const { allowedCollections } = require('../helpers');
const { fileValidate } = require('../middlewares');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/', fileValidate ,filesUpload);


router.put('/:collection/:id',[
    fileValidate,
    check('id','El id debe ser de mongo').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users','categories','products'])),
    validateFields
], updateCollectionImgCloudinary);

router.get('/:collection/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users','categories','products'])),
    validateFields
], getImg)



module.exports = router;