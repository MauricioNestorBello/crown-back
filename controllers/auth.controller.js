const bcryptjs = require('bcryptjs');
const { json } = require('express/lib/response');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const User = require('../models/user.model');



const login = async ( req, res ) => {

    const {email, password} = req.body;

    
    try {

        //Verificar si el email existe
        const user = await User.findOne({email});
        if( !user ) {
            return res.status(400).json({
                msg:'El email / password no son correctos - e'
            })
        }

        //Verificar la constraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if( !validPassword ){
            return res.status(400).json({
                msg:'El email / password no son correctos - p'
            })
        }

        //Generar el JWT
        const token = await generarJWT( user.id );

        res.json({
            user,
            token,
            msg: 'Login ok'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

const googleSignIn = async (req, res) => {
    const {id_token} = req.body;

    try {
        const {name, img, email} = await googleVerify(id_token);


        let user = await User.findOne({email});

        if( !user ){

            const data ={
                name,
                email,
                password: '',
                img,
                google:true
            }

            user = new User(data);

            await user.save();
        }

        //Generar el JWT
        const token = await generarJWT( user.id );

        

        res.json({
            user,
            token
        })
    } catch (error) {
        json.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar'
        })
    }



}
 
module.exports = {
    login,
    googleSignIn
}