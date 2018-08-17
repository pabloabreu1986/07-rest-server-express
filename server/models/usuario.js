'use-strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} NO ES UN ROL VÁLIDO'
};

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'el email es obligatorio']
    },
    password:{
        type: String,
        required: [true, 'el password es obligatorio']
    },
    img:{
        type:String,
        required: false
    },
    role:{
        type:String,
        default: 'USER_ROLE',
        enum: roles
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function(){

        let user = this;
        let userObject = user.toObject();
        delete userObject.password;
        
    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: 'Error, el {PATH} tiene que ser único.' });

module.exports = mongoose.model('Usuario', usuarioSchema);