const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        require:[ true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        require:[ true, 'El email es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require:[ true, 'La contraseña es obligatorio']
    },
    img:{
        type: String
    },
    google:{
        type: Boolean,
        default: false
    },
});

UserSchema.methods.toJSON = function () {
    const {__v, password, _id,  ...user} =this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );