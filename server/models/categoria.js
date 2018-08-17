'use-strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'nombre is required'],
        unique: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
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

categoriaSchema.plugin(uniqueValidator, { message: 'Error, el {PATH} tiene que ser único.' });

module.exports = mongoose.model('Categoria', categoriaSchema);