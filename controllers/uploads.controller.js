const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { uploadFile, modelByCollection } = require("../helpers");
const { User, Categorie, Product } = require("../models");


const filesUpload = async(req, res) => {

    try {
        //Img
        const newName = await uploadFile(req.files,undefined,'products');
        
        res.json({
            newName
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }

    

}


// const updateCollectionImg = async(req, res) => {

//     const {id, collection} = req.params;
        
//     const model = await modelByCollection(id, collection);

//     //Limpiar imagenes previas
//     try {
//         if(model.img){
//             //Hay que borrar la imagen del servidor
//             const pathImg = path.join(__dirname,'../uploads', collection, model.img);

//             if( fs.existsSync(pathImg) ){
//                 fs.unlinkSync(pathImg);
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }

//     const newName = await uploadFile(req.files,undefined, collection);
//     model.img = newName;

//     await model.save();

//     res.json(model);
// }

const updateCollectionImgCloudinary = async(req, res) => {

    const {id, collection} = req.params;
        
    const model = await modelByCollection(id, collection);

    //Limpiar imagenes previas
    try {
        if(model.img){
            const nameArr = model.img.split('/');
            const name = nameArr[ nameArr.length - 1 ];
            const [public_id] = name.split('.');
            cloudinary.uploader.destroy(public_id);
        }
    } catch (error) {
        console.log(error);
    }

    const { tempFilePath } = req.files.file;


    const {secure_url} = await cloudinary.uploader.upload( tempFilePath );

    model.img = secure_url;

    await model.save();

    res.json(model);
}

const getImg = async(req, res) =>{

    const {id, collection} = req.params;

    const model = await modelByCollection(id, collection);

    if(model.img){

        const img = model.img;
        return res.json({
            img
        })
        
    }

    res.json({
        img: 'https://res.cloudinary.com/dlhr536mz/image/upload/v1649274884/lragh8x5em0cnid0kwc3.jpg'
    })
}

module.exports = {
    filesUpload,
    updateCollectionImgCloudinary,
    getImg
}