const { Categorie, Product } = require('../models');


const existCategorieById = async(id) => {

    //verifica si la categoria existe
    const existCategorie = await Categorie.findById(id);
    if (!existCategorie) {
        throw new Error(`El id no existe ${id}`);
    }

}

const existProductById = async(id) => {

    //verifica si la categoria existe
    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error(`El id no existe ${id}`);
    }

}

//Validar colecciones permitidas
const allowedCollections = (collection = '', collections = []) => {

    const includs = collections.includes( collection );

    if( !includs ) {
        throw new Error(`La coleccion ${collection} no es permitida, ${collections}`);
    }

    return true;
}


module.exports = {
    existCategorieById,
    existProductById,
    allowedCollections
}