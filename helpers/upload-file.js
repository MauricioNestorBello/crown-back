const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { User, Categorie, Product } = require('../models');

const uploadFile = ( files, validExtension = ['png','jpg','jpeg','gif'], folder = '' ) => {

    return new Promise ((resolve, reject ) => {

        const { file } = files;

        const cutName = file.name.split('.');

        const extension = cutName[cutName.length - 1 ];

        //Validar extension
        if( !validExtension.includes(extension) ){
            return reject(`La extension ${extension} no es valida, ${validExtension}`);
        }


        const newName = uuidv4()+'.'+ extension;
        const uploadPath = path.join(__dirname , '../uploads/', folder , newName);
  
        file.mv(uploadPath, (err) => {
        if (err) {
             reject(err);
        }
  
        resolve(newName);
        });

    });
}

const modelByCollection = ( id ,collection ) => {

    return new Promise (async(resolve, reject) => {

        let model;

    switch (collection) {
        case 'users':

            model = await User.findById(id);
            if(!model) {
                return reject(`No existe un usuario con el id ${id}`);
            }

            break;
        case 'categories':

            model = await Categorie.findById(id);
            if(!model) {
                return reject(`No existe una categoria con el id ${id}`);
            }

            break;
        case 'products':

            model = await Product.findById(id);
            if(!model) {
                return reject(`No existe un producto con el id ${id}`);
            }

            break;
    
        default:
            return reject('se me olvido este caso');
    }

    resolve(model);
    })
}



module.exports = {
    uploadFile,
    modelByCollection
}