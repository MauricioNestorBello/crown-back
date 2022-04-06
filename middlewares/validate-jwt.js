const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // req.uid = uid;

        //leer el usuario que corresponde al uid
        const user = await User.findById(uid);

        if( !user ) {
            return res.status(401).json({
                msg:'El usuario no existe'
            })
        }

        console.log(req.user);

        req.user =user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }


}

module.exports = {
    validateJWT
}