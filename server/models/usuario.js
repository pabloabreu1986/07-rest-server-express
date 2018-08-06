const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let roles = {
    values: ['ADMIN_ROLE', 'SUPER_ROLE', 'USER_ROLE'],
    message: '{VALUE} IS NOT A VALID ROLE'
}

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'nombre is required']
    },
    email:{
        type: String,
        unique:
        true,
        required: [true, 'email is required']
    },
    password:{
        type: String,
        required: [true, 'password is required']
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
}

usuarioSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Usuario', usuarioSchema);