const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');


const usersGet = (req, res = response) => {

    res.json({
        msg: 'get - controlador'
    });
  }

  const usersPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        id,
        msg: 'put - controlador'
    });
  }

  const usersPost = async (req, res = response) => {



    const { name, email, password } = req.body;

    const user = new User({name, email, password});

    //Verifica si el correo existe en la DB
    const emailExists = await User.findOne({ email });
        if(emailExists){
            return res.status(400).json({
                msg:'El email ya esta registrado'
            })
        }

    //Encriptar password
    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync( password, salt );

    //Guardar en DB
    await user.save();


    res.json({
        user,
        msg: 'post - controlador'
    });
  }

  const usersDelete = async (req, res = response) => {

    const {id} = req.params;

    // const uid = req.uid;

    const user2 = req.user;

    //Delete
    const user = await User.findByIdAndDelete( id );

    res.json({
        user2,
        user,
        msg: 'delete - controlador'
    });
  }

  module.exports = {
      usersGet,
      usersPut,
      usersPost,
      usersDelete
  }