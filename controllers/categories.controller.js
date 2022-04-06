const req = require("express/lib/request")
const res = require("express/lib/response")

const {Categorie} = require('../models');


const getCategories = async(req, res) =>{
    
    const categories = await Categorie.find()
          .populate('user','name');
    
    res.json(categories)
}


const getCategoriesID = async(req, res) =>{

    const { id } = req.params;

    const categorie = await Categorie.findById( id );

    res.json({
        id,
        categorie
    })
}


const createCategories = async(req, res) =>{

    const title = req.body.title.toUpperCase();

    const categorieDB = await Categorie.findOne({title});

    console.log(categorieDB);

    if( categorieDB ) {
        return res.status(400).json({
            msg:`La categoria ${ categorieDB.title } ya existe`
        });
    }

    //Generar la data
    const data = {
        title,
        routeName: title,
        user: req.user._id
    }

    const categorie = new Categorie(data);
    
    //
    await categorie.save();

    res.status(201).json({
        data,
        title,
        msg:'post categories'
    })
}


const updateCategories = async(req, res) =>{

    const { id } = req.params;
    const { title } = req.body;

    const data = {
        title,
        routeName: title
    }

    data.title = data.title.toUpperCase();
    data.routeName = data.routeName.toUpperCase();

    const categorie = await Categorie.findByIdAndUpdate(id, data,{new: true});

    res.json({
        id,
        categorie,
    })
}


const deleteCategories = async(req, res) =>{

    const {id} = req.params;

    const categorie = await Categorie.findByIdAndDelete(id);

    res.json({
        categorie,
        msg:'delete categories'
    })
}


module.exports = {
    getCategories,
    getCategoriesID,
    createCategories,
    updateCategories,
    deleteCategories
}