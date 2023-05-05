const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
});

userSchema.method("toJSON", function(){
    const {__v, password, ...object} = this.toObject();
    return object
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel;