const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name:{
        type: String,
        require:[ true, 'El nombre es obligatorio']
    },
    img:{
        type: String,
    },
    price:{
        type: Number,
        default: 0
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    categorie:{
        type: Schema.Types.ObjectId,
        ref:'Categorie',
        require: true
    },
    stock:{
        type: Boolean,
        default: true
    }
})

ProductSchema.methods.toJSON = function() {

    const { __v, ...data } = this.toObject();

    return data;

}

module.exports = model('Product', ProductSchema);