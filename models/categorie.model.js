const { Schema, model } = require('mongoose');

const CategorieSchema = Schema({
    title:{
        type: String,
        require:[ true, 'El titulo es obligatorio'],
        unique: true
    },
    routeName: {
        type: String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    img:{
        type: String
    }
})

CategorieSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}

module.exports = model('Categorie', CategorieSchema);