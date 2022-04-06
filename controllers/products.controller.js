const { Product } = require("../models");



const getProducts = async( req, res ) => {

    const products = await Product.find();

    res.json({
        products
    })

}

const getProductById = async( req, res ) => {

    const {id} = req.params;
    const products = await Product.findById(id);

    res.json({
        id,
        products
    })

}

const getProductsByCategorie = async(req, res) => {

    const {categorie} = req.params;

    const products = await Promise.all([
        Product.find({categorie: categorie})
               .populate('categorie','title')
    ]);

    res.json({ 
        products,
    })

}


const createProduct = async(req, res) => {

    const { user, ...body } = req.body;

    body.name = body.name.toUpperCase();

    const productDB = await Product.findOne({name: body.name});

    if(productDB){
        return res.status(400).json({
            msg:`El producto ${productDB.name} ya existe en base de datos`
        })
    }

    //generar data
    const data = {
        ...body,
        user: req.user._id
    }

    const product = new Product(data);

    //guardar en db
    await product.save();

    res.status(201).json(product);

}

const updateProduct = async(req, res) => {

    const {id} = req.params;
    const {user, ...data} = req.body;

    data.name = data.name.toUpperCase();

    const product = await Product.findByIdAndUpdate(id, data,{new: true});

    res.json({
        product
    })

}

const deleteProduct = async(req, res) => {

    const {id} = req.params;

    const product = await Product.findByIdAndDelete(id);

    res.json({
        msg:'borrado',
        product
    })



}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductsByCategorie,
    updateProduct,
    deleteProduct
}