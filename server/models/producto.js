'use-strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let unidad = {
    values: ['U', 'GR', 'KG'],
    message: '{VALUE} NO ES UNA UNIDAD VÁLIDA'
};

let productoSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'nombre es obligatorio'],
        unique: true
    },
    calorias: {
        type: Number,
        required: false
    },
    azucar:{
        type: Number,
        required: false
    },
    sodio:{
        type: Number,
        required: false
    },
    grasa:{
        type: Number,
        required: false
    },
    carbo:{
        type: Number,
        required: false
    },
    proteina:{
        type: Number,
        required: false
    },
    img:{
        type:String,
        required: false
    },
    estado:{
        type: Boolean,
        default: true
    },
    marca:{
        type: String,
        default: 'Sin Marca'
    },
    unidad:{
        type: String,
        default: 'U',
        enum: unidad
    },
    cantidad:{
        type: Number,
        default: 1
    }, 
    descripcion: {
        type: String,
        required: false,
        default: 'Breve descripción del producto'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    }
});

productoSchema.plugin(uniqueValidator, { message: 'Error, el {PATH} tiene que ser único.' });

module.exports = mongoose.model('Producto', productoSchema);