'use-strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let roles = {
    values: ['ADMIN_ROLE', 'SUPER_ROLE', 'USER_ROLE'],
    message: '{VALUE} IS NOT A VALID ROLE'
}

let categoriaSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'nombre is required']
    },
    usuario: mongoose.Schema.Types.ObjectId,
    img:{
        type:String,
        required: false
    },
    estado:{
        type: Boolean,
        default: true
    },
    nivel:{
        type:Number,
        default: 1
    }, 
    descripcion: {
        type: String,
        required: false,
        default: 'Breve descripción de la categoría'
    }
});

categoriaSchema.methods.toJSON = function(){

        let categoria = this;
        let catObject = categoria.toObject();
        //delete catObject.password;
        
    return catObject;
}

categoriaSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Categoria', categoriaSchema);